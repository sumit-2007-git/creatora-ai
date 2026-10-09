"""Creatora AI Creative Tools API router.
Provides Moodboard generator, Aura Audit, and Rate calculator powered by Gemini AI.
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel, Field

import google.generativeai as genai
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("tools_api")
router = APIRouter(prefix="/tools", tags=["Creative Tools"])


# -------------------------------------------------------------
# 1. MOODBOARD GENERATOR
# -------------------------------------------------------------
class PaletteColor(BaseModel):
    name: str
    hex: str
    role: str

class PromptRecipe(BaseModel):
    tool: str
    prompt: str
    notes: str

class MoodboardResponse(BaseModel):
    concept: str
    palette: List[PaletteColor]
    lighting: str
    camera: str
    toolchain: List[str]
    promptRecipes: List[PromptRecipe]
    aestheticSummary: str

class MoodboardRequest(BaseModel):
    concept: str
    category: Optional[str] = "Fashion & Luxury"
    mood: Optional[str] = "Cinematic Neo-Noir"


def fallback_moodboard(concept: str, category: str = "General", mood: str = "Cinematic") -> MoodboardResponse:
    concept_clean = concept.strip() or "Futuristic Brand Campaign"
    return MoodboardResponse(
        concept=concept_clean,
        palette=[
            PaletteColor(name="Electric Violet", hex="#7C3AED", role="Hero Accent"),
            PaletteColor(name="Obsidian Ink", hex="#161026", role="Deep Shadow"),
            PaletteColor(name="Sakura Blush", hex="#FF7597", role="Atmospheric Glow"),
            PaletteColor(name="Cream Paper", hex="#FAF7F2", role="Surface Neutral"),
            PaletteColor(name="Nova Sparkle", hex="#E0B0FF", role="Highlight Lens Flare"),
        ],
        lighting="Chiaroscuro studio illumination with volumetric anamorphic rim lights and cyan bounce",
        camera="ARRI Alexa 65 sensor look, 35mm anamorphic prime lens, shallow depth of field (f/1.8)",
        toolchain=["Midjourney v6.1", "Runway Gen-3 Alpha", "ComfyUI ControlNet", "DaVinci Resolve Studio"],
        promptRecipes=[
            PromptRecipe(
                tool="Midjourney v6.1",
                prompt=f"Cinematic key visual for {concept_clean}, hyper-detailed Japanese anime watercolor realism, volumetric neon rim light, octane render, 8k resolution, photorealistic paper texture, --ar 16:9 --style raw --v 6.1",
                notes="Ideal for primary campaign hero banner & storyboard keyframes."
            ),
            PromptRecipe(
                tool="Runway Gen-3",
                prompt=f"Slow camera dolly in on {concept_clean}, atmospheric dust motes floating in violet backlight, dynamic fabric motion, high cinematic dynamic range, 4k 60fps",
                notes="Perfect for generating 10s viral Reels & TikTok brand stingers."
            ),
            PromptRecipe(
                tool="ElevenLabs Audio",
                prompt=f"Subtle ambient neo-classical synth drone building into crisp cinematic percussion for {concept_clean}",
                notes="Sonic atmosphere bed to accompany the visual motion."
            )
        ],
        aestheticSummary=f"A visually striking '{mood}' aesthetic tailored for high-end {category} campaigns, pairing tactile paper texture with cutting-edge neural lighting."
    )


@router.post("/moodboard", response_model=MoodboardResponse)
async def generate_moodboard(req: MoodboardRequest):
    """Generate comprehensive creative moodboard & aesthetic DNA deck using Gemini."""
    model = _get_gemini_model()
    if not model:
        return fallback_moodboard(req.concept, req.category or "General", req.mood or "Cinematic")

    prompt = f"""
You are the world's elite Creative Director for AI-generated commercials and visual campaigns at Creatora AI.
Analyze the user's creative concept:
Concept: "{req.concept}"
Category: "{req.category}"
Target Mood: "{req.mood}"

