from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class BriefStatus(str, Enum):
    DRAFT = "draft"
    OPEN = "open"
    IN_REVIEW = "in_review"
    COMPLETED = "completed"


class BriefBase(BaseModel):
    title: str
    description: str
    contentTypes: List[str] = Field(default_factory=lambda: ["Reels", "Product Ads"])
    platform: str = "Omnichannel"
    aspectRatio: str = "9:16 (Vertical)"
    style: str = "Cinematic Anime Watercolor"
    genres: List[str] = Field(default_factory=lambda: ["Fashion", "Tech"])
    skills: List[str] = Field(default_factory=lambda: ["Prompt Engineering", "Color Grading"])
    budget: str = "$3,000–$6,000"
    licensing: str = "Commercial Digital Rights (12 Months)"
    deliverablesCount: int = 2
    deadline: str = "30 days"
    targetAudience: str = "Gen Z & Young Professionals"
    preferredTools: List[str] = Field(default_factory=lambda: ["Runway", "Midjourney"])
    visualAesthetic: str = "Cinematic, anime-inspired aesthetic, high dynamic range"
    aiEnhancedDetails: Optional[Dict[str, Any]] = None
    isDemo: bool = False


class BriefCreate(BriefBase):
    pass


class BriefUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    contentTypes: Optional[List[str]] = None
    platform: Optional[str] = None
    aspectRatio: Optional[str] = None
    style: Optional[str] = None
    genres: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    budget: Optional[str] = None
    licensing: Optional[str] = None
    deliverablesCount: Optional[int] = None
    deadline: Optional[str] = None
    targetAudience: Optional[str] = None
    preferredTools: Optional[List[str]] = None
    visualAesthetic: Optional[str] = None
    status: Optional[BriefStatus] = None
    aiEnhancedDetails: Optional[Dict[str, Any]] = None
    isDemo: Optional[bool] = None


class BriefResponse(BriefBase):
    id: str
    brandUid: str
    brandName: str = "Ember Brand"
    brandLogo: Optional[str] = None
    status: BriefStatus = BriefStatus.OPEN
    applicantCount: int = 0
    shortlistedCount: int = 0
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None


class BriefApplicationCreate(BaseModel):
    creatorId: str
    coverLetter: str = ""
    proposedRate: Optional[str] = None
    relevantPortfolioIds: List[str] = Field(default_factory=list)


class BriefApplicationResponse(BaseModel):
    id: str
    briefId: str
    creatorId: str
    creatorUid: str
    creatorName: str
    creatorAvatar: str
    brandUid: str
    coverLetter: str
    proposedRate: Optional[str] = None
    status: str = "pending"  # pending, shortlisted, accepted, declined
    createdAt: Optional[str] = None


class CreatorInquiryCreate(BaseModel):
    creatorId: str
    campaignTitle: str
    message: str
    budgetOffer: Optional[str] = None
    timeline: Optional[str] = None


class CreatorInquiryResponse(BaseModel):
    id: str
    creatorId: str
    creatorUid: str
    brandUid: str
    brandName: str
    brandLogo: Optional[str] = None
    campaignTitle: str
    message: str
    budgetOffer: Optional[str] = None
    timeline: Optional[str] = None
    status: str = "pending"  # pending, accepted, declined
    createdAt: Optional[str] = None
