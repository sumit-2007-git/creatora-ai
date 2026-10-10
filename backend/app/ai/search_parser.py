"""Natural Language AI Search query parser powered by Gemini with Pydantic validation, retry, and rule-based fallback."""

import os
import re
import json
import time
import logging
from typing import Dict, Any, Tuple, Optional
from collections import deque

from app.schemas.recommendation import StructuredSearchQuery
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("search_parser")

# In-memory query cache: { query_lower: (timestamp, StructuredSearchQuery, is_basic) }
_QUERY_CACHE: Dict[str, Tuple[float, StructuredSearchQuery, bool]] = {}
CACHE_TTL_SECONDS = 120.0

# Simple sliding window rate-limiter: deque of timestamps
_REQUEST_TIMESTAMPS: deque = deque()
RATE_LIMIT_MAX_PER_MINUTE = 60


def check_rate_limit() -> bool:
    """Returns True if within rate limit, False if rate-limited."""
    now = time.time()
    while _REQUEST_TIMESTAMPS and now - _REQUEST_TIMESTAMPS[0] > 60:
        _REQUEST_TIMESTAMPS.popleft()
    if len(_REQUEST_TIMESTAMPS) >= RATE_LIMIT_MAX_PER_MINUTE:
        return False
    _REQUEST_TIMESTAMPS.append(now)
    return True


def rule_based_query_parser(query: str) -> StructuredSearchQuery:
    """
    Resilient keyword & synonym parser that extracts structured campaign
    attributes from freeform text without relying on Gemini.
    """
    q = query.lower()

    # 1. Industry / Niche
    industry = None
    if any(k in q for k in ["sneaker", "shoe", "kicks", "footwear"]):
        industry = "Sneakers"
    elif any(k in q for k in ["game", "gaming", "esports", "trailer", "rpg", "anime"]):
        industry = "Gaming"
    elif any(k in q for k in ["car", "automotive", "ev", "vehicle", "hypercar"]):
        industry = "Automotive"
    elif any(k in q for k in ["beauty", "skin", "skincare", "cosmetic", "glow"]):
        industry = "Beauty"
    elif any(k in q for k in ["fashion", "runway", "clothing", "streetwear", "apparel"]):
        industry = "Fashion"
    elif any(k in q for k in ["tech", "ai", "hardware", "gadget", "software"]):
        industry = "Tech"
    elif any(k in q for k in ["travel", "tourism", "hotel", "destination"]):
        industry = "Travel"
    elif any(k in q for k in ["luxury", "watch", "jewelry"]):
        industry = "Luxury"

    # 2. Content Type
    content_type = None
    if any(k in q for k in ["reel", "reels", "short-form", "9:16"]):
        content_type = "Reels"
    elif any(k in q for k in ["ad", "commercial", "promo", "product ad"]):
        content_type = "Product Ads"
    elif any(k in q for k in ["film", "cinematic", "short film", "movie"]):
        content_type = "AI Films"
    elif any(k in q for k in ["short", "shorts"]):
        content_type = "Shorts"

    # 3. Visual Style
    style = None
    if any(k in q for k in ["cinematic", "movie look", "dramatic"]):
        style = "Cinematic"
    elif any(k in q for k in ["anime", "sketch", "manga", "watercolor"]):
        style = "Anime Sketchbook"
    elif any(k in q for k in ["neon", "cyberpunk", "futuristic", "sci-fi"]):
        style = "Cyberpunk / Neon"
    elif any(k in q for k in ["hyperrealistic", "photoreal", "real"]):
        style = "Hyperrealistic"
    elif any(k in q for k in ["minimal", "clean", "pastel"]):
        style = "Minimalist"

    # 4. Tools
    tools = []
    if "runway" in q or "gen-2" in q or "gen-3" in q:
        tools.append("Runway")
    if "midjourney" in q:
        tools.append("Midjourney")
    if "blender" in q or "3d" in q:
        tools.append("Blender")
    if "unreal" in q:
        tools.append("Unreal Engine")
    if "comfyui" in q or "stable diffusion" in q:
        tools.append("ComfyUI")
    if "after effects" in q or "vfx" in q:
        tools.append("Adobe")
    if not tools:
        if content_type in ["AI Films", "Product Ads"]:
            tools = ["Runway", "Midjourney"]
        else:
            tools = ["Midjourney"]

    # 5. Skills
    skills = []
    if any(k in q for k in ["cinematic", "film", "direct"]):
        skills.append("Storyboarding")
        skills.append("Prompt Engineering")
    if any(k in q for k in ["color", "grade", "davinci"]):
        skills.append("DaVinci Color Grading")
    if any(k in q for k in ["vfx", "motion", "3d"]):
        skills.append("VFX")
    if not skills:
        skills = ["Prompt Engineering", "Creative Direction"]

    # 6. Budget Range
    budget_range = None
    if any(k in q for k in ["cheap", "low budget", "affordable", "budget"]):
        budget_range = "$1,000–$2,500"
    elif any(k in q for k in ["luxury", "high end", "enterprise", "premium"]):
        budget_range = "$6,000–$15,000"
    else:
        budget_range = "$2,500–$5,000"

    # 7. Platform
    platform = None
    if "instagram" in q or "ig" in q:
        platform = "Instagram"
    elif "youtube" in q or "yt" in q:
        platform = "YouTube"
    elif "tiktok" in q:
        platform = "TikTok"
    else:
        platform = "Instagram"

    return StructuredSearchQuery(
        industry=industry or "Lifestyle",
        contentType=content_type or "Product Ads",
        style=style or "Cinematic",
        platform=platform,
        skills=skills,
        tools=tools,
        budgetRange=budget_range,
        licensingNeed="Organic & Paid Social",
        minFollowers=50000 if "top" in q or "famous" in q else None,
        minEngagementRate=6.0 if "high engagement" in q else None
    )


