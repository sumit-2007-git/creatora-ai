import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const idea = payload.idea || payload.description || payload.title || "Cinematic AI Visual Campaign";
    const category = payload.category || "Lifestyle";

    const enhanced = {
      title: `${category} Narrative: ${idea.slice(0, 35)}`,
      description: `Comprehensive multi-channel campaign centered around '${idea}'. Combining photorealistic AI motion, sensory textural pacing, and high-conversion vertical cutdowns tailored for social engagement.`,
      targetAudience: "Gen-Z consumers, streetwear aficionados, and design-forward professionals (ages 18–34).",
      visualAesthetic: "Warm filmic grain, subtle ink line accents, volumetric ambient backlight, and high-definition texture fidelity.",
      suggestedGenres: [category, "AI Video", "Digital Art"],
      suggestedContentTypes: ["Reels", "Product Ads", "AI Films"],
      suggestedTools: ["Runway Gen-3", "Midjourney v6.1", "ComfyUI", "DaVinci Resolve"],
      suggestedBudget: "$4,500–$9,000",
      suggestedTimeline: "21 Days",
      deliverablesBreakdown: [
        "1x 30s Master Cinematic Commercial (16:9 4K)",
        "3x 15s High-Energy Social Teaser Reels (9:16)",
        "5x High-Res Still Key Visuals with prompt recipes",
      ],
      licensingAdvice: "12-Month Worldwide Commercial Digital Rights across Meta, TikTok, and YouTube.",
    };

    return NextResponse.json(enhanced);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to enhance brief" }, { status: 400 });
  }
}
