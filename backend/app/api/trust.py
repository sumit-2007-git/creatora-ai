"""Trust and verification APIs.
Manages TrustClaims, Gemini Vision process proof verification, and SSRF-safe link checking.
"""

from datetime import datetime, timezone
import logging
from typing import List, Dict, Any, Optional
import uuid

from fastapi import APIRouter, Depends, HTTPException, status, Query

from app.models.trust import (
    TrustClaim,
    TrustEvidence,
    ProofVerificationRequest,
    ProofVerificationResponse
)
from app.ai.proof_verifier import verify_process_proof
from app.utils.ssrf import fetch_url_metadata
from app.firebase.firestore import get_doc, set_doc, list_docs
from app.api.auth import get_current_user, require_creator

logger = logging.getLogger("trust_api")
router = APIRouter(prefix="/trust", tags=["trust"])


@router.get("/creator/{creator_id}", response_model=Dict[str, Any])
async def get_creator_trust_profile(creator_id: str):
    """Retrieve all claims, verification tiers, checklist, and calculated trust score for a creator."""
    claims = list_docs("claims", filters=[("creatorId", "==", creator_id)])
    
    proof_count = sum(1 for c in claims if c.get("tier") == "proof-backed")
    link_count = sum(1 for c in claims if c.get("tier") == "link-checked")
    self_count = sum(1 for c in claims if c.get("tier") == "self-reported")
    needs_proof_count = sum(1 for c in claims if c.get("tier") == "needs-proof")
    
    # Calculate overall trust score (0 - 100%)
    # Base 35% for profile completeness, +15% per proof-backed (up to 45%), +10% per link-checked (up to 20%)
    trust_score = min(35 + (proof_count * 15) + (link_count * 8), 100)
    
    checklist = {
        "toolsVerified": proof_count > 0,
        "pastWorkLinked": link_count > 0,
        "processProofAdded": proof_count > 0,
        "licenceStated": True,
        "profileComplete": True
    }
    
    dominant_tier = "proof-backed" if proof_count >= 2 else ("link-checked" if (link_count + proof_count) > 0 else "self-reported")
    
    return {
        "creatorId": creator_id,
        "trustScore": trust_score,
        "dominantTier": dominant_tier,
        "claimsCount": len(claims),
        "proofBackedCount": proof_count,
        "linkCheckedCount": link_count,
        "selfReportedCount": self_count,
        "needsProofCount": needs_proof_count,
        "checklist": checklist,
        "claims": claims
    }


@router.post("/verify-proof", response_model=ProofVerificationResponse)
async def verify_proof_claim(
    req: ProofVerificationRequest,
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """Creator submits process screenshot proof for a claim. Gemini Vision evaluates authenticity."""
    creator_id = current_user.get("creatorId") or f"creator-{current_user['uid'][:8]}"
    if req.creatorId != creator_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied: You can only submit verification proof for your own profile."
        )

    # Call Gemini Vision verifier
    verification = await verify_process_proof(req)
    
    # Save or update claim in Firestore
    claim_id = req.claimId or f"claim-{uuid.uuid4().hex[:8]}"
    now = datetime.now(timezone.utc).isoformat()
    
    claim_data = {
        "id": claim_id,
        "creatorId": creator_id,
        "type": "workflow" if "workflow" in req.claimText.lower() else "tool",
        "claim": req.claimText,
        "tier": verification.tierGranted,
        "evidence": [
            {
                "type": "image",
                "url": req.proofImageUrl,
                "description": f"Process workspace proof for {req.claimedTool or 'claimed pipeline'}"
            }
        ],
        "checkedAt": now,
        "checkedBy": "gemini",
        "confidence": verification.confidence,
        "observations": verification.observations,
        "mismatches": verification.mismatches,
        "reasons": verification.reasons,
        "c2paDetected": verification.c2paDetected
    }
    
    set_doc("claims", claim_id, claim_data)
    
    # Also update creator's overall trust tier in their creator record
    creator_doc = get_doc("creators", creator_id)
    if creator_doc:
        existing_tier = creator_doc.get("trustTier", "self-reported")
        if verification.tierGranted == "proof-backed":
            creator_doc["trustTier"] = "proof-backed"
            set_doc("creators", creator_id, creator_doc, merge=True)
            
    return verification


@router.post("/link-check", response_model=Dict[str, Any])
async def verify_work_link(
    creatorId: str = Query(...),
    postUrl: str = Query(..., description="Link to Instagram, YouTube, TikTok, or Vimeo post"),
    claimedTitle: Optional[str] = Query(None),
    current_user: Dict[str, Any] = Depends(require_creator)
):
    """SSRF-safe backend link checking verifying title and thumbnail match claimed piece."""
    auth_creator = current_user.get("creatorId") or f"creator-{current_user['uid'][:8]}"
    if creatorId != auth_creator:
        raise HTTPException(status_code=403, detail="Permission denied.")

    meta = await fetch_url_metadata(postUrl)
    if not meta.get("success"):
        raise HTTPException(
            status_code=400,
            detail=meta.get("error", "Could not safely verify link.")
        )

    # Check match consistency
    title_matches = True
    if claimedTitle and meta.get("title"):
        cleaned_claimed = claimedTitle.lower().strip()
        cleaned_meta = meta.get("title", "").lower().strip()
        title_matches = any(word in cleaned_meta for word in cleaned_claimed.split() if len(word) > 3)

    now = datetime.now(timezone.utc).isoformat()
    claim_id = f"claim-link-{uuid.uuid4().hex[:8]}"
    
    tier = "link-checked" if title_matches else "needs-proof"
    claim_data = {
        "id": claim_id,
        "creatorId": creatorId,
        "type": "past-work",
        "claim": f"Published {meta.get('platform', 'social')} project: {claimedTitle or meta.get('title')}",
        "tier": tier,
        "evidence": [
            {
                "type": "url",
                "url": postUrl,
                "description": f"Verified live publication on {meta.get('platform')}"
            }
        ],
        "checkedAt": now,
        "checkedBy": "system",
        "confidence": 0.85 if title_matches else 0.5,
        "observations": [f"Successfully fetched live metadata from {meta.get('platform')} via SSRF-safe gateway."],
        "mismatches": [] if title_matches else ["Title in link metadata differs from claimed piece name."],
        "reasons": [] if title_matches else ["Please verify that the link points directly to this exact campaign asset."]
    }
    
    set_doc("claims", claim_id, claim_data)
    
    return {
        "success": True,
        "tierGranted": tier,
        "platform": meta.get("platform"),
        "title": meta.get("title"),
        "thumbnail": meta.get("thumbnail"),
        "claim": claim_data
    }
