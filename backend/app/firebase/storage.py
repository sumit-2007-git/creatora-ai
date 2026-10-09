"""Firebase Storage helper for uploading portfolio assets and images."""

import logging
import base64
import uuid
from typing import Optional
from app.firebase.config import get_bucket

logger = logging.getLogger("storage_service")


def upload_media_bytes(
    data: bytes,
    destination_path: str,
    content_type: str = "image/jpeg"
) -> str:
    """
    Upload media bytes to Firebase Storage and make publicly readable or return signed URL.
    Returns the public/download URL.
    """
    bucket = get_bucket()
    if bucket:
        try:
            blob = bucket.blob(destination_path)
            blob.upload_from_string(data, content_type=content_type)
            try:
                blob.make_public()
                return blob.public_url
            except Exception:
                # If make_public is not allowed by bucket policy, generate signed URL or construct standard firebase storage download URL
                bucket_name = bucket.name
                encoded_path = destination_path.replace("/", "%2F")
                return f"https://firebasestorage.googleapis.com/v0/b/{bucket_name}/o/{encoded_path}?alt=media"
        except Exception as e:
            logger.warning(f"Firebase Storage upload failed: {e}. Falling back to inline data URL.")

    # Fallback to base64 data URI if bucket upload unavailable
    b64 = base64.b64encode(data).decode("utf-8")
    return f"data:{content_type};base64,{b64}"


def upload_portfolio_file(creator_id: str, filename: str, content: bytes, content_type: str) -> str:
    ext = filename.split(".")[-1] if "." in filename else "jpg"
    unique_name = f"{uuid.uuid4().hex[:10]}.{ext}"
    path = f"portfolios/{creator_id}/{unique_name}"
    return upload_media_bytes(content, path, content_type)
