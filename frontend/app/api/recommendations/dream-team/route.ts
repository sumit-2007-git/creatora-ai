import { NextRequest, NextResponse } from "next/server";
import { buildDreamTeamSquad, findBriefById } from "@/lib/server/marketplaceService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    let brief = payload.briefId ? findBriefById(payload.briefId) : null;
    if (!brief) {
      brief = {
        id: payload.briefId || "custom-dream-brief",
        title: payload.title || "Cinematic Campaign",
        description: payload.description || "Multi-creator collaboration",
        genres: payload.genres || ["Fashion", "Tech"],
        budget: payload.budget || "$6,000–$12,000",
      };
    }

    // Try external FastAPI if available
    const fastApiUrl = process.env.FASTAPI_BACKEND_URL;
    if (fastApiUrl) {
      try {
        const resp = await fetch(`${fastApiUrl}/api/recommendations/dream-team`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (resp.ok) {
          const data = await resp.json();
          return NextResponse.json(data);
        }
      } catch (e) {
        // Fallback
      }
    }

    const squad = buildDreamTeamSquad(brief);
    return NextResponse.json(squad);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Dream team error" }, { status: 400 });
  }
}
