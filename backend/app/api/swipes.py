"""Swipe Matchmaking, Creator Inbox Notifications, and Mutual Matches API."""

import logging
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.firebase.firestore import get_doc, list_docs, set_doc, create_doc, update_doc, delete_doc
from app.models.swipe import (
    SwipeActionRequest,
    SwipeRecord,
    NotificationItem,
    NotificationActionRequest,
    MatchItem
)
from app.ai.creator_matcher import compute_weighted_match
from app.api.auth import get_current_user_optional

logger = logging.getLogger("swipes_api")
router = APIRouter(prefix="/swipes", tags=["swipes"])


@router.get("/deck")
async def get_swipe_deck(
    brandId: str = Query(..., description="Brand ID reviewing creators"),
    briefId: Optional[str] = Query(None, description="Optional brief ID to match against"),
    limit: int = Query(25, description="Maximum cards in deck")
):
    """
    Returns unswiped candidate creators ordered by multi-vector match score.
    Already swiped creators (interested or pass) are excluded.
    """
    # 1. Fetch brief context if specified
    brief_data: Dict[str, Any] = {}
    if briefId:
        b = get_doc("briefs", briefId)
        if b:
            brief_data = b

    if not brief_data:
        brief_data = {
            "title": "Creative Campaign Collaboration",
            "genres": ["Fashion", "Tech", "Lifestyle", "AI Video"],
            "preferredTools": ["Runway", "Midjourney", "Adobe"],
            "contentTypes": ["Reels", "AI Films", "Product Ads"],
            "engagementRate": 6.0,
            "budget": "$3,000–$6,000"
        }

    # 2. Fetch existing swipes by this brand
    existing_swipes = list_docs("swipes", filters=[("brandId", "==", brandId)])
    swiped_creator_ids = {s.get("creatorId") for s in existing_swipes if s.get("creatorId")}

    # 3. Fetch all creators
    all_creators = list_docs("creators")
    unswiped = [c for c in all_creators if c.get("creatorId") not in swiped_creator_ids]

    # 4. Score and sort candidates
    scored = []
    for c in unswiped:
        match_info = compute_weighted_match(brief_data, c)
        scored.append({
            "creator": c,
            "matchPercentage": match_info["totalScore"],
            "tier": match_info["tier"],
            "breakdown": match_info["breakdown"]
        })

    scored.sort(key=lambda x: x["matchPercentage"], reverse=True)

    deck = []
    for item in scored[:limit]:
        c = item["creator"]
        deck.append({
            "creatorId": c.get("creatorId"),
            "name": c.get("name"),
            "avatar": c.get("avatar"),
            "coverImage": c.get("coverImage"),
            "handle": c.get("handle"),
            "roleTitle": c.get("roleTitle", "AI Creator"),
            "bio": c.get("bio", ""),
            "specializations": c.get("specializations", []),
            "skills": c.get("skills", []),
            "tools": c.get("tools", []),
            "genres": c.get("genres", []),
            "totalFollowers": f"{c.get('totalFollowers', 0) // 1000}K" if c.get('totalFollowers', 0) >= 1000 else str(c.get('totalFollowers', 0)),
            "monthlyViews": f"{c.get('monthlyViews', 0) // 1000}K" if c.get('monthlyViews', 0) >= 1000 else str(c.get('monthlyViews', 0)),
            "engagementRate": f"{c.get('engagementRate', 5.0)}%",
            "commercialAvailability": c.get("commercialAvailability", "Immediate"),
            "rate": c.get("rate", "$1,500"),
            "matchPercentage": item["matchPercentage"],
            "tier": item["tier"],
            "weightedBreakdown": item["breakdown"],
            "strengths": c.get("strengths", ["Generative mastery", "Quick turnaround"])
        })

    return {
        "deck": deck,
        "totalRemaining": len(scored),
        "brandId": brandId,
        "briefTitle": brief_data.get("title")
    }


@router.post("")
async def record_swipe(payload: SwipeActionRequest):
    """
    Store swipe action (interested / pass).
    Right-swipe creates an inbox notification for the creator (duplicate-proof).
    """
    now_iso = datetime.now(timezone.utc).isoformat()
    swipe_doc_id = f"swipe_{payload.brandId}_{payload.creatorId}_{payload.briefId or 'general'}"

    # 1. Store swipe record
    swipe_data = {
        "id": swipe_doc_id,
        "brandId": payload.brandId,
        "creatorId": payload.creatorId,
        "briefId": payload.briefId,
        "direction": payload.direction,
        "timestamp": now_iso
    }
    set_doc("swipes", swipe_doc_id, swipe_data)

    # 2. If right-swipe, create inbox notification for creator if not already sent
    notification_created = False
    if payload.direction == "interested":
        notif_id = f"notif_{payload.brandId}_{payload.creatorId}_{payload.briefId or 'general'}"
        existing_notif = get_doc("notifications", notif_id)

        if not existing_notif:
            # Look up brand details
            brand_doc = get_doc("brands", payload.brandId) or {}
            brand_name = brand_doc.get("companyName") or brand_doc.get("name") or "Solace Studio Brand"

            # Look up brief title if applicable
            brief_title = None
            if payload.briefId:
                brief_doc = get_doc("briefs", payload.briefId) or {}
                brief_title = brief_doc.get("title")

            intro_msg = payload.introMessage or (
                f"We love your visual storytelling and aesthetic! We're interested in collaborating with you"
                + (f" on our upcoming campaign '{brief_title}'." if brief_title else ".")
            )

            # Look up creator user UID
            creator_doc = get_doc("creators", payload.creatorId) or {}
            creator_uid = creator_doc.get("uid") or f"user-{payload.creatorId}"

            notif_data = {
                "id": notif_id,
                "brandId": payload.brandId,
                "brandName": brand_name,
                "creatorId": payload.creatorId,
                "creatorUid": creator_uid,
                "briefId": payload.briefId,
                "briefTitle": brief_title,
                "introMessage": intro_msg,
                "link": f"/brands/{payload.brandId}",
                "isRead": False,
                "status": "pending",
                "createdAt": now_iso,
                "isDemo": True
            }
            set_doc("notifications", notif_id, notif_data)
            notification_created = True

    return {
        "success": True,
        "swipeId": swipe_doc_id,
        "direction": payload.direction,
        "notificationCreated": notification_created
    }


