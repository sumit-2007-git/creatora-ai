import { NextRequest, NextResponse } from "next/server";
import { findBriefById, rankCreatorsForBrief } from "@/lib/server/marketplaceService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    let brief = payload.briefId ? findBriefById(payload.briefId) : null;
    if (!brief) {
      brief = {
        id: payload.briefId || "custom-match-brief",
        title: payload.title || "Custom Campaign Brief",
        description: payload.description || "Campaign brief for creator matching",
        genres: payload.genres || ["Fashion", "Tech"],
        preferredTools: payload.preferredTools || ["Runway", "Midjourney"],
        contentTypes: payload.contentTypes || ["Reels", "Product Ads"],
        targetAudience: payload.targetAudience || "Gen-Z & Millennials",
        visualAesthetic: payload.visualAesthetic || "Cinematic aesthetic",
        budget: payload.budget || "$5,000–$9,000",
      };
    }

    const result = rankCreatorsForBrief(brief);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Match error" }, { status: 400 });
  }
}
