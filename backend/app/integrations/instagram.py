"""Instagram integration adapter with Manual Mode (default) and API Mode."""

import os
import logging
from typing import Optional, Dict, Any
import httpx
from dotenv import load_dotenv

from app.ai.profile_analyzer import analyze_social_profile, ExtractedSocialProfile

logger = logging.getLogger("instagram_adapter")
load_dotenv()


class InstagramAdapter:
    def __init__(self):
        self.api_key = os.getenv("INSTAGRAM_API_KEY", "").strip()

    @property
    def has_api_key(self) -> bool:
        return bool(self.api_key and "YOUR" not in self.api_key)

    async def import_profile(
        self,
        handle: str,
        bio: str = "",
        followers: Any = 10000,
        likes: Any = 500,
        views: Any = 10000,
        captions: str = "",
        screenshot_bytes: Optional[bytes] = None,
        screenshot_mime: str = "image/jpeg"
    ) -> ExtractedSocialProfile:
        """
        Unified social import entry point:
        1. API Mode: if INSTAGRAM_API_KEY is set, attempt provider query.
        2. Manual Mode (default): parse user inputs and screenshot with Gemini Vision & Text.
        """
        if self.has_api_key:
            logger.info(f"API Mode active: querying Instagram provider for @{handle}...")
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.get(
                        f"https://graph.instagram.com/v12.0/{handle}",
                        headers={"Authorization": f"Bearer {self.api_key}"}
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        bio = data.get("biography", bio)
                        followers = data.get("followers_count", followers)
            except Exception as e:
                logger.warning(f"Instagram API provider call failed: {e}. Falling back to manual parameters.")

        logger.info(f"Running Manual Mode Gemini extraction for @{handle}...")
        return await analyze_social_profile(
            handle=handle,
            bio=bio,
            followers_raw=followers,
            likes_raw=likes,
            views_raw=views,
            captions=captions,
            screenshot_bytes=screenshot_bytes,
            screenshot_mime=screenshot_mime
        )


instagram_adapter = InstagramAdapter()
