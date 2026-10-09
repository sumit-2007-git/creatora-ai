"""Gemini-powered social profile analyzer for creator onboarding and social import."""

import os
import re
import json
import logging
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

import google.generativeai as genai
from dotenv import load_dotenv

logger = logging.getLogger("profile_analyzer")
load_dotenv()


class ExtractedSocialProfile(BaseModel):
    handle: str = Field(description="Creator username or handle")
    category: str = Field(description="Primary category, e.g. Fashion, Tech, Lifestyle, Art")
    specializations: List[str] = Field(default_factory=list, description="Specific niches, e.g. Cinematic AI, 3D Product Ads")
    skills: List[str] = Field(default_factory=list, description="Identified skills, e.g. Prompt Engineering, Color Grading")
    tools: List[str] = Field(default_factory=list, description="AI and creative tools, e.g. Runway, Midjourney, Adobe, DaVinci Resolve")
    contentTypes: List[str] = Field(default_factory=list, description="Content formats, e.g. Reels, Shorts, AI Films, Product Ads")
    totalFollowers: int = Field(default=10000, description="Estimated or parsed follower count")
    monthlyViews: int = Field(default=150000, description="Estimated monthly video/post views")
    engagementRate: float = Field(default=5.0, description="Calculated engagement rate percentage")
    audienceSummary: str = Field(default="", description="Summary of the creator's audience and demographic")
    suggestedBio: str = Field(default="", description="Polished, brand-ready creator bio")
    suggestedRate: str = Field(default="$1,200", description="Suggested commercial collaboration rate")
    aiSummary: str = Field(default="", description="Gemini generated high-level talent overview")
    strengths: List[str] = Field(default_factory=list, description="Key creative and commercial strengths")
    bestForCategories: List[str] = Field(default_factory=list, description="Best fit campaign categories and brand verticals")
    metricsSource: str = Field(default="self-reported", description="Source of metrics (self-reported or verified)")
    isSelfReported: bool = Field(default=True, description="Flag indicating metrics are self-reported")
    configured: bool = Field(default=True, description="Whether Gemini API was used")
    warning: Optional[str] = None


def _get_gemini_model():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or "YOUR" in api_key:
        return None
    genai.configure(api_key=api_key)
    model_name = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
    return genai.GenerativeModel(model_name)


def _clean_json_text(text: str) -> str:
    """Strip markdown code fence blocks if present."""
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\n?", "", text)
        text = re.sub(r"\n?```$", "", text)
    return text.strip()


def heuristic_fallback_profile(
    handle: str,
    bio: str = "",
    followers_raw: Any = 10000,
    likes_raw: Any = 500,
    views_raw: Any = 10000,
    captions: str = ""
) -> ExtractedSocialProfile:
    """Smart heuristic profile analyzer when Gemini is offline or unconfigured."""
    text_corpus = f"{bio} {captions}".lower()

    # Parse followers
    followers = 10000
    try:
        if isinstance(followers_raw, (int, float)):
            followers = int(followers_raw)
        else:
            clean = str(followers_raw).upper().replace(",", "").replace("+", "").strip()
            if "K" in clean:
                followers = int(float(clean.replace("K", "")) * 1000)
            elif "M" in clean:
                followers = int(float(clean.replace("M", "")) * 1000000)
            else:
                followers = int(float(clean))
    except Exception:
        followers = 15000

    # Parse likes
    likes = 500
    try:
        if isinstance(likes_raw, (int, float)):
            likes = int(likes_raw)
        else:
            clean = str(likes_raw).upper().replace(",", "").replace("+", "").strip()
            if "K" in clean:
                likes = int(float(clean.replace("K", "")) * 1000)
            else:
                likes = int(float(clean))
    except Exception:
        likes = int(followers * 0.05)

    engagement_rate = round(min(max((likes / max(followers, 1)) * 100, 1.2), 15.0), 1)
    monthly_views = int(followers * 4.2)

    # Detect category
    category = "Art"
    if any(k in text_corpus for k in ["fashion", "style", "outfit", "apparel", "sneaker"]):
        category = "Fashion"
    elif any(k in text_corpus for k in ["tech", "ai", "software", "code", "hardware", "gpu"]):
        category = "Tech"
    elif any(k in text_corpus for k in ["travel", "japan", "nature", "wanderlust"]):
        category = "Travel"
    elif any(k in text_corpus for k in ["lifestyle", "daily", "vlog", "aesthetic", "beauty", "skincare"]):
        category = "Lifestyle"
    elif any(k in text_corpus for k in ["food", "recipe", "cook", "coffee"]):
        category = "Food"

    # Detect tools
    tools = []
    if "runway" in text_corpus or "gen-2" in text_corpus:
        tools.append("Runway")
    if "midjourney" in text_corpus or "mj" in text_corpus:
        tools.append("Midjourney")
    if "adobe" in text_corpus or "premiere" in text_corpus or "photoshop" in text_corpus:
        tools.append("Adobe")
    if "davinci" in text_corpus or "resolve" in text_corpus:
        tools.append("DaVinci Resolve")
    if "stable diffusion" in text_corpus or "sd" in text_corpus:
        tools.append("Stable Diffusion")
    if not tools:
        tools = ["Midjourney", "Runway", "Adobe"]

    # Detect content types
    content_types = ["Reels", "Product Ads"]
    if "youtube" in text_corpus or "long" in text_corpus:
        content_types.append("YouTube")
    if "film" in text_corpus or "cinema" in text_corpus:
        content_types.append("AI Films")
    if "short" in text_corpus:
        content_types.append("Shorts")

    clean_handle = handle if handle.startswith("@") else f"@{handle}"

    return ExtractedSocialProfile(
        handle=clean_handle,
        category=category,
        specializations=[f"{category} Storytelling", "Generative Visuals", "Brand Collaboration"],
        skills=["Prompt Design", "Video Production", "Visual Direction", "Pacing"],
        tools=tools,
        contentTypes=content_types,
        totalFollowers=followers,
        monthlyViews=monthly_views,
        engagementRate=engagement_rate,
        audienceSummary=f"High affinity for {category.lower()} and creative innovation, strongly skewed towards 18-34 demographic.",
        suggestedBio=bio or f"Creating impactful {category.lower()} visual narratives with cutting-edge AI tools.",
        suggestedRate=f"${max(int(followers / 100 * 1.5), 800):,}",
        aiSummary=f"Visual creator specializing in {category} narratives with demonstrated command of {', '.join(tools[:2])}.",
        strengths=["Consistent aesthetic identity", "Strong engagement retention", "Fast turnaround with AI pipelines"],
        bestForCategories=[f"{category} Commercials", "Social Product Showcases", "Brand Storytelling"],
        metricsSource="self-reported",
        isSelfReported=True,
        configured=False,
        warning="Processed via intelligent local parser. Configure GEMINI_API_KEY for deep multimodal AI extraction."
    )


