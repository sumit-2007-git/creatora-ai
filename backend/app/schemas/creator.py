from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class CreatorBase(BaseModel):
    name: str
    email: Optional[str] = None
    handle: str
    roleTitle: str = "AI Creator & Storyteller"
    bio: str = ""
    avatar: str = ""
    coverImage: str = ""
    location: str = "Tokyo / Global"
    verified: bool = False
    genres: List[str] = Field(default_factory=list)
    specializations: List[str] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    contentTypes: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    platforms: List[str] = Field(default_factory=list)
    rate: str = "$1,200"
    totalFollowers: int = 0
    monthlyViews: int = 0
    engagementRate: float = 0.0
    postsCount: int = 0
    commercialAvailability: str = "Immediate"
    isSelfReported: bool = True
    aiSummary: str = ""
    strengths: List[str] = Field(default_factory=list)
    bestForCategories: List[str] = Field(default_factory=list)
    instagram: Optional[Dict[str, Any]] = None
    youtube: Optional[Dict[str, Any]] = None
    isDemo: bool = False


class CreatorCreate(CreatorBase):
    uid: str


class CreatorUpdate(BaseModel):
    name: Optional[str] = None
    handle: Optional[str] = None
    roleTitle: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    coverImage: Optional[str] = None
    location: Optional[str] = None
    verified: Optional[bool] = None
    genres: Optional[List[str]] = None
    specializations: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    contentTypes: Optional[List[str]] = None
    tools: Optional[List[str]] = None
    platforms: Optional[List[str]] = None
    rate: Optional[str] = None
    totalFollowers: Optional[int] = None
    monthlyViews: Optional[int] = None
    engagementRate: Optional[float] = None
    postsCount: Optional[int] = None
    commercialAvailability: Optional[str] = None
    isSelfReported: Optional[bool] = None
    aiSummary: Optional[str] = None
    strengths: Optional[List[str]] = None
    bestForCategories: Optional[List[str]] = None
    instagram: Optional[Dict[str, Any]] = None
    youtube: Optional[Dict[str, Any]] = None
    isDemo: Optional[bool] = None


class CreatorResponse(CreatorBase):
    creatorId: str
    uid: str
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None
