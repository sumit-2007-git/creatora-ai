"""Creator Social Posts CRUD and SSRF-safe URL metadata extraction API."""

import json
import logging
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.firebase.firestore import get_doc, list_docs, set_doc, create_doc, update_doc, delete_doc
from app.models.post import (
    PostCreate,
    PostUpdate,
    PostResponse,
    UrlMetadataRequest,
    UrlMetadataResponse,
    SuggestPostTagsRequest,
    SuggestPostTagsResponse
)
from app.utils.ssrf import fetch_safe_metadata
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text
from app.api.auth import get_current_user_optional

logger = logging.getLogger("posts_api")
router = APIRouter(tags=["creator_posts"])


@router.get("/creators/{creator_id}/posts")
async def list_creator_posts(creator_id: str):
    """List all published social posts for a creator, with pinned posts first."""
    posts = list_docs("posts", filters=[("creatorId", "==", creator_id)])
    # Sort: pinned posts first, then orderIndex, then createdAt descending
    posts.sort(
        key=lambda p: (
            1 if p.get("isPinned") else 0,
            -int(p.get("orderIndex", 0)),
            p.get("createdAt", "")
        ),
        reverse=True
    )
    return posts


@router.post("/creators/{creator_id}/posts", status_code=status.HTTP_201_CREATED)
async def create_creator_post(
    creator_id: str,
    payload: PostCreate,
    current_user: Optional[Dict[str, Any]] = Depends(get_current_user_optional)
):
    """
    Publish a social post for a creator.
    Enforces URL deduplication per creator and a maximum of 3 pinned posts.
    """
    creator = get_doc("creators", creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    # Verify ownership if user is logged in
    if current_user and current_user.get("role") == "CREATOR":
        user_cid = current_user.get("creatorId")
        if user_cid and user_cid != creator_id and not current_user.get("uid", "").startswith("user-creator"):
            raise HTTPException(status_code=403, detail="You can only publish posts to your own profile")

    # 1. Dedupe by originalUrl per creator
    existing_posts = list_docs("posts", filters=[("creatorId", "==", creator_id)])
    clean_url = payload.originalUrl.strip().lower()
    for ep in existing_posts:
        if ep.get("originalUrl", "").strip().lower() == clean_url:
            raise HTTPException(
                status_code=400,
                detail="A post with this URL has already been added to your profile."
            )

    # 2. Check pinned limit (max 3)
    if payload.isPinned:
        pinned_count = sum(1 for ep in existing_posts if ep.get("isPinned"))
        if pinned_count >= 3:
            raise HTTPException(
                status_code=400,
                detail="Maximum of 3 featured posts can be pinned. Please unpin another post first."
            )

    now_iso = datetime.now(timezone.utc).isoformat()
    post_id = f"post_{creator_id}_{int(datetime.now(timezone.utc).timestamp())}"

    post_data = {
        "id": post_id,
        "creatorId": creator_id,
        "creatorUid": creator.get("uid") or f"user-{creator_id}",
        "title": payload.title,
        "description": payload.description,
        "originalUrl": payload.originalUrl,
        "platform": payload.platform,
        "thumbnailUrl": payload.thumbnailUrl,
        "tags": payload.tags,
        "toolsUsed": payload.toolsUsed,
        "contentType": payload.contentType,
        "industry": payload.industry,
        "viewsCount": payload.viewsCount or 0,
        "likesCount": payload.likesCount or 0,
        "isPinned": payload.isPinned,
        "orderIndex": payload.orderIndex,
        "isSelfReported": True,
        "createdAt": now_iso,
        "updatedAt": now_iso,
        "isDemo": True
    }

    set_doc("posts", post_id, post_data)
    return post_data


@router.put("/creators/{creator_id}/posts/{post_id}")
async def update_creator_post(
    creator_id: str,
    post_id: str,
    payload: PostUpdate
):
    """Update post metadata, self-reported metrics, or pin status."""
    post = get_doc("posts", post_id)
    if not post or post.get("creatorId") != creator_id:
        raise HTTPException(status_code=404, detail="Post not found")

    # Check pinned limit if changing to pinned
    if payload.isPinned is True and not post.get("isPinned"):
        existing_posts = list_docs("posts", filters=[("creatorId", "==", creator_id)])
        pinned_count = sum(1 for ep in existing_posts if ep.get("isPinned"))
        if pinned_count >= 3:
            raise HTTPException(
                status_code=400,
                detail="Maximum of 3 featured posts can be pinned. Please unpin another post first."
            )

    updates: Dict[str, Any] = {"updatedAt": datetime.now(timezone.utc).isoformat()}
    for field, val in payload.dict(exclude_unset=True).items():
        if val is not None:
            updates[field] = val

    update_doc("posts", post_id, updates)
    return {**post, **updates}


@router.delete("/creators/{creator_id}/posts/{post_id}")
async def delete_creator_post(creator_id: str, post_id: str):
    """Delete a creator social post."""
    post = get_doc("posts", post_id)
    if not post or post.get("creatorId") != creator_id:
        raise HTTPException(status_code=404, detail="Post not found")

    delete_doc("posts", post_id)
    return {"success": True, "deletedPostId": post_id}


@router.post("/tools/extract-url-metadata", response_model=UrlMetadataResponse)
async def extract_url_metadata_endpoint(payload: UrlMetadataRequest):
    """
    Safely fetches OpenGraph/oEmbed preview with SSRF protection.
    Blocks private and internal IP ranges, enforces 5s timeout, and size limits.
    """
    try:
        data = fetch_safe_metadata(payload.url)
        return UrlMetadataResponse(**data)
    except Exception as e:
        logger.warning(f"Metadata extraction error: {e}")
        return UrlMetadataResponse(
            url=payload.url,
            platform="Web",
            title=None,
            description=None,
            thumbnailUrl=None,
            success=False,
            message=str(e)
        )


@router.post("/tools/suggest-post-tags", response_model=SuggestPostTagsResponse)
async def suggest_post_tags_endpoint(payload: SuggestPostTagsRequest):
    """Uses Gemini to suggest relevant creative tags, AI tools, and content type from title and text."""
    model = _get_gemini_model()
    title = payload.title
    desc = payload.description or ""

    if not model:
        # Rule based heuristic
        tags = ["generative-ai", "creative", "visual"]
        tools = ["Midjourney", "Runway"]
        if "3d" in f"{title} {desc}".lower():
            tools.append("Blender")
        return SuggestPostTagsResponse(
            suggestedTags=tags,
            suggestedTools=tools,
            suggestedContentType="Reels",
            suggestedIndustry="Fashion & Tech"
        )

    prompt = f"""
You are an AI Creator Cataloging Assistant.
A creator published this post:
Title: {title}
Description: {desc}

Suggest appropriate metadata JSON:
{{
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "suggestedTools": ["tool1", "tool2"],
  "suggestedContentType": "Reels / Shorts / AI Films / Product Ads",
  "suggestedIndustry": "Fashion / Tech / Gaming / Beauty / Lifestyle / Automotive"
}}
Return ONLY valid JSON.
"""

    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            data = json.loads(_clean_json_text(res.text))
            return SuggestPostTagsResponse(**data)
        except Exception as e:
            logger.warning(f"Suggest tags Gemini attempt {attempt + 1} failed: {e}")

    return SuggestPostTagsResponse(
        suggestedTags=["generative-ai", "visual-storytelling"],
        suggestedTools=["Runway", "Midjourney"],
        suggestedContentType="Reels",
        suggestedIndustry="Fashion"
    )
