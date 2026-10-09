"""Creator profiles, discovery search, onboarding, and incoming contact inquiries."""

import logging
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.firebase.firestore import get_doc, set_doc, create_doc, list_docs, update_doc, delete_doc
from app.api.auth import get_current_user, require_creator
from app.schemas.creator import (
    CreatorResponse, CreatorCreate, CreatorUpdate
)
from app.schemas.brief import (
    CreatorInquiryCreate, CreatorInquiryResponse
)

logger = logging.getLogger("creators_api")
router = APIRouter(prefix="/creators", tags=["creators"])


@router.get("", response_model=List[CreatorResponse])
async def list_creators(
    q: Optional[str] = Query(None, description="Search query across name, skills, bio, tools"),
    genre: Optional[str] = Query(None, description="Filter by genre"),
    contentType: Optional[str] = Query(None, description="Filter by content type"),
    tool: Optional[str] = Query(None, description="Filter by AI tool"),
    platform: Optional[str] = Query(None, description="Filter by social platform"),
    specialization: Optional[str] = Query(None, description="Filter by specialization"),
    availability: Optional[str] = Query(None, description="Filter by commercial availability"),
    sortBy: Optional[str] = Query("relevance", description="Sort by relevance, followers, engagement")
):
    """Discover creators with multi-facet filters."""
    creators_raw = list_docs("creators")
    results = []

    for c in creators_raw:
        # Match filters
        if genre and genre.lower() not in [g.lower() for g in c.get("genres", [])]:
            continue
        if contentType and contentType.lower() not in [ct.lower() for ct in c.get("contentTypes", [])]:
            continue
        if tool and tool.lower() not in [t.lower() for t in c.get("tools", [])]:
            continue
        if platform and platform.lower() not in [p.lower() for p in c.get("platforms", [])]:
            continue
        if specialization and specialization.lower() not in [s.lower() for s in c.get("specializations", [])]:
            continue
        if availability and availability.lower() not in str(c.get("commercialAvailability", "")).lower():
            continue

        if q:
            query_str = q.lower()
            text_corpus = f"{c.get('name', '')} {c.get('roleTitle', '')} {c.get('bio', '')} {' '.join(c.get('skills', []))} {' '.join(c.get('tools', []))} {' '.join(c.get('genres', []))}".lower()
            if query_str not in text_corpus:
                continue
        results.append(c)

    # Sorting
    if sortBy == "followers":
        results.sort(key=lambda x: x.get("totalFollowers", 0), reverse=True)
    elif sortBy == "engagement":
        results.sort(key=lambda x: x.get("engagementRate", 0.0), reverse=True)

    return results


