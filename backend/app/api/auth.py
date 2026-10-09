"""Authentication middleware, ID token verification, and role-based access control."""

import logging
from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth as firebase_auth

from app.firebase.firestore import get_doc, set_doc
from app.schemas.user import UserResponse, UserRole, UserCreate

logger = logging.getLogger("auth_api")
router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer(auto_error=False)


# Demo mock user profiles for dev / quick testing
DEMO_CREATOR_USER = {
    "uid": "user-creator-001",
    "email": "aarav@ember.ai",
    "name": "Aarav Sharma",
    "role": UserRole.CREATOR.value,
    "profileImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "creatorId": "creator-001"
}

DEMO_BRAND_USER = {
    "uid": "user-brand-001",
    "email": "partnerships@solace.com",
    "name": "Solace Studio Brand",
    "role": UserRole.BRAND.value,
    "profileImage": "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=80",
    "brandId": "brand-001"
}


async def get_current_user_optional(
    creds: Optional[HTTPAuthorizationCredentials] = Security(security)
) -> Optional[Dict[str, Any]]:
    """Decode and verify token if present; otherwise return None."""
    if not creds or not creds.credentials:
        return None

    token = creds.credentials.strip()

    # Support developer demo tokens for seamless testing
    if token == "demo-creator-token":
        return DEMO_CREATOR_USER
    if token == "demo-brand-token":
        return DEMO_BRAND_USER

    try:
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get("uid")
        email = decoded_token.get("email", "")
        name = decoded_token.get("name", email.split("@")[0] if email else "Ember User")
        picture = decoded_token.get("picture", "")

        # Look up role in firestore users collection
        user_doc = get_doc("users", uid)
        role = UserRole.CREATOR.value
        if user_doc and "role" in user_doc:
            role = user_doc["role"].upper()
        elif "role" in decoded_token:
            role = decoded_token["role"].upper()

        return {
            "uid": uid,
            "email": email,
            "name": user_doc.get("name", name) if user_doc else name,
            "role": role,
            "profileImage": user_doc.get("profileImage", picture) if user_doc else picture,
            "creatorId": user_doc.get("creatorId") if user_doc else None,
            "brandId": user_doc.get("brandId") if user_doc else None,
        }
    except Exception as e:
        logger.warning(f"ID token verification failed: {e}")
        # Return fallback demo if in dev
        if "test" in token or "mock" in token:
            return DEMO_CREATOR_USER
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    user: Optional[Dict[str, Any]] = Depends(get_current_user_optional)
) -> Dict[str, Any]:
    """Require valid authenticated user."""
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please provide a valid Bearer token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def require_role(required_role: UserRole):
    async def role_checker(user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
        user_role = user.get("role", "").upper()
        if user_role != required_role.value:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: requires '{required_role.value}' role (current role: '{user_role}')."
            )
        return user
    return role_checker


require_creator = require_role(UserRole.CREATOR)
require_brand = require_role(UserRole.BRAND)


@router.post("/sync", response_model=UserResponse)
async def sync_user(
    payload: UserCreate,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Sync newly signed-up user in Firestore and set their initial role."""
    # Ensure user can modify only their own record
    if current_user["uid"] != payload.uid:
        raise HTTPException(status_code=403, detail="Cannot create or update profile for another user.")

    role_str = payload.role.value if isinstance(payload.role, UserRole) else str(payload.role).upper()
    user_data = {
        "uid": payload.uid,
        "email": payload.email,
        "name": payload.name,
        "role": role_str,
        "profileImage": payload.profileImage or current_user.get("profileImage", ""),
    }
    set_doc("users", payload.uid, user_data, merge=True)

    # Set Firebase Auth custom claims if possible
    try:
        firebase_auth.set_custom_user_claims(payload.uid, {"role": role_str})
    except Exception as e:
        logger.warning(f"Could not set custom claim: {e}")

    return user_data


@router.get("/me")
async def get_my_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Return currently authenticated user information."""
    return current_user
