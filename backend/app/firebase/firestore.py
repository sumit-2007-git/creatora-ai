"""Firestore collection helpers and queries."""

import logging
from typing import Any, Dict, List, Optional, Tuple
from google.cloud.firestore_v1 import FieldFilter
from firebase_admin import firestore
from app.firebase.config import get_db

logger = logging.getLogger("firestore_service")


def _serialize_value(val: Any) -> Any:
    if hasattr(val, "isoformat"):
        return val.isoformat()
    if isinstance(val, dict):
        return {k: _serialize_value(v) for k, v in val.items()}
    if isinstance(val, list):
        return [_serialize_value(x) for x in val]
    return val


def get_doc(collection_name: str, doc_id: str) -> Optional[Dict[str, Any]]:
    try:
        db = get_db()
        doc = db.collection(collection_name).document(doc_id).get()
        if doc.exists:
            raw = doc.to_dict() or {}
            data = _serialize_value(raw)
            data["id"] = doc.id
            return data
        return None
    except Exception as e:
        logger.error(f"Error fetching {collection_name}/{doc_id}: {e}")
        return None


def set_doc(collection_name: str, doc_id: str, data: Dict[str, Any], merge: bool = True) -> bool:
    try:
        db = get_db()
        db.collection(collection_name).document(doc_id).set(data, merge=merge)
        return True
    except Exception as e:
        logger.error(f"Error saving {collection_name}/{doc_id}: {e}")
        return False


def create_doc(collection_name: str, data: Dict[str, Any], doc_id: Optional[str] = None) -> str:
    try:
        db = get_db()
        if doc_id:
            db.collection(collection_name).document(doc_id).set(data)
            return doc_id
        else:
            _, ref = db.collection(collection_name).add(data)
            return ref.id
    except Exception as e:
        logger.error(f"Error creating in {collection_name}: {e}")
        raise e


def update_doc(collection_name: str, doc_id: str, updates: Dict[str, Any]) -> bool:
    try:
        db = get_db()
        db.collection(collection_name).document(doc_id).update(updates)
        return True
    except Exception as e:
        logger.error(f"Error updating {collection_name}/{doc_id}: {e}")
        return False


def delete_doc(collection_name: str, doc_id: str) -> bool:
    try:
        db = get_db()
        db.collection(collection_name).document(doc_id).delete()
        return True
    except Exception as e:
        logger.error(f"Error deleting {collection_name}/{doc_id}: {e}")
        return False


def list_docs(
    collection_name: str,
    filters: Optional[List[Tuple[str, str, Any]]] = None,
    order_by: Optional[str] = None,
    descending: bool = False,
    limit: Optional[int] = None
) -> List[Dict[str, Any]]:
    try:
        db = get_db()
        query = db.collection(collection_name)

        if filters:
            for field, op, val in filters:
                query = query.where(filter=FieldFilter(field, op, val))

        if order_by:
            direction = firestore.Query.DESCENDING if descending else firestore.Query.ASCENDING
            query = query.order_by(order_by, direction=direction)

        if limit:
            query = query.limit(limit)

        results = []
        for doc in query.stream():
            raw = doc.to_dict() or {}
            data = _serialize_value(raw)
            data["id"] = doc.id
            results.append(data)
        return results
    except Exception as e:
        logger.error(f"Error querying {collection_name}: {e}")
        return []
