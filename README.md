# Creatora AI — AI Creator Marketplace

> Connecting visionary AI Creators with Brands & Agencies through intelligent matchmaking and multimodal portfolio intelligence.

Designed with a **hand-drawn Japanese anime sketchbook aesthetic** (cream paper texture `#FAF7F2`, ink and pencil linework, screentone manga dot patterns, soft watercolor washes, and brush-pen typography), inspired by the visual design sheet.

---

## 🎨 Visual Design System & Aesthetics

- **Paper Canvas**: Warm cream sketchbook tone (`#FAF7F2`) with tactile texture tooth.
- **Ink Linework**: Deep charcoal/ink lines (`#1F1D2B` and `#E5DFD5`) inspired by Japanese calligraphy and manga drafts.
- **Accents**: Soft wisteria watercolor purple (`#6C5CE7`, `#8C7CFF`), sage green (`#00B894`), and warm vermilion (`#FF7675`).
- **Signature Kanji Stamps**:
  - `創造` (Creation) — Discovery & Creator Identity
  - `夢を創る` (Crafting Dreams) — Campaign Briefs & Collaborations
  - `アイデア` (Ideas & Synergy) — AI Gemini Matchmaking & Brief Generation
  - `提案` (Proposal) — Direct Contact & Inquiry Messaging
  - `分析` (Analysis) — AI Creative Assessment
- **Components**: Screentone badges, textured cards with ink borders, responsive grids, and interactive pitch drawers.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies | Hackathon Benefits |
|---|---|---|
| **Frontend & Fullstack API** | Next.js 14 (App Router), TypeScript, React 18, Tailwind CSS | **0ms Cold Starts**, Vercel Serverless Edge, **Zero CORS** issues |
| **Database & Auth** | Google Cloud Firestore (Native mode), Firebase Authentication, Firebase Storage | Managed Google Cloud BaaS, 24/7 online, no sleep timer |
| **AI / Multimodal** | Google Gemini API (`gemini-1.5-flash`), structured schema extraction | Instant creative briefs, matching rationale, moodboard generation |
| **Deployment** | **Vercel (Single 1-Click Service)** + Firebase (`ember-98477`) | **No Render Needed!** Fast, reliable, zero sleep delays for judges |

---

## 📋 Features by Phase

### Phase 1: Authentication, Roles & Security
- **Firebase Auth**: Role-based authentication supporting both `CREATOR` and `BRAND` accounts.
- **Token Verification**: FastAPI dependency-injected ID token verification (`verify_token`, `require_creator`, `require_brand`).
- **One-Click Demo Access**: Dedicated instant login buttons for testing (`Demo Creator: Aarav Sharma`, `Demo Brand: Solace Studio`).
- **Security Rules**: Production-ready [`firestore.rules`](./firestore.rules) and [`storage.rules`](./storage.rules) protecting document ownership and file size limits.

### Phase 2: Profiles, Portfolio & Dashboards
- **Creator Hub**: Profile management, skills/tools tags, verified badges, audience metrics, and contact inquiry inbox.
- **Brand Hub**: Active briefs manager, campaign performance metrics, and creator applicant tracker.
- **Portfolio Engine**: Multipart file uploads to Firebase Storage with Firestore metadata indexing, media viewers, and AI tag generation.
- **Real Backend Inquiries**: Brands can send direct campaign proposals with budget and timeline offers to creators, persisting directly to Firestore.

### Phase 3: Gemini Multimodal & Social Import
- **Instagram Social Import**:
  - **Manual Mode (Default, Zero keys required)**: Creators enter their Instagram handle, bio, follower metrics, and optional captions or profile screenshots.
  - **Multimodal Vision & Text OCR**: Gemini analyzes screenshots or text to extract genres, tools (Runway, Midjourney, etc.), content types, and audience demographics.
  - **Never Scrapes / No Fake Data**: All manually entered metrics are clearly tagged and recorded as `"self-reported"` in both the database and user interface.
  - **Review & Confirm**: Creators review extracted metrics, strengths, and "best for" categories, committing changes directly to their profile.
- **Brief Generator (One-Line Idea to Structured Brief)**:
  - Turns a single sentence (e.g. *"Futuristic cyberpunk sneakers with liquid sole effects"*) into a fully structured, editable brief:
    - Content Type, Primary Platform, Visual Style, Aspect Ratio (e.g. `9:16 Vertical`, `16:9 Cinematic`), Target Audience, Required Skills, Tools, Commercial Budget, Licensing Rights, and Deadline.
  - Allows the brand to **Save as Draft** or **Publish** immediately to Firestore.

