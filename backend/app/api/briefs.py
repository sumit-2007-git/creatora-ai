"""Campaign briefs, multi-step brief creation, creator applications, and review workflow."""

import logging
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.firebase.firestore import get_doc, set_doc, list_docs, update_doc
from app.api.auth import get_current_user, require_brand, require_creator
from app.schemas.brief import (
    BriefResponse, BriefCreate, BriefUpdate,
    BriefApplicationCreate, BriefApplicationResponse
)

logger = logging.getLogger("briefs_api")
router = APIRouter(prefix="/briefs", tags=["briefs"])


@router.get("", response_model=List[BriefResponse])
async def list_briefs(
    status: Optional[str] = Query(None, description="Filter by status: open, in_review, draft, completed"),
    genre: Optional[str] = Query(None, description="Filter by genre"),
    contentType: Optional[str] = Query(None, description="Filter by content type")
):
    """List campaign briefs with optional filters."""
    raw_briefs = list_docs("briefs")
    results = []

    for b in raw_briefs:
        if status and b.get("status") != status:
            continue
        if genre and genre.lower() not in [g.lower() for g in b.get("genres", [])]:
            continue
        if contentType and contentType.lower() not in [ct.lower() for ct in b.get("contentTypes", [])]:
            continue
        results.append(b)

    return results


@router.get("/{brief_id}", response_model=BriefResponse)
async def get_brief(brief_id: str):
    """Fetch single brief."""
    b = get_doc("briefs", brief_id)
    if not b:
        raise HTTPException(status_code=404, detail="Brief not found")
    return b


@router.post("", response_model=BriefResponse, status_code=status.HTTP_201_CREATED)
async def create_brief(
    payload: BriefCreate,
    current_user: Dict[str, Any] = Depends(require_brand)
):
    """Brand creates campaign brief."""
    brief_id = f"brief-{uuid.uuid4().hex[:8]}"
    data = payload.model_dump()
    data["id"] = brief_id
    data["brandUid"] = current_user["uid"]
    data["brandName"] = current_user.get("name", "Ember Brand Partner")
    data["brandLogo"] = current_user.get("profileImage", "")
    data["status"] = "open"
    data["applicantCount"] = 0
    data["shortlistedCount"] = 0
    data["createdAt"] = datetime.now(timezone.utc).isoformat()
    data["updatedAt"] = data["createdAt"]

    set_doc("briefs", brief_id, data)
    return data


@router.put("/{brief_id}", response_model=BriefResponse)
async def update_brief(
    brief_id: str,
    payload: BriefUpdate,
    current_user: Dict[str, Any] = Depends(require_brand)
):
    """Update brief details. Only owning brand can update."""
    brief = get_doc("briefs", brief_id)
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")

    if brief.get("brandUid") != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Permission denied: You can only edit your own brief.")

    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    updates["updatedAt"] = datetime.now(timezone.utc).isoformat()

    update_doc("briefs", brief_id, updates)
    return {**brief, **updates}


@router.post("/{brief_id}/apply", response_model=BriefApplicationResponse, status_code=status.HTTP_201_CREATED)
async def apply_to_brief(
    brief_id: str,
    payload: BriefApplicationCreate,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Creator submits application to brief."""
    brief = get_doc("briefs", brief_id)
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")

    app_id = f"app-{uuid.uuid4().hex[:8]}"
    app_data = {
        "id": app_id,
        "briefId": brief_id,
        "creatorId": payload.creatorId or current_user.get("creatorId", "creator-001"),
        "creatorUid": current_user["uid"],
        "creatorName": current_user.get("name", "Creator Applicant"),
        "creatorAvatar": current_user.get("profileImage", ""),
        "brandUid": brief.get("brandUid", ""),
        "coverLetter": payload.coverLetter,
        "proposedRate": payload.proposedRate,
        "status": "pending",
        "createdAt": datetime.now(timezone.utc).isoformat()
    }

    set_doc("applications", app_id, app_data)

    # Increment applicant count on brief
    curr_count = brief.get("applicantCount", 0) + 1
    update_doc("briefs", brief_id, {"applicantCount": curr_count})

    return app_data


@router.get("/{brief_id}/applications", response_model=List[BriefApplicationResponse])
async def list_brief_applications(
    brief_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Brand reviews incoming applications for their brief."""
    brief = get_doc("briefs", brief_id)
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")

    # Allow brand owner or creator to see their own
    if brief.get("brandUid") != current_user["uid"]:
        # If creator, filter only their own application
        return list_docs("applications", filters=[("briefId", "==", brief_id), ("creatorUid", "==", current_user["uid"])])

    return list_docs("applications", filters=[("briefId", "==", brief_id)])


@router.patch("/{brief_id}/applications/{app_id}")
async def update_application_status(
    brief_id: str,
    app_id: str,
    status_update: Dict[str, str],
    current_user: Dict[str, Any] = Depends(require_brand)
):
    """Brand shortlists, accepts, or declines an application."""
    brief = get_doc("briefs", brief_id)
    if not brief or brief.get("brandUid") != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Permission denied to manage applications for this brief.")

    application = get_doc("applications", app_id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    new_status = status_update.get("status", "shortlisted")
    update_doc("applications", app_id, {"status": new_status})

    if new_status == "shortlisted":
        shortlisted = brief.get("shortlistedCount", 0) + 1
        update_doc("briefs", brief_id, {"shortlistedCount": shortlisted})

    return {"id": app_id, "status": new_status, "message": f"Application marked as {new_status}"}
