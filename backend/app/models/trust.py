"""Trust claims and verification models."""

from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field


class TrustEvidence(BaseModel):
    type: Literal["url", "image", "c2pa"] = Field(..., description="Type of evidence provided")
    url: Optional[str] = Field(None, description="Public URL or Firebase Storage URL")
    description: Optional[str] = Field(None, description="Creator description of what this proves")
    c2paMetadata: Optional[Dict[str, Any]] = Field(None, description="Optional parsed C2PA content credentials")


class TrustClaim(BaseModel):
    id: str = Field(..., description="Unique claim ID, e.g. claim-001")
    creatorId: str = Field(..., description="ID of the creator making this claim")
    type: Literal["tool", "workflow", "past-work", "licence", "identity"] = Field(..., description="Category of claim")
    claim: str = Field(..., description="Exact claim text, e.g. 'Advanced Runway Gen-3 camera control'")
    tier: Literal["self-reported", "link-checked", "proof-backed", "needs-proof"] = Field(
        "self-reported",
        description="Current verification tier assigned by backend"
    )
    evidence: List[TrustEvidence] = Field(default_factory=list, description="Associated evidence items")
    checkedAt: Optional[str] = Field(None, description="Timestamp when verification occurred")
    checkedBy: Optional[Literal["system", "gemini"]] = Field(None, description="Entity that checked this claim")
    confidence: float = Field(0.0, description="Verification confidence score (0.0 to 1.0)")
    observations: List[str] = Field(default_factory=list, description="AI or system verification notes")
    mismatches: List[str] = Field(default_factory=list, description="Any discrepancy or issues detected")
    reasons: List[str] = Field(default_factory=list, description="Explanations if status is 'needs-proof'")


class ProofVerificationRequest(BaseModel):
    creatorId: str
    claimId: Optional[str] = None
    claimText: str = Field(..., description="What the creator claims to have accomplished")
    claimedTool: Optional[str] = Field(None, description="Tool claimed, e.g. Runway Gen-3 or Blender")
    proofImageUrl: str = Field(..., description="Image URL of project file screenshot, node tree, or timeline frame")
    pieceOutputUrl: Optional[str] = Field(None, description="Optional final piece output URL to compare against")


class ProofVerificationResponse(BaseModel):
    consistent: bool
    confidence: float
    tierGranted: Literal["proof-backed", "needs-proof"]
    observations: List[str]
    mismatches: List[str]
    reasons: List[str]
    c2paDetected: bool = False
    c2paSummary: Optional[str] = None
