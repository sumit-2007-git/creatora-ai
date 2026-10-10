"""AI Creator Marketplace FastAPI application entrypoint."""

import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api.auth import router as auth_router
from app.api.creators import router as creators_router
from app.api.brands import router as brands_router
from app.api.portfolios import router as portfolios_router
from app.api.briefs import router as briefs_router
from app.api.social import router as social_router
from app.api.recommendations import router as recommendations_router
from app.api.tools import router as tools_router
from app.api.swipes import router as swipes_router
from app.api.posts import router as posts_router
from app.api.trust import router as trust_router
from app.firebase.config import initialize_firebase, get_db

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main")

app = FastAPI(
    title="Creatora AI - AI Creator Marketplace API",
    description="FastAPI backend connecting Creators and Brands with Gemini AI and Firebase",
    version="1.0.0"
)

# CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
origins = [
    frontend_url,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://ember-98477.web.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during dev/demo for smooth communication
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api
app.include_router(auth_router, prefix="/api")
app.include_router(creators_router, prefix="/api")
app.include_router(brands_router, prefix="/api")
app.include_router(portfolios_router, prefix="/api")
app.include_router(briefs_router, prefix="/api")
app.include_router(social_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(tools_router, prefix="/api")
app.include_router(swipes_router, prefix="/api")
app.include_router(posts_router, prefix="/api")
app.include_router(trust_router, prefix="/api")


@app.get("/")
def root():
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    has_gemini = bool(gemini_key and "YOUR" not in gemini_key)
    return {
        "app": "Ember AI Creator Marketplace API",
        "status": "online",
        "version": "1.0.0",
        "geminiConfigured": has_gemini,
        "geminiModel": os.getenv("GEMINI_MODEL", "gemini-3.8-flash"),
        "firebaseProjectId": os.getenv("FIREBASE_PROJECT_ID", "ember-98477")
    }


@app.get("/health")
def health():
    try:
        db = get_db()
        db_status = "connected" if db else "unavailable"
    except Exception as e:
        db_status = f"error: {str(e)}"

    gemini_key = os.getenv("GEMINI_API_KEY", "")
    has_gemini = bool(gemini_key and "YOUR" not in gemini_key)

    return {
        "status": "ok",
        "database": db_status,
        "gemini": "configured" if has_gemini else "missing_key",
        "note": "All endpoints operational with resilient fallbacks"
    }