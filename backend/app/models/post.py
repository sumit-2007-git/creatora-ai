"""Creator Social Posts models and metadata extraction schemas."""

from typing import List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field


class PostBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    description: Optional[str] = Field(None, max_length=1000)
    originalUrl: str = Field(..., description="Creator-provided original post URL")
    platform: str = Field("Instagram", description="Instagram, YouTube, TikTok, X, Behance, Vimeo, Dribbble, or Other")
    thumbnailUrl: Optional[str] = Field(None, description="Post preview thumbnail image")
    tags: List[str] = Field(default_factory=list)
    toolsUsed: List[str] = Field(default_factory=list)
    contentType: str = Field("Reel", description="Reels, Shorts, Video Ad, Carousel, Visual Art, 3D Render")
    industry: Optional[str] = Field(None, description="Fashion, Tech, Gaming, Beauty, etc.")
    viewsCount: Optional[int] = Field(0, description="Self-reported views metric")
    likesCount: Optional[int] = Field(0, description="Self-reported likes metric")
    isPinned: bool = Field(False, description="Pin up to 3 posts as featured")
    orderIndex: int = Field(0, description="Display sorting order")


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    originalUrl: Optional[str] = None
    platform: Optional[str] = None
    thumbnailUrl: Optional[str] = None
    tags: Optional[List[str]] = None
    toolsUsed: Optional[List[str]] = None
    contentType: Optional[str] = None
    industry: Optional[str] = None
    viewsCount: Optional[int] = None
    likesCount: Optional[int] = None
    isPinned: Optional[bool] = None
    orderIndex: Optional[int] = None


class PostResponse(PostBase):
    id: str
    creatorId: str
    creatorUid: str
    createdAt: str
    updatedAt: Optional[str] = None
    isSelfReported: bool = True
    isDemo: bool = False


class UrlMetadataRequest(BaseModel):
    url: str


class UrlMetadataResponse(BaseModel):
    url: str
    platform: str
    title: Optional[str] = None
    description: Optional[str] = None
    thumbnailUrl: Optional[str] = None
    authorName: Optional[str] = None
    success: bool = True
    message: Optional[str] = None


class SuggestPostTagsRequest(BaseModel):
    title: str
    description: Optional[str] = None
    url: Optional[str] = None


class SuggestPostTagsResponse(BaseModel):
    suggestedTags: List[str]
    suggestedTools: List[str]
    suggestedContentType: str
    suggestedIndustry: str
