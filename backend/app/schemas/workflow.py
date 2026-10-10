"""Pydantic schemas for workflow-first AI portfolio items and Gemini suggestions."""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class WorkflowTool(BaseModel):
    name: str = Field(..., description="Tool or model name, e.g. Midjourney, Runway Gen-3, Blender")
    kind: Literal["model", "app"] = Field("model", description="Whether this is an AI generative model or creative software app")
    version: Optional[str] = Field(None, description="Optional version, e.g. v6, Gen-3 Alpha, 4.2")


class WorkflowStep(BaseModel):
    order: int = Field(..., description="1-indexed step order")
    title: str = Field(..., description="Short step title, e.g. Base Character Generation")
    tool: str = Field(..., description="Primary tool utilized in this step")
    description: str = Field("", description="Detailed description of process, prompt strategy, or technique")
    minutes: int = Field(30, description="Estimated time taken in minutes")


class WorkflowData(BaseModel):
    tools: List[WorkflowTool] = Field(default_factory=list, description="All tools used in production")
    steps: List[WorkflowStep] = Field(default_factory=list, description="Sequential production timeline")
    totalHours: float = Field(1.5, description="Total hours spent creating this piece")
    promptText: Optional[str] = Field(None, description="Optional generation prompt text")
    promptVisibility: Literal["public", "private"] = Field("private", description="Whether the prompt is publicly visible")
    referenceImageUrl: Optional[str] = Field(None, description="Optional starting reference image or moodboard image URL")


class WorkflowSuggestionRequest(BaseModel):
    title: str = Field(..., description="Title of the portfolio item")
    description: str = Field("", description="Description of the piece or creative approach")
    genre: Optional[str] = Field("Art", description="Genre or category")
    contentType: Optional[str] = Field("AI Films", description="Content type, e.g. Reels, AI Films, Product Ads")


class WorkflowSuggestionResponse(BaseModel):
    tools: List[WorkflowTool] = Field(default_factory=list)
    steps: List[WorkflowStep] = Field(default_factory=list)
    totalHours: float = Field(2.0)
    suggestedPrompt: Optional[str] = Field(None)
    rationale: str = Field("", description="Why Gemini suggested this specific pipeline")