@router.post("/reset-passes")
async def reset_brand_passes(brandId: str = Query(...)):
    """Reset all 'pass' swipes for this brand so passed creators return to deck."""
    swipes = list_docs("swipes", filters=[("brandId", "==", brandId), ("direction", "==", "pass")])
    for s in swipes:
        delete_doc("swipes", s.get("id"))
    return {"success": True, "resetCount": len(swipes)}


@router.get("/matches")
async def get_brand_matches(brandId: str = Query(...)):
    """Lists mutual matches, interested pending items, and passes for brand."""
    # 1. Confirmed mutual matches
    confirmed_matches = list_docs("matches", filters=[("brandId", "==", brandId)])

    # 2. All swipes
    swipes = list_docs("swipes", filters=[("brandId", "==", brandId)])
    all_creators = {c.get("creatorId"): c for c in list_docs("creators")}

    interested_pending = []
    passes = []
    matched_creator_ids = {m.get("creatorId") for m in confirmed_matches}

    for s in swipes:
        cid = s.get("creatorId")
        creator = all_creators.get(cid)
        if not creator:
            continue

        c_info = {
            "creatorId": cid,
            "name": creator.get("name"),
            "avatar": creator.get("avatar"),
            "handle": creator.get("handle"),
            "roleTitle": creator.get("roleTitle"),
            "rate": creator.get("rate", "$1,500"),
            "timestamp": s.get("timestamp")
        }

        if s.get("direction") == "interested" and cid not in matched_creator_ids:
            interested_pending.append(c_info)
        elif s.get("direction") == "pass":
            passes.append(c_info)

    return {
        "brandId": brandId,
        "mutualMatches": confirmed_matches,
        "interestedPending": interested_pending,
        "passes": passes
    }


@router.get("/notifications")
async def get_creator_notifications(
    creatorId: str = Query(..., description="Creator ID")
):
    """Creator inbox notifications list with real-time unread count."""
    notifs = list_docs("notifications", filters=[("creatorId", "==", creatorId)])
    # Sort descending by createdAt
    notifs.sort(key=lambda x: x.get("createdAt", ""), reverse=True)
    unread_count = sum(1 for n in notifs if not n.get("isRead"))

    return {
        "notifications": notifs,
        "unreadCount": unread_count,
        "creatorId": creatorId
    }


@router.post("/notifications/{notification_id}/action")
async def handle_notification_action(
    notification_id: str,
    payload: NotificationActionRequest
):
    """
    Creator actions on inbox notifications:
    - accept: marks accepted, generates mutual match record, opens thread
    - decline: marks declined, notifies nobody, hides item
    - read: marks isRead = True
    """
    notif = get_doc("notifications", notification_id)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")

    now_iso = datetime.now(timezone.utc).isoformat()
    action = payload.status.lower()

    if action == "accepted":
        update_doc("notifications", notification_id, {
            "status": "accepted",
            "isRead": True,
            "acceptedAt": now_iso
        })

        # Create mutual match record
        creator = get_doc("creators", notif.get("creatorId")) or {}
        match_id = f"match_{notif.get('brandId')}_{notif.get('creatorId')}_{notif.get('briefId') or 'direct'}"

        match_data = {
            "id": match_id,
            "brandId": notif.get("brandId"),
            "brandName": notif.get("brandName"),
            "creatorId": notif.get("creatorId"),
            "creatorName": creator.get("name", "Creator"),
            "creatorAvatar": creator.get("avatar", ""),
            "creatorHandle": creator.get("handle", "@creator"),
            "creatorRole": creator.get("roleTitle", "AI Creator"),
            "briefId": notif.get("briefId"),
            "briefTitle": notif.get("briefTitle"),
            "status": "accepted",
            "createdAt": now_iso,
            "isDemo": True,
            "projectThreadId": f"thread-{match_id}"
        }
        set_doc("matches", match_id, match_data)

        return {
            "success": True,
            "status": "accepted",
            "matchId": match_id,
            "message": "Collaboration accepted! Mutual match created and project thread opened."
        }

    elif action == "declined":
        update_doc("notifications", notification_id, {
            "status": "declined",
            "isRead": True,
            "declinedAt": now_iso
        })
        return {
            "success": True,
            "status": "declined",
            "message": "Collaboration declined."
        }

    elif action == "read":
        update_doc("notifications", notification_id, {"isRead": True})
        return {"success": True, "status": "read"}

    else:
        raise HTTPException(status_code=400, detail=f"Unsupported status action: {payload.status}")
