"""Firebase Admin SDK initialization and service accessors."""

import os
import json
import logging
from pathlib import Path
from typing import Optional

import firebase_admin
from firebase_admin import credentials, firestore, storage
from dotenv import load_dotenv

logger = logging.getLogger("firebase_config")

# Load environment
backend_root = Path(__file__).resolve().parents[2]
load_dotenv(backend_root / ".env")


def is_placeholder(val: Optional[str]) -> bool:
    if not val:
        return True
    placeholder_tokens = ["YOUR_FIREBASE", "PLACEHOLDER", "example"]
    return any(t.lower() in val.lower() for t in placeholder_tokens)


def initialize_firebase() -> firebase_admin.App:
    """Initialize Firebase once, using service account, env variables, or Emulator."""
    try:
        return firebase_admin.get_app()
    except ValueError:
        pass

    project_id = os.getenv("FIREBASE_PROJECT_ID", "ember-98477")
    storage_bucket = os.getenv("FIREBASE_STORAGE_BUCKET", f"{project_id}.firebasestorage.app")
    options = {
        "projectId": project_id,
        "storageBucket": storage_bucket,
    }

    use_emulator = os.getenv("USE_EMULATOR", "").lower() in ("true", "1", "yes")
    client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
    private_key = os.getenv("FIREBASE_PRIVATE_KEY")
    service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH") or os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    # If emulator requested or credentials are placeholders
    if use_emulator or (is_placeholder(client_email) and not service_account_path):
        logger.info("Initializing Firebase in Emulator / Local Mock mode.")
        if not os.getenv("FIRESTORE_EMULATOR_HOST"):
            os.environ["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080"
        try:
            return firebase_admin.initialize_app(options=options)
        except Exception as e:
            logger.warning(f"Emulator init fallback: {e}")
            return firebase_admin.initialize_app(credentials.AnonymousCredentials(), options=options)

    # 1. Try service account file if path exists
    if service_account_path:
        path = Path(service_account_path).expanduser()
        if not path.is_absolute():
            path = (backend_root / path).resolve()
        if path.is_file():
            try:
                cred = credentials.Certificate(str(path))
                logger.info(f"Initialized Firebase using service account file: {path}")
                return firebase_admin.initialize_app(cred, options=options)
            except Exception as e:
                logger.error(f"Failed to load service account file {path}: {e}")

    # 2. Try client email + private key environment variables
    if client_email and private_key and not is_placeholder(client_email) and not is_placeholder(private_key):
        formatted_private_key = private_key.replace("\\n", "\n").strip('"')
        cert_dict = {
            "type": "service_account",
            "project_id": project_id,
            "private_key": formatted_private_key,
            "client_email": client_email,
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        try:
            cred = credentials.Certificate(cert_dict)
            logger.info("Initialized Firebase using client_email and private_key env vars.")
            return firebase_admin.initialize_app(cred, options=options)
        except Exception as e:
            logger.error(f"Failed to init Firebase from env cert dict: {e}")

    # 3. Default to Application Default Credentials or options
    try:
        logger.info("Attempting Firebase init with Application Default Credentials.")
        return firebase_admin.initialize_app(options=options)
    except Exception as e:
        logger.warning(f"Default credential init failed ({e}), falling back to emulator credentials.")
        return firebase_admin.initialize_app(credentials.AnonymousCredentials(), options=options)


def get_db():
    """Return Firestore client."""
    app = initialize_firebase()
    return firestore.client(app=app)


def get_bucket():
    """Return Storage bucket (or None if unavailable)."""
    app = initialize_firebase()
    try:
        return storage.bucket(app=app)
    except Exception as e:
        logger.warning(f"Storage bucket init warning: {e}")
        return None