@router.get("/saved/list")
async def list_saved_creator_ids(
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get IDs of creators saved/bookmarked by current user."""
    user_uid = current_user["uid"]
    saves = list_docs("saved_creators", filters=[("uid", "==", user_uid)])
    return [s.get("creatorId") for s in saves if s.get("creatorId")]


@router.post("/{creator_id}/save")
async def toggle_save_creator(
    creator_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Toggle saving/bookmarking a creator."""
    user_uid = current_user["uid"]
    save_id = f"save_{user_uid}_{creator_id}"
    existing = get_doc("saved_creators", save_id)
    if existing:
        delete_doc("saved_creators", save_id)
        return {"creatorId": creator_id, "saved": False, "message": "Creator removed from saved collection"}
    else:
        set_doc("saved_creators", save_id, {
            "id": save_id,
            "uid": user_uid,
            "creatorId": creator_id,
            "createdAt": datetime.now(timezone.utc).isoformat()
        })
        return {"creatorId": creator_id, "saved": True, "message": "Creator saved to bookmarks"}


@router.get("/{creator_id}", response_model=CreatorResponse)
async def get_creator_profile(creator_id: str):
    """Fetch single creator profile by creatorId or uid."""
    doc = get_doc("creators", creator_id)
    if not doc:
        # Check by uid
        creators_by_uid = list_docs("creators", filters=[("uid", "==", creator_id)])
        if creators_by_uid:
            doc = creators_by_uid[0]
    if not doc:
        raise HTTPException(status_code=404, detail="Creator not found")
    return doc


@router.post("", response_model=CreatorResponse, status_code=status.HTTP_201_CREATED)
async def onboard_creator(
    payload: CreatorCreate,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Onboard a new creator or initialize creator profile."""
    if current_user["uid"] != payload.uid:
        raise HTTPException(status_code=403, detail="Cannot onboard creator profile for another user.")

    creator_id = f"creator-{uuid.uuid4().hex[:8]}"
    creator_dict = payload.model_dump()
    creator_dict["creatorId"] = creator_id
    creator_dict["createdAt"] = datetime.now(timezone.utc).isoformat()
    creator_dict["updatedAt"] = creator_dict["createdAt"]

    set_doc("creators", creator_id, creator_dict)
    update_doc("users", payload.uid, {"creatorId": creator_id})

    return creator_dict


@router.put("/{creator_id}", response_model=CreatorResponse)
async def update_creator_profile(
    creator_id: str,
    payload: CreatorUpdate,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Update creator profile. User can modify only their own data."""
    existing = get_doc("creators", creator_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Creator profile not found")

    if existing.get("uid") != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Permission denied: You can only modify your own profile.")

    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    updates["updatedAt"] = datetime.now(timezone.utc).isoformat()

    update_doc("creators", creator_id, updates)
    return {**existing, **updates}


@router.post("/{creator_id}/inquire", response_model=CreatorInquiryResponse)
async def send_inquiry_to_creator(
    creator_id: str,
    payload: CreatorInquiryCreate,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Brand sends project request / inquiry to a creator."""
    creator = get_doc("creators", creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    inquiry_id = f"inq-{uuid.uuid4().hex[:8]}"
    inquiry_data = {
        "id": inquiry_id,
        "creatorId": creator_id,
        "creatorUid": creator.get("uid", ""),
        "brandUid": current_user["uid"],
        "brandName": current_user.get("name", "Ember Brand"),
        "brandLogo": current_user.get("profileImage", ""),
        "campaignTitle": payload.campaignTitle,
        "message": payload.message,
        "budgetOffer": payload.budgetOffer or "$2,500",
        "timeline": payload.timeline or "3 Weeks",
        "status": "pending",
        "createdAt": datetime.now(timezone.utc).isoformat()
    }

    set_doc("inquiries", inquiry_id, inquiry_data)
    return inquiry_data


@router.get("/{creator_id}/inquiries", response_model=List[CreatorInquiryResponse])
async def list_creator_inquiries(
    creator_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """View incoming project/contact inquiries. Creator can only view their own."""
    creator = get_doc("creators", creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    if creator.get("uid") != current_user["uid"] and current_user.get("creatorId") != creator_id:
        raise HTTPException(status_code=403, detail="You can only view your own incoming inquiries.")

    inquiries = list_docs("inquiries", filters=[("creatorId", "==", creator_id)])
    if not inquiries and creator.get("uid"):
        inquiries = list_docs("inquiries", filters=[("creatorUid", "==", creator["uid"])])
    return inquiries


@router.patch("/{creator_id}/inquiries/{inquiry_id}")
async def update_inquiry_status(
    creator_id: str,
    inquiry_id: str,
    status_update: Dict[str, str],
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Accept or decline an incoming inquiry."""
    inquiry = get_doc("inquiries", inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    if inquiry.get("creatorUid") != current_user["uid"] and inquiry.get("creatorId") != current_user.get("creatorId"):
        raise HTTPException(status_code=403, detail="Permission denied to update this inquiry.")

    new_status = status_update.get("status", "pending")
    update_doc("inquiries", inquiry_id, {"status": new_status})
    return {"id": inquiry_id, "status": new_status, "message": f"Inquiry status updated to {new_status}"}
