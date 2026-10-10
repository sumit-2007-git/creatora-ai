"""Portfolio management and Firebase Storage media upload APIs."""

import logging
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form, status

from app.firebase.firestore import get_doc, set_doc, list_docs, delete_doc
from app.firebase.storage import upload_portfolio_file
from app.api.auth import get_current_user, require_creator
from app.schemas.portfolio import PortfolioItemCreate, PortfolioItemResponse
from app.schemas.workflow import WorkflowSuggestionRequest, WorkflowSuggestionResponse
from app.ai.workflow_suggester import suggest_portfolio_workflow

logger = logging.getLogger("portfolios_api")
router = APIRouter(prefix="/portfolios", tags=["portfolios"])


@router.post("/suggest-workflow", response_model=WorkflowSuggestionResponse)
async def get_workflow_suggestions(payload: WorkflowSuggestionRequest):
    """Propose tools, models, apps, and step-by-step pipeline from description using Gemini."""
    return await suggest_portfolio_workflow(payload)


@router.get("", response_model=List[PortfolioItemResponse])
async def list_portfolio_items(
    creatorId: Optional[str] = Query(None, description="Filter by creatorId"),
    genre: Optional[str] = Query(None, description="Filter by genre"),
    contentType: Optional[str] = Query(None, description="Filter by content type")
):
    """List portfolio items with filtering."""
    filters = []
    if creatorId:
        filters.append(("creatorId", "==", creatorId))

    items = list_docs("portfolios", filters=filters if filters else None)

    results = []
    for item in items:
        if genre and item.get("genre", "").lower() != genre.lower():
            continue
        if contentType and item.get("contentType", "").lower() != contentType.lower():
            continue
        results.append(item)

    return results


@router.post("", response_model=PortfolioItemResponse, status_code=status.HTTP_201_CREATED)
async def create_portfolio_item(
    payload: PortfolioItemCreate,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Create a portfolio item from existing media URL."""
    creator_id = current_user.get("creatorId") or f"creator-{current_user['uid'][:8]}"
    item_id = f"port-{uuid.uuid4().hex[:8]}"

    data = payload.model_dump()
    data["id"] = item_id
    data["creatorId"] = creator_id
    data["uid"] = current_user["uid"]
    data["createdAt"] = datetime.now(timezone.utc).isoformat()
    data["publishedAt"] = data["createdAt"]

    set_doc("portfolios", item_id, data)
    return data


@router.post("/upload", response_model=PortfolioItemResponse, status_code=status.HTTP_201_CREATED)
async def upload_portfolio_media(
    title: str = Form(...),
    description: str = Form(""),
    contentType: str = Form("AI Films"),
    genre: str = Form("Art"),
    toolsUsed: str = Form("Runway, Midjourney"),
    file: UploadFile = File(...),
    workflowJson: Optional[str] = Form(None),
    referenceFile: Optional[UploadFile] = File(None),
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Upload media file to Firebase Storage and create portfolio document with workflow."""
    creator_id = current_user.get("creatorId") or f"creator-{current_user['uid'][:8]}"
    content = await file.read()
    content_type = file.content_type or "image/jpeg"

    # Upload to storage
    media_url = upload_portfolio_file(creator_id, file.filename or "media.jpg", content, content_type)

    ref_url = None
    if referenceFile and referenceFile.filename:
        try:
            ref_content = await referenceFile.read()
            ref_type = referenceFile.content_type or "image/jpeg"
            ref_url = upload_portfolio_file(creator_id, f"ref_{referenceFile.filename}", ref_content, ref_type)
        except Exception as e:
            logger.warning(f"Failed to upload reference file: {e}")

    item_id = f"port-{uuid.uuid4().hex[:8]}"
    tools_list = [t.strip() for t in toolsUsed.split(",") if t.strip()]

    parsed_workflow = None
    if workflowJson:
        try:
            import json as json_lib
            parsed_workflow = json_lib.loads(workflowJson)
            if ref_url and not parsed_workflow.get("referenceImageUrl"):
                parsed_workflow["referenceImageUrl"] = ref_url
        except Exception as e:
            logger.warning(f"Could not parse workflow JSON: {e}")

    data = {
        "id": item_id,
        "creatorId": creator_id,
        "uid": current_user["uid"],
        "title": title,
        "description": description,
        "mediaUrl": media_url,
        "thumbnailUrl": media_url,
        "mediaType": "Video" if "video" in content_type else "Image",
        "contentType": contentType,
        "genre": genre,
        "toolsUsed": tools_list,
        "views": "1.2K",
        "likes": "140",
        "aiTags": [genre, contentType] + tools_list,
        "workflow": parsed_workflow,
        "trustTier": "self-reported",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "publishedAt": datetime.now(timezone.utc).isoformat()
    }

    set_doc("portfolios", item_id, data)
    return data


@router.delete("/{portfolio_id}")
async def delete_portfolio_item(
    portfolio_id: str,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Delete portfolio item. User can delete only their own items."""
    item = get_doc("portfolios", portfolio_id)
    if not item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")

    if item.get("uid") != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Permission denied: You can only delete your own portfolio items.")

    delete_doc("portfolios", portfolio_id)
    return {"message": "Portfolio item deleted successfully", "id": portfolio_id}