Return ONLY a valid JSON object matching this schema:
{{
  "concept": "{req.concept}",
  "palette": [
    {{"name": "Color Name", "hex": "#HEXCODE", "role": "Role e.g. Hero Accent/Deep Shadow/Glow"}},
    {{"name": "Color Name 2", "hex": "#HEXCODE", "role": "Role"}},
    {{"name": "Color Name 3", "hex": "#HEXCODE", "role": "Role"}},
    {{"name": "Color Name 4", "hex": "#HEXCODE", "role": "Role"}},
    {{"name": "Color Name 5", "hex": "#HEXCODE", "role": "Role"}}
  ],
  "lighting": "Detailed professional lighting description",
  "camera": "Lens, focal length, sensor spec, depth of field",
  "toolchain": ["Tool 1", "Tool 2", "Tool 3", "Tool 4"],
  "promptRecipes": [
    {{"tool": "Midjourney v6.1", "prompt": "exact detailed prompt", "notes": "what this prompt generates"}},
    {{"tool": "Runway Gen-3", "prompt": "motion prompt", "notes": "what this motion prompt generates"}},
    {{"tool": "ElevenLabs", "prompt": "sound prompt", "notes": "audio cue"}}
  ],
  "aestheticSummary": "2-sentence summary of the visual direction"
}}
"""
    try:
        response = await model.generate_content_async(prompt)
        cleaned = _clean_json_text(response.text)
        data = json.loads(cleaned)
        return MoodboardResponse(**data)
    except Exception as e:
        logger.warning(f"Gemini moodboard generation failed ({e}), using fallback")
        return fallback_moodboard(req.concept, req.category or "General", req.mood or "Cinematic")


# -------------------------------------------------------------
# 2. CREATOR AURA AUDIT
# -------------------------------------------------------------
class AuraAuditRequest(BaseModel):
    creatorName: Optional[str] = "Creator"
    skills: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    specialization: Optional[str] = "AI Filmmaker"
    experienceYears: Optional[int] = 2

class AuraAuditResponse(BaseModel):
    auraScore: int
    commercialTier: str
    rateRange: str
    strengths: List[str]
    growthOpportunities: List[str]
    recommendedBrandNiches: List[str]
    pitchSummary: str


def fallback_audit(req: AuraAuditRequest) -> AuraAuditResponse:
    # Compute deterministic score based on skills & tools
    base_score = 75
    tool_bonus = min(15, len(req.tools) * 3)
    skill_bonus = min(10, len(req.skills) * 2)
    final_score = min(99, base_score + tool_bonus + skill_bonus)

    tier = "Tier-1 Commercial Master" if final_score >= 90 else "Established Commercial Creator" if final_score >= 80 else "Emerging AI Artist"
    rate = "$3,500 – $6,500" if final_score >= 90 else "$1,800 – $3,500" if final_score >= 80 else "$800 – $1,800"

    return AuraAuditResponse(
        auraScore=final_score,
        commercialTier=tier,
        rateRange=rate,
        strengths=[
            f"Strong command of foundational generative workflows ({', '.join(req.tools[:3]) or 'GenAI Suite'})",
            f"Clear positioning in {req.specialization}",
            "Strong multi-modal storytelling potential"
        ],
        growthOpportunities=[
            "Add ComfyUI ControlNet for precise enterprise character consistency across shots",
            "Incorporate Topaz Video AI upscaling to command luxury 4K advertising budgets",
            "Offer packaged 3-tier delivery (Stinger, Hero Reel, Stills package) to increase deal size"
        ],
        recommendedBrandNiches=["Sneakers & Streetwear", "Luxury Fashion", "Gaming & Interactive Tech", "AI Software & Apps"],
        pitchSummary=f"{req.creatorName} is an elite {req.specialization} leveraging {', '.join(req.tools[:2]) or 'cutting-edge AI'} to deliver cinematic-grade commercial assets with unmatched prompt precision and aesthetic depth."
    )


@router.post("/audit", response_model=AuraAuditResponse)
async def generate_audit(req: AuraAuditRequest):
    """Analyze a creator's profile and generate commercial Aura score and monetization recommendations."""
    model = _get_gemini_model()
    if not model:
        return fallback_audit(req)

    prompt = f"""
You are the Head of Talent Assessment at Creatora AI Marketplace.
Conduct an 'Aura Audit' for this AI Creator:
Name: "{req.creatorName}"
Specialization: "{req.specialization}"
Skills: {json.dumps(req.skills)}
Tools: {json.dumps(req.tools)}
Experience: {req.experienceYears} years

Calculate an Aura Score (between 70 and 98 based on tool depth, enterprise demand, and commercial appeal).
Return ONLY a valid JSON object matching this schema:
{{
  "auraScore": 92,
  "commercialTier": "Tier-1 Commercial Master",
  "rateRange": "$3,000 – $6,500 per deliverable",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "growthOpportunities": ["Specific tool/skill suggestion to earn 2x more", "Workflow tip", "Commercial packaging tip"],
  "recommendedBrandNiches": ["Niche 1", "Niche 2", "Niche 3"],
  "pitchSummary": "2-sentence high-impact bio for pitch decks"
}}
"""
    try:
        response = await model.generate_content_async(prompt)
        cleaned = _clean_json_text(response.text)
        data = json.loads(cleaned)
        return AuraAuditResponse(**data)
    except Exception as e:
        logger.warning(f"Gemini audit failed ({e}), using fallback")
        return fallback_audit(req)