async def parse_search_query(query: str) -> Tuple[StructuredSearchQuery, bool]:
    """
    Converts a natural language brand search into a structured query.
    Uses cached query if fresh, otherwise calls Gemini with Pydantic validation & retry.
    Falls back gracefully to keyword parser if Gemini is unavailable.
    Returns: (StructuredSearchQuery, is_basic_mode)
    """
    clean_q = query.strip()
    cache_key = clean_q.lower()
    now = time.time()

    # Check cache
    if cache_key in _QUERY_CACHE:
        cached_time, cached_res, cached_mode = _QUERY_CACHE[cache_key]
        if now - cached_time < CACHE_TTL_SECONDS:
            logger.info(f"Returning cached search parse for: {clean_q}")
            return cached_res, cached_mode

    # Rate limiting check
    if not check_rate_limit():
        logger.warning("Rate limit exceeded for search parser, falling back to rule-based parser.")
        fallback = rule_based_query_parser(clean_q)
        return fallback, True

    model = _get_gemini_model()
    if not model:
        logger.info("Gemini not configured; using keyword/synonym parser.")
        parsed = rule_based_query_parser(clean_q)
        _QUERY_CACHE[cache_key] = (now, parsed, True)
        return parsed, True

    prompt = f"""
You are the Search Intelligence Parser for Creatora AI Creator Marketplace.
A brand entered this search request:
"{clean_q}"

Extract and infer the intended structured campaign parameters from the brand's request.
Return a single JSON object strictly matching this schema:
{{
  "industry": "string (e.g. Sneakers, Gaming, Automotive, Beauty, Fashion, Tech, Luxury, Travel)",
  "contentType": "string (e.g. Reels, Product Ads, AI Films, Shorts, 3D Renders)",
  "style": "string (e.g. Cinematic, Anime Sketchbook, Hyperrealistic, Cyberpunk, Minimalist)",
  "platform": "string or null (e.g. Instagram, YouTube, TikTok)",
  "skills": ["string"] (array of 2-4 creative skills, e.g. Prompt Engineering, VFX, Color Grading),
  "tools": ["string"] (array of 1-3 AI/creative tools, e.g. Runway, Midjourney, Blender, Adobe),
  "budgetRange": "string (e.g. $1,500–$3,500, or $5,000–$10,000)",
  "licensingNeed": "string or null (e.g. Full Commercial Buyout, Organic Social)",
  "minFollowers": number or null (e.g. 50000 or null),
  "minEngagementRate": number or null (e.g. 6.5 or null)
}}

Return ONLY valid JSON.
"""

    parsed_query = None
    # Retry up to 2 times on invalid JSON or schema error
    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            raw_text = _clean_json_text(res.text)
            data = json.loads(raw_text)
            parsed_query = StructuredSearchQuery(**data)
            break
        except Exception as e:
            logger.warning(f"Gemini query parsing attempt {attempt + 1} failed: {e}")

    if not parsed_query:
        logger.info("Falling back to rule-based query parser.")
        parsed_query = rule_based_query_parser(clean_q)
        _QUERY_CACHE[cache_key] = (now, parsed_query, True)
        return parsed_query, True

    _QUERY_CACHE[cache_key] = (now, parsed_query, False)
    return parsed_query, False
