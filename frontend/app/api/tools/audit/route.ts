import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const handle = (body.handle || "@creator").trim();
    const roleTitle = body.roleTitle || "AI Visual Creator";
    const genres = body.genres || ["Fashion", "AI Video"];
    const tools = body.tools || ["Runway", "Midjourney"];
    const followers = body.totalFollowers || 150000;
    const engagement = body.engagementRate || 7.2;

    const audit = {
      overallAuraScore: Math.min(84 + Math.floor(Math.random() * 12), 97),
      archetype: "The Visionary Alchemist",
      marketTier: "Tier 1 — High Demand Commercial",
      benchmarkCategory: genres[0] || "AI Visual Art",
      breakdown: {
        visualOriginality: 92,
        promptEngineeringMastery: 88,
        brandReadiness: 94,
        audienceEngagementPurity: 86,
        turnaroundReliability: 90,
      },
      strengths: [
        `Distinguished cinematic color grade with high brand recall in ${genres.join(", ")}`,
        `Strong mastery over ${tools.slice(0, 2).join(" and ")} pipelines`,
        `Excellent audience trust index with ${engagement}% engagement`,
      ],
      improvementOpportunities: [
        "Include more raw behind-the-scenes workflow timelapses to elevate community authority",
        "Offer package pricing tiers for multi-deliverable commercial contracts",
        "Add vertical 9:16 cuts to portfolio thumbnails for mobile-first brand executives",
      ],
      idealBrandPartners: [
        "Apex Footwear Lab (Performance Streetwear)",
        "Solace Skincare (Mindful Clean Beauty)",
        "Veloce Automobili (High-End Automotive)",
      ],
      suggestedDayRate: `$${Math.round((followers / 100) * 1.5 + 800)} – $${Math.round((followers / 100) * 2.5 + 1500)}`,
      summaryStatement: `${handle} displays a commanding visual signature in ${roleTitle}. Portfolio shows elite commercial polish and is primed for high-value brand partnerships.`,
    };

    return NextResponse.json(audit);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Audit failed" }, { status: 400 });
  }
}
