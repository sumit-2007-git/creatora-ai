"""AI Recommendation and Brief Assistance endpoints powered by Gemini."""

import json
import logging
from typing import Optional, Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel

from app.firebase.firestore import get_doc, list_docs
from app.ai.creator_matcher import match_creators_with_gemini, compute_weighted_match, _clean_json_text, _get_gemini_model
from app.ai.brief_generator import enhance_campaign_brief, EnhancedBriefData
from app.ai.search_parser import parse_search_query
from app.ai.dream_team import build_dream_team_with_gemini
from app.schemas.recommendation import (
    RecommendationResponse,
    AISearchRequest,
    AISearchResponse,
    AISearchResultItem,
    DreamTeamResponse,
    StructuredSearchQuery,
)
from app.ai.lookalike import analyze_style_with_gemini, rank_creators_lookalike, LookAlikeResponse
from app.ai.filter_relaxation import compute_filter_relaxations, RelaxationResponse
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


@router.post("/ai-search", response_model=AISearchResponse)
async def ai_search_endpoint(payload: AISearchRequest):
    """
    Brand natural-language search pipeline:
    1. Gemini extracts structured query (or rule fallback)
    2. Backend queries Firestore creators and their social posts
    3. Multi-vector weighted match formula scores and ranks candidates
    4. Gemini writes 1-line 'why this creator' explanation for top results only
    """
    # 1. Parse or use supplied structured query
    if payload.structuredQuery:
        structured_q = payload.structuredQuery
        is_basic = False
    else:
        structured_q, is_basic = await parse_search_query(payload.query)

    # 2. Query creators and posts from Firestore
    creators = list_docs("creators")
    posts = list_docs("posts")
    posts_by_creator: Dict[str, List[Dict[str, Any]]] = {}
    for p in posts:
        cid = p.get("creatorId")
        if cid:
            posts_by_creator.setdefault(cid, []).append(p)

    # 3. Construct campaign brief proxy for weighted matching
    genres_list = [structured_q.industry] if structured_q.industry else ["Fashion", "Tech"]
    if structured_q.style:
        genres_list.append(structured_q.style)

    brief_proxy = {
        "title": payload.query,
        "genres": genres_list,
        "contentTypes": [structured_q.contentType] if structured_q.contentType else ["Product Ads", "Reels"],
        "preferredTools": structured_q.tools if structured_q.tools else ["Runway", "Midjourney"],
        "targetAudience": f"{structured_q.industry or 'Target'} consumers",
        "visualAesthetic": structured_q.style or "Cinematic aesthetic",
        "budget": structured_q.budgetRange or "$3,000–$6,000"
    }

    # 4. Score and filter candidates
    scored_candidates = []
    for c in creators:
        # Check follower / engagement floor if specified
        if structured_q.minFollowers and c.get("totalFollowers", 0) < structured_q.minFollowers:
            continue
        if structured_q.minEngagementRate and float(c.get("engagementRate", 0.0)) < structured_q.minEngagementRate:
            continue

        score_info = compute_weighted_match(brief_proxy, c)

        # Bonus signal from creator's published social posts
        c_posts = posts_by_creator.get(c.get("creatorId"), [])
        featured_post_url = None
        for cp in c_posts:
            if not featured_post_url:
                featured_post_url = cp.get("originalUrl")
            # If creator post matches industry or tool, grant +2 alignment bonus
            if structured_q.industry and cp.get("industry", "").lower() == structured_q.industry.lower():
                score_info["totalScore"] = min(score_info["totalScore"] + 2, 98)
                score_info["breakdown"]["platformMatch"] = min(score_info["breakdown"]["platformMatch"] + 2, 20)
                break

        scored_candidates.append({
            "creator": c,
            "scoreInfo": score_info,
            "featuredPostUrl": featured_post_url
        })

    scored_candidates.sort(key=lambda x: x["scoreInfo"]["totalScore"], reverse=True)
    top_candidates = scored_candidates[:8]

    # 5. Gemini 1-line 'why this creator' explanation for top results
    explanations_map: Dict[str, str] = {}
    model = _get_gemini_model() if not is_basic else None
    if model and top_candidates:
        summary_for_prompt = [
            {
                "creatorId": item["creator"].get("creatorId"),
                "name": item["creator"].get("name"),
                "genres": item["creator"].get("genres", []),
                "tools": item["creator"].get("tools", []),
                "score": item["scoreInfo"]["totalScore"]
            }
            for item in top_candidates[:5]
        ]
        prompt = f"""
A brand searched for: "{payload.query}"
Structured filters: {structured_q.dict()}

Here are the top matching real creators:
{summary_for_prompt}

Write a crisp, persuasive 1-line "why this creator" explanation (max 18 words) for each creatorId.
Return JSON:
{{
  "explanations": [
    {{ "creatorId": "string", "whyThisCreator": "1-line explanation" }}
  ]
}}
"""
        try:
            res = model.generate_content(prompt)
            data = json.loads(_clean_json_text(res.text))
            for exp in data.get("explanations", []):
                explanations_map[exp.get("creatorId")] = exp.get("whyThisCreator")
        except Exception as e:
            logger.warning(f"Error generating 1-line search explanations: {e}")

    # Build final result items
    results: List[AISearchResultItem] = []
    for item in top_candidates:
        c = item["creator"]
        score_info = item["scoreInfo"]
        cid = c.get("creatorId", "")

        why_text = explanations_map.get(cid)
        if not why_text:
            synergies = ", ".join(c.get("genres", [])[:2])
            why_text = f"Top match with proven {score_info['totalScore']}% synergy in {synergies}."

        fol = c.get("totalFollowers", 0)
        fol_str = f"{fol // 1000}K" if fol >= 1000 else str(fol)

        results.append(AISearchResultItem(
            creatorId=cid,
            name=c.get("name", "Creator"),
            avatar=c.get("avatar", ""),
            handle=c.get("handle", "@creator"),
            roleTitle=c.get("roleTitle", "AI Creator"),
            matchPercentage=score_info["totalScore"],
            tier=score_info["tier"],
            whyThisCreator=why_text,
            weightedBreakdown=score_info["breakdown"],
            genres=c.get("genres", [])[:3],
            tools=c.get("tools", [])[:3],
            totalFollowers=fol_str,
            engagementRate=f"{c.get('engagementRate', 5.0)}%",
            rate=c.get("rate", "$1,500"),
            commercialAvailability=c.get("commercialAvailability", "Immediate"),
            featuredPostUrl=item["featuredPostUrl"]
        ))

    mode_label = "Basic search mode" if is_basic else "Gemini intelligent search"
    ai_rationale = (
        f"Found {len(results)} creators matching '{payload.query}'. ({mode_label})"
    )

    return AISearchResponse(
        query=payload.query,
        structuredQuery=structured_q,
        isBasicMode=is_basic,
        aiRationale=ai_rationale,
        results=results
    )


