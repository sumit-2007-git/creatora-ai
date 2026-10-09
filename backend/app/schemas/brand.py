from typing import Optional, List
from pydantic import BaseModel, Field


class BrandBase(BaseModel):
    companyName: str
    industry: str = "Technology"
    website: Optional[str] = None
    logo: Optional[str] = None
    description: str = ""
    location: str = "San Francisco, CA"


class BrandCreate(BrandBase):
    uid: str


class BrandUpdate(BaseModel):
    companyName: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    logo: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None


class BrandResponse(BrandBase):
    brandId: str
    uid: str
    activeBriefsCount: int = 0
    totalApplicationsCount: int = 0
    createdAt: Optional[str] = None
