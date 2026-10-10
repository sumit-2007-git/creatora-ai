"""AI Dream Team Builder: Assembles complementary multi-creator production squads for campaign briefs."""

import json
import logging
from typing import List, Dict, Any, Optional

from app.schemas.recommendation import DreamTeamResponse, DreamTeamMember
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("dream_team")


def build_dream_team_rule_based(
    brief: Dict[str, Any],
    creators: List[Dict[str, Any]]
) -> DreamTeamResponse:
    """Fallback rule-based squad selection picking complementary talent."""
    if not creators:
        return DreamTeamResponse(
            briefId=brief.get("id"),
            campaignTitle=brief.get("title", "Campaign"),
            teamName="Creative Genesis Squad",
            synergyScore=94,
            collectiveReach="475K Followers",
            estimatedBudget="$5,800",
            turnaroundTime="10-12 Days",
            members=[],
            squadStrategy="Balanced production squad covering directorial vision, concept synthesis, and post-production polish."
        )

    # 1. Lead Director (Video / Cinematic focus)
    directors = [
        c for c in creators
        if any("video" in g.lower() or "fashion" in g.lower() or "sneaker" in g.lower() or "tech" in g.lower() for g in c.get("genres", []))
        or "runway" in [t.lower() for t in c.get("tools", [])]
    ]
    lead = directors[0] if directors else creators[0]

    # 2. Concept & Prompt Specialist (Art / Midjourney / LoRA)
    concept_creators = [
        c for c in creators
        if c.get("creatorId") != lead.get("creatorId")
        and ("midjourney" in [t.lower() for t in c.get("tools", [])] or any("art" in g.lower() or "beauty" in g.lower() for g in c.get("genres", [])))
    ]
    concept = concept_creators[0] if concept_creators else (creators[1] if len(creators) > 1 else lead)

    # 3. Post-Production & VFX Specialist (Blender / DaVinci / Adobe)
    vfx_creators = [
        c for c in creators
        if c.get("creatorId") not in [lead.get("creatorId"), concept.get("creatorId")]
    ]
    vfx = vfx_creators[0] if vfx_creators else (creators[2] if len(creators) > 2 else lead)

    members_raw = [
        (lead, "Lead Creative Director", lead.get("tools", ["Runway"])[0], "Cinematic pacing & brand storytelling"),
        (concept, "Concept & Prompt Specialist", concept.get("tools", ["Midjourney"])[0], "Style transfer & character consistency"),
        (vfx, "Motion & VFX Editor", vfx.get("tools", ["DaVinci Resolve"])[0], "Sound sync & high-precision color grading"),
    ]

    total_followers = sum(c.get("totalFollowers", 0) for c, _, _, _ in members_raw)
    reach_str = f"{total_followers // 1000}K Combined Reach" if total_followers >= 1000 else f"{total_followers} Reach"

    members: List[DreamTeamMember] = []
    for c, role, tool, strength in members_raw:
        fol = c.get("totalFollowers", 0)
        fol_str = f"{fol // 1000}K" if fol >= 1000 else str(fol)
        members.append(DreamTeamMember(
            creatorId=c.get("creatorId", ""),
            name=c.get("name", "Creator"),
            avatar=c.get("avatar", ""),
            handle=c.get("handle", "@creator"),
            assignedRole=role,
            primaryTool=tool,
            keyStrength=strength,
            followers=fol_str,
            engagementRate=f"{c.get('engagementRate', 6.5)}%",
            rate=c.get("rate", "$2,000")
        ))

    return DreamTeamResponse(
        briefId=brief.get("id"),
        campaignTitle=brief.get("title", "Campaign Brief"),
        teamName=f"Squad {brief.get('genres', ['Ember'])[0]} Alpha",
        synergyScore=96,
        collectiveReach=reach_str,
        estimatedBudget="$5,800–$7,500",
        turnaroundTime="8–10 Days",
        members=members,
        squadStrategy="This 3-creator team pairs high-tempo directorial execution with world-class prompt engineering and technical color mastery for maximum viral resonance."
    )


async def build_dream_team_with_gemini(
    brief: Dict[str, Any],
    creators: List[Dict[str, Any]]
) -> DreamTeamResponse:
    """Uses Gemini to synthesize an optimal multi-creator Dream Team squad for the brief."""
    base_team = build_dream_team_rule_based(brief, creators)
    model = _get_gemini_model()
    if not model or not base_team.members:
        return base_team

    prompt = f"""
You are the AI Executive Producer for Creatora AI Creator Marketplace.
A brand posted this campaign brief:
Brief: {brief.get('title')}
Description: {brief.get('description')}
Genres: {brief.get('genres', [])}
Budget: {brief.get('budget', '$5,000')}

We assembled this 3-creator production dream team:
{[m.dict() for m in base_team.members]}

Provide a creative squad synthesis JSON object:
{{
  "teamName": "Creative Squad Name (e.g. Neo-Vogue Production Unit)",
  "synergyScore": 95,
  "turnaroundTime": "e.g. 7-10 Days",
  "squadStrategy": "2-3 sentences explaining how these 3 creators collaborate to execute this campaign faster and with higher fidelity than a traditional agency."
}}
Return ONLY valid JSON.
"""

    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            data = json.loads(_clean_json_text(res.text))
            if "teamName" in data:
                base_team.teamName = data["teamName"]
            if "synergyScore" in data:
                base_team.synergyScore = int(data["synergyScore"])
            if "turnaroundTime" in data:
                base_team.turnaroundTime = data["turnaroundTime"]
            if "squadStrategy" in data:
                base_team.squadStrategy = data["squadStrategy"]
            break
        except Exception as e:
            logger.warning(f"Dream team Gemini attempt {attempt + 1} failed: {e}")

    return base_team
