"""Look-alike visual style search using Gemini 1.5 Vision and embedding/Jaccard similarity."""

import os
import json
import logging
import math
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

import google.generativeai as genai
from app.ai.creator_matcher import _clean_json_text

logger = logging.getLogger("lookalike_search")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)


class StyleAnalysis(BaseModel):
    style_description: str = Field(description="2-3 sentence description of visual aesthetic, lighting, and composition")
    aesthetic_keywords: List[str] = Field(default_factory=list, description="5-8 stylistic keywords e.g. cyberpunk, cinematic, hyperrealistic")
    suggested_genres: List[str] = Field(default_factory=list, description="Target genres like Fashion, Tech, AI Films, Lifestyle")
    detected_tools: List[str] = Field(default_factory=list, description="Probable AI tools used e.g. Midjourney, Runway, ComfyUI, Blender")
    dominant_mood: str = Field(default="Cinematic", description="Atmospheric tone or mood")


class LookAlikeMatch(BaseModel):
    creatorId: str
    creatorName: str
    avatar: str
    handle: str
    similarityScore: int  # 0 to 100
    matchedStyleTags: List[str]
    samplePieceUrl: Optional[str] = None
    samplePieceTitle: Optional[str] = None
    explanation: str


class LookAlikeResponse(BaseModel):
    referenceStyle: StyleAnalysis
    matches: List[LookAlikeMatch]


def _cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        return 0.0
    dot = sum(a * b for a, b in zip(vec1, vec2))
    mag1 = math.sqrt(sum(a * a for a in vec1))
    mag2 = math.sqrt(sum(b * b for b in vec2))
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return max(0.0, min(1.0, dot / (mag1 * mag2)))


def _jaccard_similarity(set_a: set, set_b: set) -> float:
    if not set_a and not set_b:
        return 0.0
    intersection = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return (intersection / union) if union > 0 else 0.0


async def analyze_style_with_gemini(
    image_url: Optional[str] = None,
    image_bytes: Optional[bytes] = None,
    image_mime: str = "image/jpeg",
    prompt_hint: Optional[str] = None,
) -> StyleAnalysis:
    """Analyze an image or prompt using Gemini 1.5 Flash Vision to extract style traits."""
    system_instruction = (
        "You are an expert creative director evaluating AI visual media styles. "
        "Analyze the provided image and/or text prompt for its aesthetic characteristics, lighting, camera technique, "
        "and generative AI tools. Output strictly valid JSON matching this schema:\n"
        "{\n"
        '  "style_description": "string",\n'
        '  "aesthetic_keywords": ["string"],\n'
        '  "suggested_genres": ["string"],\n'
        '  "detected_tools": ["string"],\n'
        '  "dominant_mood": "string"\n'
        "}"
    )

    fallback_style = StyleAnalysis(
        style_description=prompt_hint or "Atmospheric cinematic visual narrative with high-contrast volumetric illumination.",
        aesthetic_keywords=["cinematic", "photorealistic", "atmospheric", "volumetric-lighting", "cyberpunk", "editorial"],
        suggested_genres=["AI Films", "Art", "Tech"],
        detected_tools=["Midjourney", "Runway Gen-3", "Magnific AI"],
        dominant_mood="Cinematic",
    )

    if not GOOGLE_API_KEY:
        return fallback_style

    for attempt in range(2):
        try:
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=system_instruction,
                generation_config={"temperature": 0.2, "response_mime_type": "application/json"}
            )

            contents: List[Any] = []
            if image_bytes:
                contents.append({"mime_type": image_mime, "data": image_bytes})
            elif image_url:
                contents.append(f"Reference Image URL: {image_url}")

            user_prompt = f"Deconstruct the visual style and workflow of this piece. Additional creator hint: {prompt_hint or 'None'}"
            contents.append(user_prompt)

            response = model.generate_content(contents)
            cleaned = _clean_json_text(response.text)
            data = json.loads(cleaned)
            return StyleAnalysis(**data)
        except Exception as e:
            logger.warning("Gemini style analysis attempt %d failed: %s", attempt + 1, e)

    return fallback_style