### Phase 4: Discovery & Transparent Matching
- **Multi-Vector Creator Search & Filters**: Search across genres, content formats, AI tools, social platforms, specializations, and commercial availability.
- **Transparent Weighted Match Score (0–100%)**:
  - Genre / Aesthetic overlap: **30%**
  - Tools & Technical skills: **25%**
  - Format & Platform: **20%**
  - Audience & Engagement rate: **15%**
  - Budget & Availability: **10%**
  - Scores **vary widely** across candidates (Top Match: 88–97%, Relevant: 65–82%, Weak: 25–48%), never clamped artificially.
  - Clickable score breakdown toggle in the UI displaying exact point contributions.
- **Gemini "Why this creator matches" Explanations**: Custom AI rationales explaining why a creator fits the campaign or what trade-offs exist.
- **Save / Unsave Bookmarks**: Real Firestore persistence for saving favorite creators.
- **Contact / Project Proposal Flow**: Real modal creating inquiries directly in Firestore.

### Phase 5: Seed Data & 5 One-Click Demo Briefs
- **Seed Command (`npm run seed`)**:
  - Resets previous demo data (`isDemo: true`) and generates:
    - **16 Genuinely Distinct Creators**: AI filmmakers, manga animators, automotive CGI directors, watercolor artists, streetwear designers, 3D gaming animators, travel vloggers, food stylists, etc.
    - **6 Brands**: Footwear lab, clean beauty, indie gaming, luxury automotive, alpine travel, specialty coffee.
    - **10 Briefs**, portfolios, saved bookmarks, and sample inquiries.
- **5 One-Click Demo Briefs**:
  1. 👟 **Cinematic Sneaker Launch**
  2. 🌸 **AI Beauty Campaign**
  3. ⚔️ **Gaming Character Campaign**
  4. 🏎️ **Luxury Automotive Ad**
  5. 🏔️ **Travel Social Campaign**
  Clicking any demo brief executes the real Gemini matchmaking pipeline against Firestore and displays ranked creators, scores, breakdowns, and AI explanations.

### Phase 6: Production Readiness
- Pinned [`backend/requirements.txt`](./backend/requirements.txt)
- Production [`backend/Dockerfile`](./backend/Dockerfile) with healthcheck
- Render deployment spec ([`render.yaml`](./render.yaml))
- Vercel configuration ([`frontend/vercel.json`](./frontend/vercel.json))
- Healthcheck endpoint `/health` with DB and Gemini status

---

## 🔧 Firebase Setup Guide (Project: `ember-98477`)

