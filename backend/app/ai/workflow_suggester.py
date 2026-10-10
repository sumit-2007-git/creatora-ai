"""Gemini-powered workflow suggester for creators.
Proposes realistic tools, models, apps, and step-by-step production pipelines from a piece's title & description.
Pydantic validated with automated retry and rule-based heuristic fallback.
"""

import json
import logging
import re
from typing import Dict, Any, List

from app.schemas.workflow import (
    WorkflowSuggestionRequest,
    WorkflowSuggestionResponse,
    WorkflowTool,
    WorkflowStep
)
from app.ai.profile_analyzer import _get_gemini_model, _clean_json_text

logger = logging.getLogger("workflow_suggester")


def _heuristic_workflow_fallback(title: str, description: str, genre: str = "Art") -> WorkflowSuggestionResponse:
    """Deterministic heuristic pipeline fallback when Gemini is unavailable."""
    title_lower = f"{title} {description} {genre}".lower()
    
    tools: List[WorkflowTool] = []
    steps: List[WorkflowStep] = []
    
    if any(k in title_lower for k in ["video", "film", "reel", "animation", "motion", "cinematic", "sneaker"]):
        tools = [
            WorkflowTool(name="Midjourney", kind="model", version="v6"),
            WorkflowTool(name="Runway", kind="model", version="Gen-3 Alpha"),
            WorkflowTool(name="Topaz Video AI", kind="app", version="v4"),
            WorkflowTool(name="DaVinci Resolve", kind="app", version="19 Studio"),
            WorkflowTool(name="ElevenLabs", kind="model", version="v2")
        ]
        steps = [
            WorkflowStep(order=1, title="Concept & Keyframe Generation", tool="Midjourney v6", description="Prompted photorealistic master frames with 16:9 cinematic aspect ratio and dynamic directional lighting.", minutes=45),
            WorkflowStep(order=2, title="Motion Synthesis & Camera Control", tool="Runway Gen-3 Alpha", description="Image-to-video motion interpolation using precise motion brush and 4s cinematic speed ramping.", minutes=60),
            WorkflowStep(order=3, title="Neural Upscaling & Interpolation", tool="Topaz Video AI", description="Upscaled raw 720p generations to crisp 4K 60fps ProRes master.", minutes=25),
            WorkflowStep(order=4, title="Color Grading & Sound Design", tool="DaVinci Resolve", description="ACES color management, film grain overlay, and synchronized audio track from ElevenLabs sound FX.", minutes=50),
        ]
        total_hours = 3.0
        prompt = f"Cinematic {genre} hero shot, volumetric illumination, 35mm anamorphic lens, hyperrealistic textures --ar 16:9 --style raw --v 6.0"
    elif any(k in title_lower for k in ["3d", "render", "product", "bottle", "tech", "hardware"]):
        tools = [
            WorkflowTool(name="Blender", kind="app", version="4.2 LTS"),
            WorkflowTool(name="Stable Diffusion", kind="model", version="SDXL / ControlNet"),
            WorkflowTool(name="Photoshop", kind="app", version="2024")
        ]
        steps = [
            WorkflowStep(order=1, title="3D Geometry & Camera Blocking", tool="Blender", description="Modeled core product mesh and camera path with realistic focal length and depth of field.", minutes=60),
            WorkflowStep(order=2, title="ControlNet Depth & Normal Pass", tool="Stable Diffusion SDXL", description="Conditioned generation on depth map passes to synthesise ultra-detailed micro-surface textures.", minutes=40),
            WorkflowStep(order=3, title="Lighting & Compositing", tool="Photoshop", description="Final composite, specular reflection highlights and color grading.", minutes=30),
        ]
        total_hours = 2.2
        prompt = f"Studio product rendering of {title}, luxury lighting, octanerender aesthetic, pristine clean background, 8k resolution"
    else:
        tools = [
            WorkflowTool(name="Midjourney", kind="model", version="v6"),
            WorkflowTool(name="Photoshop", kind="app", version="2024"),
            WorkflowTool(name="Magnific AI", kind="model", version="v2")
        ]
        steps = [
            WorkflowStep(order=1, title="Creative Concepting & Exploration", tool="Midjourney v6", description=f"Explored aesthetic directions matching {title} with rich textural fidelity.", minutes=40),
            WorkflowStep(order=2, title="Hallucinatory Detailing", tool="Magnific AI", description="Enhanced fine detail, skin/surface micro-textures, and atmospheric lighting.", minutes=30),
            WorkflowStep(order=3, title="Final Master Touchup", tool="Photoshop", description="Color balancing, localized contrast curves, and client deliverable prep.", minutes=20),
        ]
        total_hours = 1.5
        prompt = f"{title}, high aesthetic quality, intricate details, masterwork {genre} composition --ar 16:9 --v 6"

    return WorkflowSuggestionResponse(
        tools=tools,
        steps=steps,
        totalHours=total_hours,
        suggestedPrompt=prompt,
        rationale=f"Heuristic workflow designed for {genre} content utilizing industry-standard pipeline."
    )


async def suggest_portfolio_workflow(req: WorkflowSuggestionRequest) -> WorkflowSuggestionResponse:
    """Ask Gemini to generate structured workflow tools, sequential steps, time, and prompt."""
    model = _get_gemini_model()
    if not model:
        return _heuristic_workflow_fallback(req.title, req.description, req.genre or "Art")

    prompt = f"""You are an expert generative AI production director.
A creator is uploading an AI portfolio piece to the Creatora marketplace.
Propose a realistic, professional, workflow breakdown of how this piece was produced.

Piece Title: "{req.title}"
Description: "{req.description}"
Genre: "{req.genre}"
Content Type: "{req.contentType}"

Respond with ONLY valid JSON strictly matching this schema:
{{
  "tools": [
    {{ "name": "Tool Name (e.g. Midjourney)", "kind": "model" or "app", "version": "optional version string" }}
  ],
  "steps": [
    {{
      "order": 1,
      "title": "Short Step Title",
      "tool": "Tool Used in this Step",
      "description": "Specific, realistic technical description of what happened in this step",
      "minutes": 30
    }}
  ],
  "totalHours": 2.5,
  "suggestedPrompt": "Realistic generation prompt that could have created this piece",
  "rationale": "One-sentence rationale of why this pipeline is ideal"
}}

Guidelines:
- Include 3 to 5 realistic steps (e.g. Prompt Engineering, Motion Gen, Upscaling, Grading/Comp).
- Use accurate tool versions (e.g. Runway Gen-3 Alpha, Kling 1.5, Midjourney v6, DaVinci Resolve 19, ComfyUI).
- Do not output markdown, fences, or explanation text outside the JSON.
"""

    for attempt in range(2):
        try:
            res = model.generate_content(prompt)
            raw = _clean_json_text(res.text)
            data = json.loads(raw)
            return WorkflowSuggestionResponse(**data)
        except Exception as e:
            logger.warning(f"Gemini workflow suggestion attempt {attempt+1} failed: {e}")

    return _heuristic_workflow_fallback(req.title, req.description, req.genre or "Art")
