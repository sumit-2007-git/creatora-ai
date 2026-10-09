"""Social import API endpoints supporting manual and multimodal Gemini extraction."""

import logging
from typing import Optional, Dict, Any, List
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from pydantic import BaseModel, Field

from app.integrations.instagram import instagram_adapter
from app.ai.profile_analyzer import ExtractedSocialProfile
from app.api.auth import get_current_user, require_creator
from app.firebase.firestore import get_doc, update_doc, set_doc

logger = logging.getLogger("social_api")
router = APIRouter(prefix="/social", tags=["social"])


class ManualImportRequest(BaseModel):
    handle: str
    bio: Optional[str] = ""
    followers: Optional[str] = "10000"
    avgLikes: Optional[str] = "500"
    avgViews: Optional[str] = "10000"
    captions: Optional[str] = ""


class ConfirmImportRequest(BaseModel):
    creatorId: Optional[str] = None
    handle: str
    category: str
    specializations: List[str]
    skills: List[str]
    tools: List[str]
    contentTypes: List[str]
    totalFollowers: int
    monthlyViews: int
    engagementRate: float
    bio: str
    suggestedRate: Optional[str] = "$1,500"
    aiSummary: Optional[str] = ""
    strengths: List[str] = Field(default_factory=list)
    bestForCategories: List[str] = Field(default_factory=list)
    isSelfReported: bool = True
    metricsSource: str = "self-reported"


@router.post("/import", response_model=ExtractedSocialProfile)
async def import_social_profile_json(
    payload: ManualImportRequest,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Import and analyze social metrics via Manual Mode (JSON payload)."""
    return await instagram_adapter.import_profile(
        handle=payload.handle,
        bio=payload.bio or "",
        followers=payload.followers or 10000,
        likes=payload.avgLikes or 500,
        views=payload.avgViews or 10000,
        captions=payload.captions or ""
    )


@router.post("/import-vision", response_model=ExtractedSocialProfile)
async def import_social_profile_vision(
    handle: str = Form(...),
    bio: str = Form(""),
    followers: str = Form("10000"),
    avgLikes: str = Form("500"),
    avgViews: str = Form("10000"),
    captions: str = Form(""),
    screenshot: Optional[UploadFile] = File(None),
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Import social profile with optional screenshot using Gemini Vision + Text."""
    screenshot_bytes = None
    screenshot_mime = "image/jpeg"
    if screenshot:
        screenshot_bytes = await screenshot.read()
        screenshot_mime = screenshot.content_type or "image/jpeg"

    return await instagram_adapter.import_profile(
        handle=handle,
        bio=bio,
        followers=followers,
        likes=avgLikes,
        views=avgViews,
        captions=captions,
        screenshot_bytes=screenshot_bytes,
        screenshot_mime=screenshot_mime
    )


@router.post("/confirm")
async def confirm_social_import(
    payload: ConfirmImportRequest,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Save reviewed and edited social import data into creator profile with self-reported badge."""
    creator_id = payload.creatorId or current_user.get("creatorId")
    if not creator_id:
        creator_id = f"creator-{current_user['uid'][:8]}"

    # Update creator profile in Firestore
    update_data = {
        "handle": payload.handle,
        "genres": [payload.category],
        "specializations": payload.specializations,
        "skills": payload.skills,
        "tools": payload.tools,
        "contentTypes": payload.contentTypes,
        "totalFollowers": payload.totalFollowers,
        "monthlyViews": payload.monthlyViews,
        "engagementRate": payload.engagementRate,
        "bio": payload.bio,
        "rate": payload.suggestedRate or "$1,500",
        "aiSummary": payload.aiSummary or "",
        "strengths": payload.strengths,
        "bestForCategories": payload.bestForCategories,
        "isSelfReported": True,
        "metricsSource": "self-reported",
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    update_doc("creators", creator_id, update_data)

    # Store in instagram subcollection with self-reported metadata
    ig_data = {
        "creatorId": creator_id,
        "username": payload.handle.replace("@", ""),
        "followers": payload.totalFollowers,
        "monthlyViews": payload.monthlyViews,
        "engagementRate": payload.engagementRate,
        "source": "self-reported",
        "syncedAt": datetime.now(timezone.utc).isoformat()
    }
    set_doc("instagram", creator_id, ig_data, merge=True)

    return {
        "success": True,
        "message": f"Social profile @{payload.handle} confirmed and creator profile updated.",
        "creatorId": creator_id,
        "data": update_data
    }
