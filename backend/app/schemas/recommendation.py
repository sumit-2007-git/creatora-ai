from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class CreatorRecommendationItem(BaseModel):
    creatorId: str
    name: str
    avatar: str
    handle: str
    roleTitle: str
    matchPercentage: int
    matchRationale: str
    tier: str = "Top Match"  # "Top Match", "Relevant", "Moderate", "Weak"
    weightedBreakdown: Dict[str, int] = Field(
        default_factory=lambda: {
            "genreMatch": 25,
            "toolMatch": 22,
            "platformMatch": 18,
            "audienceMatch": 14,
            "budgetMatch": 9,
        }
    )
    genres: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    totalFollowers: str = "0"
    engagementRate: str = "0%"
    strengths: List[str] = Field(default_factory=list)
    bestForCategories: List[str] = Field(default_factory=list)
    commercialAvailability: str = "Immediate"
    rate: str = "$1,500"


class RecommendationResponse(BaseModel):
    briefId: Optional[str] = None
    campaignTitle: Optional[str] = None
    recommendations: List[CreatorRecommendationItem]
    aiRationale: str


class StructuredSearchQuery(BaseModel):
    industry: Optional[str] = Field(None, description="Target industry e.g. Fashion, Gaming, Tech, Beauty, Automotive")
    contentType: Optional[str] = Field(None, description="Type of content e.g. Reels, Product Ads, AI Films, Shorts")
    style: Optional[str] = Field(None, description="Visual aesthetic e.g. Cinematic, Anime Sketchbook, Hyperrealistic, Vaporwave")
    platform: Optional[str] = Field(None, description="Primary social platform e.g. Instagram, TikTok, YouTube, X")
    skills: List[str] = Field(default_factory=list, description="Target creative skills e.g. VFX, Prompt Engineering, Color Grading")
    tools: List[str] = Field(default_factory=list, description="Preferred AI tools e.g. Runway, Midjourney, Blender, Stable Diffusion")
    budgetRange: Optional[str] = Field(None, description="Budget range e.g. $1,500–$4,000")
    licensingNeed: Optional[str] = Field(None, description="Licensing terms e.g. Commercial Full Buyout, Organic Social Only")
    minFollowers: Optional[int] = Field(None, description="Minimum total audience followers")
    minEngagementRate: Optional[float] = Field(None, description="Minimum engagement rate percentage")


class AISearchRequest(BaseModel):
    query: str
    structuredQuery: Optional[StructuredSearchQuery] = None


class AISearchResultItem(BaseModel):
    creatorId: str
    name: str
    avatar: str
    handle: str
    roleTitle: str
    matchPercentage: int
    tier: str
    whyThisCreator: str
    weightedBreakdown: Dict[str, int]
    genres: List[str]
    tools: List[str]
    totalFollowers: str
    engagementRate: str
    rate: str
    commercialAvailability: str
    featuredPostUrl: Optional[str] = None


class AISearchResponse(BaseModel):
    query: str
    structuredQuery: StructuredSearchQuery
    isBasicMode: bool = False
    aiRationale: str
    results: List[AISearchResultItem]


class DreamTeamMember(BaseModel):
    creatorId: str
    name: str
    avatar: str
    handle: str
    assignedRole: str
    primaryTool: str
    keyStrength: str
    followers: str
    engagementRate: str
    rate: str


class DreamTeamResponse(BaseModel):
    briefId: Optional[str] = None
    campaignTitle: str
    teamName: str
    synergyScore: int
    collectiveReach: str
    estimatedBudget: str
    turnaroundTime: str
    members: List[DreamTeamMember]
    squadStrategy: str