### 1. Enable Firebase Services
1. Go to the [Firebase Console](https://console.firebase.google.com/) and select project **`ember-98477`**.
2. **Authentication**:
   - Navigate to **Build > Authentication** > Click **Get Started**.
   - Under the **Sign-in method** tab, enable:
     - **Email/Password**
     - **Google**
   - Under **Authorized domains**, make sure `localhost` and your production domain (e.g. `*.vercel.app`) are listed.
3. **Firestore Database**:
   - Navigate to **Build > Firestore Database** > Click **Create database**.
   - Select **Native Mode** and choose a location (e.g. `nam5` / `us-central1` or `asia-south1`).
4. **Firebase Storage**:
   - Navigate to **Build > Storage** > Click **Get Started**.
   - Confirm the default bucket (`ember-98477.firebasestorage.app`).

### 2. Generate Firebase Service Account JSON
1. In the Firebase Console, click the **Gear icon (Project settings)** > Go to the **Service accounts** tab.
2. Ensure **Firebase Admin SDK** is selected, then click **Generate new private key**.
3. Save the downloaded JSON file securely:
   - For local development: Save as `C:\secure\ember-service-account.json` (or place in `backend/service-account.json`).
   - In `backend/.env`, set:
     ```env
     FIREBASE_SERVICE_ACCOUNT_PATH=C:\secure\ember-service-account.json
     ```
   - *Alternative for Cloud/Docker*: Set `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` directly in your environment variables.

### 3. Deploy Firestore Rules, Indexes & Storage Rules
Using the Firebase CLI:
```bash
# 1. Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Associate with project
firebase use ember-98477

# 4. Deploy rules and indexes
firebase deploy --only firestore:rules,firestore:indexes,storage
```

---

## 💻 Local Development Setup

### 1. Environment Files

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBg_WNVthD9FWi-36fWehFeK89VFzP-8Qc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ember-98477.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ember-98477
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ember-98477.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=654762202772
NEXT_PUBLIC_FIREBASE_APP_ID=1:654762202772:web:1e2dd5d1a2ed0944410681
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

#### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash
FIREBASE_PROJECT_ID=ember-98477
FIREBASE_SERVICE_ACCOUNT_PATH=C:\secure\ember-service-account.json
# Alternatively:
# FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@ember-98477.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=ember-98477.firebasestorage.app
FRONTEND_URL=http://localhost:3000
INSTAGRAM_API_KEY=
```

### 2. Running the Seed Command
To populate Firestore with the full demo dataset (16 creators, 6 brands, 10 briefs, portfolios, bookmarks, and inquiries):
```bash
npm run seed
```
*(Or run `python -m app.firebase.setup_schema` from the `backend/` directory)*

### 3. Running Backend (FastAPI)
```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- Interactive Swagger API: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

### 4. Running Frontend (Next.js)
```bash
cd frontend
npm run dev
```
- Web Application: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment Guide

### 🏆 Recommended for Hackathons: 1-Click Unified Vercel Deployment (NO RENDER NEEDED!)

> **Why Render is NOT needed for the hackathon:**
> - **Zero Cold Starts**: Render's free tier sleeps after 15 minutes of inactivity and takes **50–90 seconds** to wake up. Judges might think the site is frozen or broken!
> - **Zero CORS Issues**: Deploying Next.js fullstack on Vercel serves all `/api/...` routes from the exact same domain (`creatora-ai.vercel.app`), eliminating cross-origin errors completely.
> - **Unified Google Cloud & Vercel Backbone**: Firebase (Firestore, Auth, Storage) handles the database, while Vercel Serverless Edge handles the application logic with instant <50ms response times.

#### Step 1: Push Repository to GitHub
```bash
git add .
git commit -m "Deploy Creatora AI to Vercel"
git push origin main
```

#### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
2. Select your repository.
3. In the setup screen:
   - **Framework Preset**: Next.js (detected automatically)
   - **Root Directory**: `frontend` *(Click Edit and type `frontend`)*
   - **Build Command**: `npm run build`

#### Step 3: Add Environment Variables in Vercel
Add the following 6 environment variables in the Vercel project settings:

| Variable | Value / Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBg_WNVthD9FWi-36fWehFeK89VFzP-8Qc` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `ember-98477.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `ember-98477` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `ember-98477.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `654762202772` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:654762202772:web:1e2dd5d1a2ed0944410681` |
| `GEMINI_API_KEY` *(Optional)* | Your Google Gemini API Key for dynamic live AI completions |

*(Notice: `NEXT_PUBLIC_API_BASE_URL` is NOT required! Leaving it blank automatically routes all `/api/...` calls to Vercel's fast serverless routes with 0ms cold starts.)*

#### Step 4: Click Deploy!
Your platform will be live at `https://your-project.vercel.app` in ~60 seconds with:
- 16 Rich Creator Profiles & Discovery Filters
- 8 Brand-Matched HD Video Portfolio Showcases
- 5 One-Click Demo Briefs with Transparent Match Scoring Breakdown
- 4 Creative AI Studio Tools (Moodboard, Rate Calculator, Aura Audit, Command Palette `Ctrl+K`)
- Instant Authentication & Inquiry Messengers

---

### Optional: Separate FastAPI Backend on Render / Cloud Run (Post-Hackathon)
If you ever want a dedicated Python runtime after the hackathon:
1. In [Render](https://render.com/), create a Web Service pointing to Root Directory: `backend`.
2. Set Build Command: `pip install -r requirements.txt`, Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. In your Vercel settings, set `NEXT_PUBLIC_API_BASE_URL` to your Render service URL.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Healthcheck (Database connection, Gemini status) |
| `GET` | `/api/creators` | Multi-facet creator discovery search |
| `GET` | `/api/creators/{id}` | Creator profile by ID or UID |
| `POST` | `/api/creators/{id}/save` | Toggle save/bookmark creator |
| `GET` | `/api/creators/saved/list` | List current user's bookmarked creators |
| `POST` | `/api/creators/{id}/inquire` | Send direct project proposal to creator |
| `GET` | `/api/briefs` | Browse all open campaign briefs |
| `POST` | `/api/briefs` | Create new structured brief (Draft or Open) |
| `POST` | `/api/recommendations/match` | Real-time multi-vector creator matching pipeline |
| `POST` | `/api/recommendations/enhance-brief`| Turn one-line idea into full structured brief |
| `POST` | `/api/social/import` | Manual & multimodal Instagram analysis (self-reported) |
| `POST` | `/api/portfolios/upload` | Upload portfolio assets to Firebase Storage |
