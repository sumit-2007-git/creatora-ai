"""Transparent Gemini-powered Creator Matching Engine with weighted breakdown scoring."""

import os
import re
import json
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

import google.generativeai as genai
from dotenv import load_dotenv

from app.schemas.recommendation import CreatorRecommendationItem, RecommendationResponse
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("creator_matcher")
load_dotenv()


def compute_weighted_match(brief: Dict[str, Any], creator: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes a transparent, multi-vector weighted match score (0-100) based on:
    - Genre & Aesthetic fit: 30%
    - Tools & Technical Skills: 25%
    - Content Type & Platform: 20%
    - Audience & Engagement: 15%
    - Budget & Availability: 10%
    """
    # 1. Genre / Niche overlap (30 pts max)
    brief_genres = set(g.lower() for g in brief.get("genres", []))
    creator_genres = set(g.lower() for g in creator.get("genres", []))
    genre_overlap = len(brief_genres.intersection(creator_genres))
    
    if genre_overlap >= 2:
        genre_score = 28 + min(genre_overlap - 2, 2)
    elif genre_overlap == 1:
        genre_score = 20
    else:
        # Check text match in bio or role title
        bio_text = f"{creator.get('bio', '')} {creator.get('roleTitle', '')}".lower()
        if any(bg in bio_text for bg in brief_genres):
            genre_score = 12
        else:
            genre_score = 4

    # 2. Tools & Skills overlap (25 pts max)
    brief_tools = set(t.lower() for t in brief.get("preferredTools", []))
    creator_tools = set(t.lower() for t in creator.get("tools", []))
    tool_overlap = len(brief_tools.intersection(creator_tools))

    if tool_overlap >= 2:
        tool_score = 23 + min(tool_overlap - 2, 2)
    elif tool_overlap == 1:
        tool_score = 16
    else:
        tool_score = 5

    # 3. Content Type & Platform overlap (20 pts max)
    brief_content = set(c.lower() for c in brief.get("contentTypes", []))
    creator_content = set(c.lower() for c in creator.get("contentTypes", []))
    content_overlap = len(brief_content.intersection(creator_content))

    if content_overlap >= 2:
        content_score = 19
    elif content_overlap == 1:
        content_score = 14
    else:
        content_score = 4

    # 4. Audience & Engagement (15 pts max)
    eng_rate = float(creator.get("engagementRate", 5.0) or 5.0)
    if eng_rate >= 7.5:
        audience_score = 15
    elif eng_rate >= 6.0:
        audience_score = 13
    elif eng_rate >= 4.5:
        audience_score = 10
    elif eng_rate >= 3.0:
        audience_score = 7
    else:
        audience_score = 3

    # 5. Budget & Commercial Availability (10 pts max)
    availability = str(creator.get("commercialAvailability", "Immediate")).lower()
    if "immediate" in availability or "open" in availability:
        budget_score = 9
    elif "selective" in availability or "next month" in availability:
        budget_score = 6
    else:
        budget_score = 4

    if creator.get("verified"):
        budget_score = min(budget_score + 1, 10)

    total_score = min(genre_score + tool_score + content_score + audience_score + budget_score, 98)

    # Determine tier
    if total_score >= 85:
        tier = "Top Match"
    elif total_score >= 65:
        tier = "Relevant"
    elif total_score >= 45:
        tier = "Moderate"
    else:
        tier = "Weak"

    breakdown = {
        "genreMatch": genre_score,
        "toolMatch": tool_score,
        "platformMatch": content_score,
        "audienceMatch": audience_score,
        "budgetMatch": budget_score,
    }

    return {
        "totalScore": total_score,
        "tier": tier,
        "breakdown": breakdown,
    }


def rule_based_match(brief: Dict[str, Any], creators: List[Dict[str, Any]]) -> List[CreatorRecommendationItem]:
    """Fallback transparent matcher generating varied, structured scores."""
    results = []

    for creator in creators:
        metrics = compute_weighted_match(brief, creator)
        total_score = metrics["totalScore"]
        tier = metrics["tier"]
        breakdown = metrics["breakdown"]

        followers = creator.get("totalFollowers", 0)
        followers_str = f"{followers / 1000:.0f}K" if followers >= 1000 else str(followers)
        engagement_str = f"{creator.get('engagementRate', 5.0)}%"

        # Detailed rationale based on scores
        synergies = []
        c_genres = creator.get("genres", [])
        c_tools = creator.get("tools", [])
        if breakdown["genreMatch"] >= 18 and c_genres:
            synergies.append(f"strong synergy in {', '.join(c_genres[:2])}")
        if breakdown["toolMatch"] >= 16 and c_tools:
            synergies.append(f"command of {', '.join(c_tools[:2])}")
        
        if total_score >= 85:
            rationale = f"Top-tier candidate ({total_score}%): {' and '.join(synergies) if synergies else 'seamless aesthetic match'}, with robust audience engagement ({engagement_str})."
        elif total_score >= 65:
            rationale = f"Solid fit ({total_score}%): aligns with core formats but may require minor briefing on specialized tooling."
        else:
            rationale = f"Exploratory fit ({total_score}%): distinct creative voice, though primary focus differs from campaign's core {brief.get('genres', ['creative'])[0]} requirements."

        results.append(CreatorRecommendationItem(
            creatorId=creator.get("creatorId", ""),
            name=creator.get("name", ""),
            avatar=creator.get("avatar", ""),
            handle=creator.get("handle", "@creator"),
            roleTitle=creator.get("roleTitle", "AI Creator"),
            matchPercentage=total_score,
            tier=tier,
            matchRationale=rationale,
            weightedBreakdown=breakdown,
            genres=c_genres[:3],
            tools=c_tools[:3],
            totalFollowers=followers_str,
            engagementRate=engagement_str,
            strengths=creator.get("strengths", ["Generative mastery", "Quick turnaround"]),
            bestForCategories=creator.get("bestForCategories", c_genres[:2]),
            commercialAvailability=creator.get("commercialAvailability", "Immediate"),
            rate=creator.get("rate", "$1,500"),
        ))

    # Sort descending by match percentage
    results.sort(key=lambda x: x.matchPercentage, reverse=True)
    return results


async def match_creators_with_gemini(
    brief: Dict[str, Any],
    creators: List[Dict[str, Any]]
) -> RecommendationResponse:
    """Use Gemini to evaluate candidate creators against brief criteria with transparent score breakdowns."""
    if len(creators) == 0:
        return RecommendationResponse(
            briefId=brief.get("id"),
            campaignTitle=brief.get("title", "Campaign Brief"),
            recommendations=[],
            aiRationale="No creator candidates found to evaluate."
        )

    # Calculate deterministic base metrics for all creators
    candidates_with_scores = []
    for c in creators:
        score_info = compute_weighted_match(brief, c)
        candidates_with_scores.append({
            "creator": c,
            "scoreInfo": score_info
        })

    # Sort to examine top and varied candidates
    candidates_with_scores.sort(key=lambda x: x["scoreInfo"]["totalScore"], reverse=True)

    model = _get_gemini_model()
    if not model:
        # Fallback to rule based
        rule_recs = rule_based_match(brief, creators)
        return RecommendationResponse(
            briefId=brief.get("id"),
            campaignTitle=brief.get("title", "Campaign Brief"),
            recommendations=rule_recs[:8],
            aiRationale="Creators evaluated and ranked using transparent multi-vector weighted scoring."
        )

    creators_summary = [
        {
            "creatorId": item["creator"].get("creatorId"),
            "name": item["creator"].get("name"),
            "handle": item["creator"].get("handle"),
            "roleTitle": item["creator"].get("roleTitle"),
            "genres": item["creator"].get("genres", []),
            "tools": item["creator"].get("tools", []),
            "totalFollowers": f"{item['creator'].get('totalFollowers', 0) // 1000}K",
            "engagementRate": f"{item['creator'].get('engagementRate', 5.0)}%",
            "bio": item["creator"].get("bio", ""),
            "computedScore": item["scoreInfo"]["totalScore"],
            "tier": item["scoreInfo"]["tier"],
            "breakdown": item["scoreInfo"]["breakdown"],
            "rate": item["creator"].get("rate", "$1,500"),
            "strengths": item["creator"].get("strengths", []),
        }
        for item in candidates_with_scores[:10]
    ]

    prompt = f"""
You are the Executive AI Talent Director for Ember Creator Marketplace.
A brand posted the following campaign brief:

BRIEF:
Title: {brief.get('title')}
Description: {brief.get('description')}
Genres: {brief.get('genres', [])}
Content Types: {brief.get('contentTypes', [])}
Preferred Tools: {brief.get('preferredTools', [])}
Target Audience: {brief.get('targetAudience')}
Visual Aesthetic: {brief.get('visualAesthetic')}
Budget: {brief.get('budget')}

EVALUATE CANDIDATE CREATORS:
Here are the candidate creators with computed multi-vector match scores:
{json.dumps(creators_summary, indent=2)}

Provide an insightful, personalized "Why this creator matches" explanation for each creator.
Explain specifically why top creators are an exceptional fit, and what unique creative angles or trade-offs other creators have.

Return ONLY a valid JSON object matching this schema:
{{
  "aiRationale": "2-sentence executive summary of talent pool alignment for this campaign",
  "explanations": [
    {{
      "creatorId": "string",
      "whyMatches": "1-2 sentences explaining specifically why this creator matches or has creative synergy with this brief."
    }}
  ]
}}
Return ONLY valid JSON.
"""

    explanations_map = {}
    ai_rationale = "Candidate creators evaluated using transparent multi-vector scoring and Gemini analysis."

    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            data = json.loads(_clean_json_text(res.text))
            ai_rationale = data.get("aiRationale", ai_rationale)
            for exp in data.get("explanations", []):
                explanations_map[exp.get("creatorId")] = exp.get("whyMatches")
            break
        except Exception as e:
            logger.warning(f"Gemini creator matching attempt {attempt + 1} failed: {e}")

    # Build final response with transparent score breakdown and Gemini explanations
    recommendations: List[CreatorRecommendationItem] = []
    for item in candidates_with_scores:
        c = item["creator"]
        score_info = item["scoreInfo"]
        cid = c.get("creatorId", "")

        gemini_explanation = explanations_map.get(cid)
        if not gemini_explanation:
            synergies = ", ".join(c.get("genres", [])[:2])
            gemini_explanation = f"Matches campaign parameters with deep expertise in {synergies}."

        followers = c.get("totalFollowers", 0)
        followers_str = f"{followers / 1000:.0f}K" if followers >= 1000 else str(followers)
        engagement_str = f"{c.get('engagementRate', 5.0)}%"

        recommendations.append(CreatorRecommendationItem(
            creatorId=cid,
            name=c.get("name", ""),
            avatar=c.get("avatar", ""),
            handle=c.get("handle", "@creator"),
            roleTitle=c.get("roleTitle", "AI Creator"),
            matchPercentage=score_info["totalScore"],
            tier=score_info["tier"],
            matchRationale=gemini_explanation,
            weightedBreakdown=score_info["breakdown"],
            genres=c.get("genres", [])[:3],
            tools=c.get("tools", [])[:3],
            totalFollowers=followers_str,
            engagementRate=engagement_str,
            strengths=c.get("strengths", ["Generative mastery"]),
            bestForCategories=c.get("bestForCategories", c.get("genres", [])[:2]),
            commercialAvailability=c.get("commercialAvailability", "Immediate"),
            rate=c.get("rate", "$1,500"),
        ))

    return RecommendationResponse(
        briefId=brief.get("id"),
        campaignTitle=brief.get("title"),
        recommendations=recommendations,
        aiRationale=ai_rationale
    )
