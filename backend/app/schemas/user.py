from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class UserRole(str, Enum):
    CREATOR = "CREATOR"
    BRAND = "BRAND"


class UserBase(BaseModel):
    email: str
    name: str
    role: UserRole
    profileImage: Optional[str] = None


class UserCreate(UserBase):
    uid: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    profileImage: Optional[str] = None
    role: Optional[UserRole] = None


class UserResponse(UserBase):
    uid: str
    createdAt: Optional[str] = None
