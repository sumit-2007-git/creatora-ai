"""AI Recommendation and Brief Assistance endpoints powered by Gemini."""

import logging
from typing import Optional, Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel

from app.firebase.firestore import get_doc, list_docs
from app.ai.creator_matcher import match_creators_with_gemini
from app.ai.brief_generator import enhance_campaign_brief, EnhancedBriefData
from app.schemas.recommendation import RecommendationResponse
from app.api.auth import get_current_user

logger = logging.getLogger("recommendations_api")
router = APIRouter(prefix="/recommendations", tags=["recommendations"])


class EnhanceBriefRequest(BaseModel):
    idea: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = "Lifestyle"


class MatchBriefPayload(BaseModel):
    briefId: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    genres: Optional[List[str]] = None
    contentTypes: Optional[List[str]] = None
    preferredTools: Optional[List[str]] = None
    targetAudience: Optional[str] = None
    visualAesthetic: Optional[str] = None
    budget: Optional[str] = None


@router.get("/creators", response_model=RecommendationResponse)
async def get_creator_recommendations(
    briefId: Optional[str] = Query(None, description="Existing brief ID to match against"),
    genre: Optional[str] = Query(None, description="Optional genre preference"),
    tool: Optional[str] = Query(None, description="Optional tool preference")
):
    """Generate creator matches with transparent score breakdown and AI explanation."""
    brief_data: Dict[str, Any] = {}
    if briefId:
        b = get_doc("briefs", briefId)
        if b:
            brief_data = b

    if not brief_data:
        brief_data = {
            "title": "Summer Visual Storytelling",
            "description": "Artistic visual campaign blending generative AI video, anime sketchbook aesthetics, and natural lifestyle moments.",
            "genres": [genre] if genre else ["Fashion", "Tech", "Lifestyle", "Art"],
            "contentTypes": ["Reels", "Product Ads", "AI Films"],
            "preferredTools": [tool] if tool else ["Runway", "Midjourney", "Adobe", "DaVinci Resolve"],
            "targetAudience": "Gen Z & Young Creators",
            "visualAesthetic": "Warm anime aesthetic, delicate linework, watercolor accents",
            "budget": "$4,000–$8,000"
        }

    creators = list_docs("creators")
    return await match_creators_with_gemini(brief_data, creators)


@router.post("/match", response_model=RecommendationResponse)
async def match_creators_post(payload: MatchBriefPayload):
    """Evaluate candidate creators against any custom or one-click demo brief."""
    brief_data: Dict[str, Any] = {}
    if payload.briefId:
        b = get_doc("briefs", payload.briefId)
        if b:
            brief_data = b

    if not brief_data:
        brief_data = {
            "title": payload.title or "Campaign Brief",
            "description": payload.description or "AI Visual Campaign",
            "genres": payload.genres or ["Fashion", "Tech"],
            "contentTypes": payload.contentTypes or ["Reels", "Product Ads"],
            "preferredTools": payload.preferredTools or ["Runway", "Midjourney"],
            "targetAudience": payload.targetAudience or "Gen Z & Millennials",
            "visualAesthetic": payload.visualAesthetic or "Cinematic aesthetic",
            "budget": payload.budget or "$5,000–$9,000"
        }

    creators = list_docs("creators")
    return await match_creators_with_gemini(brief_data, creators)


@router.post("/enhance-brief", response_model=EnhancedBriefData)
async def enhance_brief_endpoint(payload: EnhanceBriefRequest):
    """Use Gemini to draft or polish a campaign brief from a one-line idea."""
    seed_input = payload.idea or payload.description or payload.title or "Cinematic AI campaign"
    return await enhance_campaign_brief(seed_input, payload.category or "Lifestyle")


@router.get("/{brief_id}", response_model=RecommendationResponse)
async def get_recommendations_by_brief_id(brief_id: str):
    """Convenience alias for /recommendations/creators?briefId={brief_id}."""
    return await get_creator_recommendations(briefId=brief_id)