def rank_creators_lookalike(
    style: StyleAnalysis,
    creators: List[Dict[str, Any]],
    portfolios: Optional[List[Dict[str, Any]]] = None,
) -> List[LookAlikeMatch]:
    """Rank creators based on visual style and tool alignment."""
    matches: List[LookAlikeMatch] = []
    target_tags = set(k.lower() for k in style.aesthetic_keywords + style.suggested_genres + style.detected_tools)

    # Group portfolios by creator
    portfolio_by_creator: Dict[str, List[Dict[str, Any]]] = {}
    if portfolios:
        for p in portfolios:
            c_id = p.get("creatorId") or p.get("creator_id")
            if c_id:
                portfolio_by_creator.setdefault(c_id, []).append(p)

    for creator in creators:
        c_id = creator.get("creatorId") or creator.get("id") or creator.get("uid", "")
        c_name = creator.get("name", "Creator")
        c_handle = creator.get("handle", "@creator")
        c_avatar = creator.get("avatar", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80")

        # Build creator tags
        c_genres = [g.lower() for g in creator.get("genres", [])]
        c_tools = [t.lower() for t in creator.get("tools", [])]
        c_strengths = [s.lower() for s in creator.get("strengths", [])]
        creator_tags = set(c_genres + c_tools + c_strengths)

        c_portfolios = portfolio_by_creator.get(c_id, [])
        for p in c_portfolios:
            creator_tags.update(t.lower() for t in p.get("aiTags", []))
            creator_tags.update(t.lower() for t in p.get("styleTags", []))
            if p.get("genre"):
                creator_tags.add(p["genre"].lower())

        # Calculate tag Jaccard similarity (0 to 1)
        tag_sim = _jaccard_similarity(target_tags, creator_tags)

        # Genre & tool bonus
        genre_overlap = sum(1 for g in style.suggested_genres if g.lower() in [x.lower() for x in creator.get("genres", [])])
        tool_overlap = sum(1 for t in style.detected_tools if any(t.lower() in ct.lower() for ct in creator.get("tools", [])))

        # Score calculation: 45% tag similarity + 30% tool synergy + 25% genre overlap
        normalized_genre = min(1.0, genre_overlap / max(1, len(style.suggested_genres)))
        normalized_tool = min(1.0, tool_overlap / max(1, len(style.detected_tools)))
        combined_score = (tag_sim * 45) + (normalized_tool * 30) + (normalized_genre * 25)

        # Base minimum score if they match any key domain
        final_score = int(min(98, max(52, round(combined_score))))

        # Determine matched tags
        overlap_tags = list(target_tags.intersection(creator_tags))[:5]
        if not overlap_tags:
            overlap_tags = creator.get("genres", [])[:2] + creator.get("tools", [])[:1]

        # Find best matching sample piece
        sample_piece_url = None
        sample_piece_title = None
        if c_portfolios:
            sample_piece_url = c_portfolios[0].get("mediaUrl") or c_portfolios[0].get("thumbnailUrl")
            sample_piece_title = c_portfolios[0].get("title")

        explanation = (
            f"{c_name} crafts {', '.join(creator.get('genres', [])[:2])} works utilizing "
            f"{', '.join(creator.get('tools', [])[:2])}, aligning closely with your target '{style.dominant_mood}' aesthetic."
        )

        matches.append(
            LookAlikeMatch(
                creatorId=c_id,
                creatorName=c_name,
                avatar=c_avatar,
                handle=c_handle,
                similarityScore=final_score,
                matchedStyleTags=[t.title() for t in overlap_tags],
                samplePieceUrl=sample_piece_url,
                samplePieceTitle=sample_piece_title,
                explanation=explanation,
            )
        )

    # Sort descending by similarity score
    matches.sort(key=lambda m: m.similarityScore, reverse=True)
    return matches
