"""Export seed data from setup_schema.py to frontend/lib/server/marketplaceData.ts"""

import json
from pathlib import Path
from unittest.mock import MagicMock
import sys

# Create dummy modules so setup_schema can be safely inspected
mock_fb = MagicMock()
sys.modules['firebase_admin'] = mock_fb
sys.modules['firebase_admin.firestore'] = mock_fb
sys.modules['google.cloud.firestore_v1'] = mock_fb
sys.modules['app.firebase.config'] = MagicMock()

mock_fb.client = lambda app=None: MockDb()
mock_fb.firestore.client = lambda app=None: MockDb()

# Read setup_schema.py and extract collections
schema_path = Path("backend/app/firebase/setup_schema.py")
code = schema_path.read_text(encoding="utf-8")

# Parse AST or execute carefully
scope = {
    "firestore": MagicMock(SERVER_TIMESTAMP="2026-10-09T12:00:00Z"),
    "FieldFilter": MagicMock(),
    "initialize_firebase": lambda: MagicMock(),
    "logger": MagicMock(),
    "datetime": MagicMock(),
    "timezone": MagicMock(),
}

# Find definitions of creators, brands, briefs, portfolios
# We can mock db.collection().document().set() to record everything!
recorded_docs = {
    "creators": {},
    "brands": {},
    "briefs": {},
    "portfolios": {},
    "saved_creators": {},
    "inquiries": {},
    "users": {}
}

class MockDoc:
    def __init__(self, col, doc_id):
        self.col = col
        self.doc_id = doc_id
    def set(self, data, merge=False):
        cleaned = {}
        for k, v in data.items():
            if str(type(v)).find("Mock") != -1:
                cleaned[k] = "2026-10-09T12:00:00Z"
            else:
                cleaned[k] = v
        recorded_docs[self.col][self.doc_id] = cleaned

class MockCol:
    def __init__(self, name):
        self.name = name
    def document(self, doc_id):
        return MockDoc(self.name, doc_id)
    def where(self, *args, **kwargs):
        m = MagicMock()
        m.stream.return_value = []
        return m

class MockDb:
    def collection(self, name):
        return MockCol(name)

scope["firestore"].client = lambda app=None: MockDb()

exec(code, scope)
scope["setup_schema"]()

print(f"Recorded {len(recorded_docs['creators'])} creators")
print(f"Recorded {len(recorded_docs['brands'])} brands")
print(f"Recorded {len(recorded_docs['briefs'])} briefs")
print(f"Recorded {len(recorded_docs['portfolios'])} portfolios")
print(f"Recorded {len(recorded_docs['inquiries'])} inquiries")

out_dir = Path("frontend/lib/server")
out_dir.mkdir(parents=True, exist_ok=True)

# Write marketplaceData.json
json_path = out_dir / "marketplaceData.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump({
        "creators": list(recorded_docs["creators"].values()),
        "brands": list(recorded_docs["brands"].values()),
        "briefs": list(recorded_docs["briefs"].values()),
        "portfolios": list(recorded_docs["portfolios"].values()),
        "inquiries": list(recorded_docs["inquiries"].values()),
        "saved": list(recorded_docs["saved_creators"].values())
    }, f, indent=2)

print(f"Saved to {json_path}")
