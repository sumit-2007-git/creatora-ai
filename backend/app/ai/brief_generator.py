"""Gemini-powered Campaign Brief Assistant helping Brands turn one-line ideas into structured briefs."""

import os
import json
import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

import google.generativeai as genai
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("brief_generator")


class EnhancedBriefData(BaseModel):
    title: str
    description: str
    contentTypes: List[str] = Field(default_factory=lambda: ["Reels", "Product Ads"])
    platform: str = "Omnichannel (Instagram & TikTok)"
    style: str = "Cinematic Anime Watercolor with High Dynamic Range"
    aspectRatio: str = "9:16 (Vertical)"
    targetAudience: str = "Gen Z & Millennials interested in digital creativity and aesthetics"
    skills: List[str] = Field(default_factory=lambda: ["Prompt Engineering", "Color Grading", "Visual Storytelling"])
    preferredTools: List[str] = Field(default_factory=lambda: ["Runway", "Midjourney", "DaVinci Resolve"])
    budget: str = "$4,000–$8,000"
    licensing: str = "Commercial Digital Rights (12 Months worldwide)"
    deadline: str = "30 Days"
    deliverablesCount: int = 3
    visualAesthetic: str = "Warm cream sketchbook tones, ink line detail, anime screentones, watercolor gradients"
    suggestedHashtags: List[str] = Field(default_factory=lambda: ["#AICreator", "#GenerativeMedia", "#EmberMarketplace"])
    genres: List[str] = Field(default_factory=lambda: ["Fashion", "Tech"])


def fallback_enhanced_brief(seed_idea: str, category: str = "Lifestyle") -> EnhancedBriefData:
    clean_idea = seed_idea.strip() if seed_idea else "Cinematic visual campaign with AI aesthetics"
    return EnhancedBriefData(
        title=f"{clean_idea.capitalize()[:40]} Campaign",
        description=f"A high-impact visual campaign exploring '{clean_idea}'. Combining hyper-detailed neural synthesis with cinematic pacing to drive viral audience engagement and brand prestige.",
        contentTypes=["Reels", "Product Ads", "AI Films"],
        platform="Instagram & TikTok (Omnichannel)",
        style="Cinematic Anime Watercolor & Studio Lighting",
        aspectRatio="9:16 (Vertical)",
        targetAudience="Trend-forward Gen Z & Tech-savvy Millennials (Ages 18–34)",
        skills=["Prompt Engineering", "3D Camera Projection", "Sound Design", "Color Grading"],
        preferredTools=["Midjourney", "Runway Gen-2", "DaVinci Resolve"],
        budget="$4,500–$8,500",
        licensing="Commercial Digital Media Rights (12 Months)",
        deadline="25 Days",
        deliverablesCount=3,
        visualAesthetic="Subtle paper grain, dramatic ink contours, rich watercolor atmospheric washes",
        suggestedHashtags=["#AICreator", "#GenerativeArt", "#CreativeTech", "#EmberLaunch"],
        genres=[category, "Fashion", "Tech"]
    )


async def enhance_campaign_brief(seed_idea: str, category: str = "Lifestyle") -> EnhancedBriefData:
    model = _get_gemini_model()
    if not model:
        return fallback_enhanced_brief(seed_idea, category)

    prompt = f"""
You are an award-winning creative agency director at Ember AI Creator Marketplace.
Turn this one-line campaign idea into a complete, editable, production-ready structured brief for AI creators:

ONE-LINE IDEA:
"{seed_idea}"
CATEGORY / INDUSTRY:
"{category}"

Return ONLY a valid JSON object matching this schema:
{{
  "title": "Evocative, premium campaign title",
  "description": "Thorough 3-4 sentence creative brief explaining core narrative, brand identity and deliverables",
  "contentTypes": ["2-3 formats, e.g. Reels, Product Ads, AI Films, YouTube"],
  "platform": "Primary platform, e.g. Instagram & TikTok, YouTube, or Omnichannel",
  "style": "Visual style direction, e.g. Cinematic Anime Watercolor, Cyberpunk Hyperrealism, Studio Minimalism",
  "aspectRatio": "e.g. '9:16 (Vertical)' or '16:9 (Cinematic)' or '4:5 (Feed)'",
  "targetAudience": "Detailed audience demographics and consumer psychographics",
  "skills": ["3-4 key technical skills needed, e.g. LoRA Training, Prompt Engineering, Color Grading, Sound Design"],
  "preferredTools": ["AI & video software tools, e.g. Runway, Midjourney, Blender, DaVinci Resolve"],
  "budget": "Realistic commercial budget range, e.g. '$5,000–$9,000'",
  "licensing": "Licensing rights, e.g. 'Commercial Digital Rights (12 Months)' or 'Full Worldwide Buyout'",
  "deadline": "e.g. '21 Days' or '30 Days'",
  "deliverablesCount": integer between 2 and 4,
  "visualAesthetic": "Detailed lighting, color palette, camera motion and mood notes",
  "suggestedHashtags": ["3-4 relevant campaign hashtags"],
  "genres": ["2-3 genres matching the concept, e.g. Sneakers, Fashion, Tech, Beauty, Gaming, Automotive"]
}}
Return ONLY valid JSON.
"""

    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            data = json.loads(_clean_json_text(res.text))
            return EnhancedBriefData(**data)
        except Exception as e:
            logger.warning(f"Gemini brief enhancement error (attempt {attempt + 1}): {e}")

    return fallback_enhanced_brief(seed_idea, category)
