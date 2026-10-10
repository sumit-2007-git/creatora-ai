from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field
from app.schemas.workflow import WorkflowData


class PortfolioItemBase(BaseModel):
    title: str
    description: str = ""
    mediaUrl: str
    mediaType: str = "Image"  # Image, Video, Reel, Short, Ad
    videoUrl: Optional[str] = None
    thumbnailUrl: Optional[str] = None
    contentType: str = "AI Films"  # Reels, YouTube, Shorts, Product Ads, AI Films
    genre: str = "Art"  # Fashion, Tech, Lifestyle, Travel, Food, Art
    toolsUsed: List[str] = Field(default_factory=list)
    views: str = "12K"
    likes: str = "1.5K"
    aiTags: List[str] = Field(default_factory=list)
    workflow: Optional[WorkflowData] = None
    styleDescription: Optional[str] = None
    styleTags: List[str] = Field(default_factory=list)
    trustTier: Optional[str] = "self-reported"


class PortfolioItemCreate(PortfolioItemBase):
    pass


class PortfolioItemResponse(PortfolioItemBase):
    id: str
    creatorId: str
    uid: str
    publishedAt: Optional[str] = None
    createdAt: Optional[str] = None
