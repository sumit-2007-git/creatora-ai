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