class DreamTeamRequest(BaseModel):
    briefId: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    genres: Optional[List[str]] = None
    budget: Optional[str] = None


@router.post("/dream-team", response_model=DreamTeamResponse)
async def dream_team_endpoint(payload: DreamTeamRequest):
    """Build a complementary multi-creator squad for a campaign brief."""
    brief_data: Dict[str, Any] = {}
    if payload.briefId:
        b = get_doc("briefs", payload.briefId)
        if b:
            brief_data = b

    if not brief_data:
        brief_data = {
            "id": payload.briefId or "demo-brief",
            "title": payload.title or "Cinematic AI Visual Campaign",
            "description": payload.description or "Multi-creator production squad for viral impact.",
            "genres": payload.genres or ["Fashion", "Sneakers", "AI Video"],
            "budget": payload.budget or "$6,000–$12,000"
        }

    creators = list_docs("creators")
    return await build_dream_team_with_gemini(brief_data, creators)


class LookAlikeSearchRequest(BaseModel):
    imageUrl: Optional[str] = None
    promptHint: Optional[str] = None
    portfolioItemId: Optional[str] = None


@router.post("/lookalike", response_model=LookAlikeResponse)
async def lookalike_endpoint(payload: LookAlikeSearchRequest):
    """Visual style look-alike search matching creators and portfolios via Gemini Vision."""
    target_image_url = payload.imageUrl
    prompt_hint = payload.promptHint

    # If portfolio item ID provided, retrieve image URL & notes from Firestore
    if payload.portfolioItemId and not target_image_url:
        item = get_doc("portfolios", payload.portfolioItemId)
        if item:
            target_image_url = item.get("mediaUrl") or item.get("thumbnailUrl")
            if not prompt_hint:
                prompt_hint = item.get("description") or item.get("title")

    style_analysis = await analyze_style_with_gemini(
        image_url=target_image_url,
        prompt_hint=prompt_hint,
    )

    creators = list_docs("creators")
    portfolios = list_docs("portfolios")

    matches = rank_creators_lookalike(
        style=style_analysis,
        creators=creators,
        portfolios=portfolios,
    )

    return LookAlikeResponse(
        referenceStyle=style_analysis,
        matches=matches,
    )


class FilterRelaxationRequest(BaseModel):
    filters: Dict[str, Any] = Field(default_factory=dict)


@router.post("/relaxations", response_model=RelaxationResponse)
async def filter_relaxations_endpoint(payload: FilterRelaxationRequest):
    """Deterministic filter relaxation suggestions and nearest match discovery."""
    creators = list_docs("creators")
    return compute_filter_relaxations(creators, payload.filters)


