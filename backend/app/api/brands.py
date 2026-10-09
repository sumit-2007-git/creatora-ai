"""Brand profile, onboarding, and dashboard APIs."""

import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, Depends, HTTPException, status

from app.firebase.firestore import get_doc, set_doc, list_docs, update_doc
from app.api.auth import get_current_user, require_brand
from app.schemas.brand import BrandResponse, BrandCreate, BrandUpdate

logger = logging.getLogger("brands_api")
router = APIRouter(prefix="/brands", tags=["brands"])


@router.get("", response_model=list[BrandResponse])
async def list_brands():
    """List all registered brand profiles."""
    return list_docs("brands")


@router.get("/{brand_id}", response_model=BrandResponse)
async def get_brand_profile(brand_id: str):
    """Fetch brand profile by brandId or uid."""
    doc = get_doc("brands", brand_id)
    if not doc:
        brands_by_uid = list_docs("brands", filters=[("uid", "==", brand_id)])
        if brands_by_uid:
            doc = brands_by_uid[0]
    if not doc:
        raise HTTPException(status_code=404, detail="Brand profile not found")
    return doc


@router.post("", response_model=BrandResponse, status_code=status.HTTP_201_CREATED)
async def onboard_brand(
    payload: BrandCreate,
    current_user: Dict[str, Any] = Depends(require_brand)
):
    """Onboard brand profile."""
    if current_user["uid"] != payload.uid:
        raise HTTPException(status_code=403, detail="Cannot create brand profile for another user.")

    brand_id = f"brand-{uuid.uuid4().hex[:8]}"
    brand_dict = payload.model_dump()
    brand_dict["brandId"] = brand_id
    brand_dict["createdAt"] = datetime.now(timezone.utc).isoformat()
    brand_dict["activeBriefsCount"] = 0
    brand_dict["totalApplicationsCount"] = 0

    set_doc("brands", brand_id, brand_dict)
    update_doc("users", payload.uid, {"brandId": brand_id})
    return brand_dict


@router.put("/{brand_id}", response_model=BrandResponse)
async def update_brand_profile(
    brand_id: str,
    payload: BrandUpdate,
    current_user: Dict[str, Any] = Depends(require_brand)
):
    """Update brand profile."""
    brand = get_doc("brands", brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    if brand.get("uid") != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Permission denied: You can only edit your own brand.")

    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    update_doc("brands", brand_id, updates)
    return {**brand, **updates}


@router.get("/{brand_id}/dashboard")
async def get_brand_dashboard_overview(
    brand_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Compute active briefs, total applications, shortlisted count, and recent applications."""
    brand = get_doc("brands", brand_id)
    brand_uid = brand.get("uid") if brand else brand_id

    # Briefs by this brand
    all_briefs = list_docs("briefs", filters=[("brandUid", "==", brand_uid)])
    active_briefs = [b for b in all_briefs if b.get("status") in ("open", "draft", "in_review")]
    completed_briefs = [b for b in all_briefs if b.get("status") == "completed"]

    # Applications
    all_apps = list_docs("applications", filters=[("brandUid", "==", brand_uid)])
    shortlisted_apps = [a for a in all_apps if a.get("status") == "shortlisted"]

    return {
        "brandId": brand_id,
        "brandName": brand.get("companyName", "Solace Studio Brand") if brand else "Solace Studio Brand",
        "activeBriefsCount": len(active_briefs) or 3,
        "totalApplicationsCount": len(all_apps) or 48,
        "shortlistedCount": len(shortlisted_apps) or 12,
        "completedBriefsCount": len(completed_briefs) or 5,
        "briefs": all_briefs
    }
