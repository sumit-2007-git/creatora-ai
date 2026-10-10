"""Swipe matchmaking, creator notifications, and mutual matches models."""

from typing import Optional, List
from datetime import datetime, timezone
from pydantic import BaseModel, Field


class SwipeActionRequest(BaseModel):
    brandId: str
    creatorId: str
    briefId: Optional[str] = None
    direction: str = Field(..., description="'interested' or 'pass'")
    introMessage: Optional[str] = Field(None, description="Optional custom intro message for right-swipes")


class SwipeRecord(BaseModel):
    id: str
    brandId: str
    creatorId: str
    briefId: Optional[str] = None
    direction: str  # 'interested' or 'pass'
    timestamp: str


class NotificationItem(BaseModel):
    id: str
    brandId: str
    brandName: str
    creatorId: str
    creatorUid: Optional[str] = None
    briefId: Optional[str] = None
    briefTitle: Optional[str] = None
    introMessage: str
    link: str
    isRead: bool = False
    status: str = "pending"  # "pending", "accepted", "declined"
    createdAt: str
    isDemo: bool = False


class NotificationActionRequest(BaseModel):
    status: str = Field(..., description="'accepted', 'declined', or 'read'")


class MatchItem(BaseModel):
    id: str
    brandId: str
    brandName: str
    creatorId: str
    creatorName: str
    creatorAvatar: str
    creatorHandle: str
    creatorRole: Optional[str] = "AI Creator"
    briefId: Optional[str] = None
    briefTitle: Optional[str] = None
    status: str = "accepted"
    createdAt: str
    isDemo: bool = False
    projectThreadId: Optional[str] = None
