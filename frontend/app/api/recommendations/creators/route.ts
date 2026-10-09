import { NextRequest, NextResponse } from "next/server";
import { findBriefById, rankCreatorsForBrief } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const briefId = searchParams.get("briefId") || "demo-brief-01";
  const genre = searchParams.get("genre");
  const tool = searchParams.get("tool");

  let brief = findBriefById(briefId);
  if (!brief) {
    brief = {
      id: "custom-brief",
      title: "Commercial AI Campaign",
      description: "Artistic campaign blending generative visual storytelling and high-energy motion.",
      genres: genre ? [genre] : ["Fashion", "Tech", "Lifestyle"],
      preferredTools: tool ? [tool] : ["Runway", "Midjourney", "DaVinci Resolve"],
      contentTypes: ["Reels", "Product Ads", "AI Films"],
      aspectRatio: "9:16",
    };
  }

  const result = rankCreatorsForBrief(brief);
  return NextResponse.json(result);
}
