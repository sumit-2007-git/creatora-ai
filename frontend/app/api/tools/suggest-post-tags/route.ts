import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    // Try FastAPI backend if configured
    const fastApiUrl = process.env.FASTAPI_BACKEND_URL;
    if (fastApiUrl) {
      try {
        const resp = await fetch(`${fastApiUrl}/api/tools/suggest-post-tags`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
        if (resp.ok) {
          const data = await resp.json();
          return NextResponse.json(data);
        }
      } catch (e) {
        // Fallback
      }
    }

    const t = `${title || ""} ${description || ""}`.toLowerCase();
    const tags = ["generative-ai", "visual-storytelling"];
    const tools = ["Midjourney", "Runway"];

    if (t.includes("fashion") || t.includes("sneaker")) tags.push("Fashion");
    if (t.includes("game") || t.includes("trailer")) tags.push("Gaming");
    if (t.includes("3d") || t.includes("blender")) tools.push("Blender");
    if (t.includes("unreal")) tools.push("Unreal Engine");
    if (t.includes("color") || t.includes("davinci")) tools.push("DaVinci Resolve");

    return NextResponse.json({
      suggestedTags: tags,
      suggestedTools: tools,
      suggestedContentType: t.includes("reel") ? "Reels" : t.includes("film") ? "AI Films" : "Product Ads",
      suggestedIndustry: t.includes("game") ? "Gaming" : t.includes("beauty") ? "Beauty" : "Fashion & Tech",
    });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message }, { status: 400 });
  }
}