async def analyze_social_profile(
    handle: str,
    bio: str = "",
    followers_raw: Any = 10000,
    likes_raw: Any = 500,
    views_raw: Any = 10000,
    captions: str = "",
    screenshot_bytes: Optional[bytes] = None,
    screenshot_mime: str = "image/jpeg"
) -> ExtractedSocialProfile:
    """Extract structured creator attributes using Gemini with multimodal vision + text."""
    model = _get_gemini_model()

    if not model:
        logger.info("Gemini model unavailable. Falling back to heuristic extraction.")
        return heuristic_fallback_profile(handle, bio, followers_raw, likes_raw, views_raw, captions)

    system_prompt = f"""
You are an expert AI talent scout and influencer marketing strategist for the Ember Creator Marketplace.
Analyze this creator's social media profile data and extract structured profile attributes.

NOTE: All user provided follower and view metrics are self-reported. Never fabricate or scrape external servers.

CREATOR INFO:
Handle: {handle}
Bio: {bio}
Reported Followers: {followers_raw}
Reported Avg Likes: {likes_raw}
Reported Avg Views: {views_raw}
Recent Post Captions / Content:
{captions}

Return ONLY a valid JSON object with the following schema:
{{
  "handle": "{handle}",
  "category": "One of: Fashion, Tech, Lifestyle, Travel, Food, Art, Gaming, Automotive",
  "specializations": ["List of 2-3 specific sub-niches"],
  "skills": ["List of 3-4 creative/technical skills"],
  "tools": ["List of creative and AI tools, e.g. Runway, Midjourney, Adobe, DaVinci Resolve, Stable Diffusion, Blender"],
  "contentTypes": ["List of formats: Reels, YouTube, Shorts, Product Ads, AI Films"],
  "totalFollowers": integer,
  "monthlyViews": integer,
  "engagementRate": float (percentage, e.g. 6.8),
  "audienceSummary": "Concise 1-2 sentence description of target audience and demographic",
  "suggestedBio": "Refined 2-sentence commercial bio for brand partnerships",
  "suggestedRate": "String formatted like '$1,500'",
  "aiSummary": "2-sentence executive summary of this creator's unique creative style and commercial value",
  "strengths": ["List of 3 distinct creative/execution strengths"],
  "bestForCategories": ["List of 3 specific campaign types or brand verticals they are best suited for"],
  "metricsSource": "self-reported",
  "isSelfReported": true
}}
Do NOT include markdown formatting or commentary. Return ONLY the JSON object.
"""

    contents: List[Any] = [system_prompt]
    if screenshot_bytes:
        contents.append({
            "mime_type": screenshot_mime,
            "data": screenshot_bytes
        })

    # Retry loop (up to 2 retries)
    for attempt in range(2):
        try:
            response = model.generate_content(contents)
            text = _clean_json_text(response.text)
            data = json.loads(text)
            data["metricsSource"] = "self-reported"
            data["isSelfReported"] = True
            parsed = ExtractedSocialProfile(**data)
            parsed.configured = True
            return parsed
        except Exception as e:
            logger.warning(f"Gemini social analysis attempt {attempt + 1} error: {e}")

    logger.warning("Gemini attempts exhausted. Using fallback heuristic.")
    return heuristic_fallback_profile(handle, bio, followers_raw, likes_raw, views_raw, captions)
