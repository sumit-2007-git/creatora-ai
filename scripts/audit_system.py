"""Complete End-to-End System Integrity Audit for Creatora AI."""

import time
import urllib.request
import json
import sys

time.sleep(1)

def test_endpoint(name, url, method="GET", data=None):
    try:
        body_bytes = json.dumps(data).encode("utf-8") if data else None
        req = urllib.request.Request(url, method=method, data=body_bytes)
        if data:
            req.add_header("Content-Type", "application/json")
        res = urllib.request.urlopen(req, timeout=10)
        code = res.getcode()
        body = res.read().decode("utf-8", errors="ignore")
        parsed = json.loads(body) if (body.startswith("{") or body.startswith("[")) else None
        count = len(parsed) if isinstance(parsed, list) else (1 if parsed else 0)
        return (name, True, f"HTTP {code} (data items: {count})")
    except Exception as e:
        return (name, False, str(e))

def test_static(name, url):
    try:
        req = urllib.request.Request(url, method="HEAD")
        res = urllib.request.urlopen(req, timeout=8)
        content_type = res.headers.get("content-type", "unknown")
        content_len = res.headers.get("content-length", "unknown")
        return (name, True, f"HTTP {res.getcode()} ({content_type}, {content_len} bytes)")
    except Exception as e:
        return (name, False, str(e))

print("=========================================================")
print("          CREATORA AI - MASTER SYSTEM AUDIT              ")
print("=========================================================\n")

# 1. BACKEND APIS
print("--- [1] BACKEND APIS (FastAPI on Port 8000) ---")
backend_tests = [
    ("Health Check", "http://localhost:8000/health"),
    ("Creators List API", "http://localhost:8000/api/creators"),
    ("Creator Detail API", "http://localhost:8000/api/creators/creator-001"),
    ("Brands List API", "http://localhost:8000/api/brands"),
    ("Briefs List API", "http://localhost:8000/api/briefs"),
    ("Brief Detail API", "http://localhost:8000/api/briefs/demo-brief-01"),
    ("Portfolios List API", "http://localhost:8000/api/portfolios"),
    ("AI Recommendations API", "http://localhost:8000/api/recommendations/demo-brief-01"),
    ("AI Moodboard Generator", "http://localhost:8000/api/tools/moodboard", "POST", {"concept": "Neon Tokyo"}),
    ("AI Aura Audit Engine", "http://localhost:8000/api/tools/audit", "POST", {"creatorName": "Aarav Chen", "tools": ["Runway"], "skills": ["Prompting"]}),
]

all_pass = True
for item in backend_tests:
    method = item[2] if len(item) > 2 else "GET"
    data = item[3] if len(item) > 3 else None
    name, ok, msg = test_endpoint(item[0], item[1], method, data)
    status_icon = "[PASS]" if ok else "[FAIL]"
    if not ok: all_pass = False
    print(f"{status_icon} {name.ljust(26)} : {msg}")

# 2. FRONTEND ROUTES
print("\n--- [2] FRONTEND ROUTES (Next.js 14 on Port 3000) ---")
frontend_routes = [
    ("/", "Landing Page"),
    ("/discover", "Discover Creators"),
    ("/creators", "Creators Directory"),
    ("/creators/creator-001", "Creator Aarav Profile"),
    ("/briefs", "Briefs Marketplace"),
    ("/briefs/demo-brief-01", "Demo Brief Detail"),
    ("/briefs/create", "Create Brief Studio"),
    ("/portfolio", "Portfolio Video Showcase"),
    ("/dashboard", "Dashboard Shell"),
    ("/dashboard/creator", "Creator Studio"),
    ("/dashboard/brand", "Brand Campaign Center"),
    ("/dashboard/creator/portfolio", "Creator Portfolio Manager"),
    ("/dashboard/creator/profile", "Creator Profile Settings"),
    ("/dashboard/brand/briefs", "Brand Briefs Manager"),
    ("/login", "Sign In Portal"),
    ("/register", "Account Registration"),
    ("/tools/moodboard", "AI Moodboard Generator"),
    ("/tools/calculator", "AI Rate Calculator"),
    ("/tools/audit", "Aura Audit Benchmark"),
]

for route, label in frontend_routes:
    name, ok, msg = test_endpoint(f"{label} ({route})", "http://localhost:3000" + route)
    status_icon = "[PASS]" if ok else "[FAIL]"
    if not ok: all_pass = False
    print(f"{status_icon} {name.ljust(38)} : {msg}")

# 3. BRANDING ASSETS
print("\n--- [3] BRANDING & LOGO ASSETS ---")
brand_assets = [
    ("Creatora Master Logo", "http://localhost:3000/creatora-logo.png"),
    ("Creatora Squircle Icon", "http://localhost:3000/creatora-icon.png"),
    ("Favicon", "http://localhost:3000/favicon.ico"),
]
for name, url in brand_assets:
    n, ok, msg = test_static(name, url)
    status_icon = "[PASS]" if ok else "[FAIL]"
    if not ok: all_pass = False
    print(f"{status_icon} {n.ljust(26)} : {msg}")

# 4. BRAND VIDEOS
print("\n--- [4] BRAND-MATCHED HD VIDEOS STREAMING ---")
videos = [
    ("Neon Tokyo (Cyberpunk)", "http://localhost:3000/videos/neon-tokyo.mp4"),
    ("Vapor Velocity (Sneakers)", "http://localhost:3000/videos/sneakers-vapor.mp4"),
    ("Ethereal Botanicals (Beauty)", "http://localhost:3000/videos/skincare-botanicals.mp4"),
    ("Mount Fuji Sakura (Lifestyle)", "http://localhost:3000/videos/sakura-fuji.mp4"),
    ("Apex Hypercar (Automotive)", "http://localhost:3000/videos/apex-hypercar.mp4"),
    ("Sector 9 Mecha (Gaming)", "http://localhost:3000/videos/mecha-gaming.mp4"),
    ("AeroFoam 2099 (Sneaker Drop)", "http://localhost:3000/videos/aerofoam-sneakers.mp4"),
    ("Silk Road (Travel)", "http://localhost:3000/videos/silk-road-travel.mp4"),
]
for name, url in videos:
    n, ok, msg = test_static(name, url)
    status_icon = "[PASS]" if ok else "[FAIL]"
    if not ok: all_pass = False
    print(f"{status_icon} {n.ljust(30)} : {msg}")

print("\n=========================================================")
if all_pass:
    print("      ALL TESTS PASSED! SYSTEM IS 100% OPERATIONAL.     ")
else:
    print("      SOME TESTS FAILED! PLEASE REVIEW OUTPUT ABOVE.    ")
print("=========================================================")
