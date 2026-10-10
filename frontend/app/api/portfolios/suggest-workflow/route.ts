import { NextRequest, NextResponse } from "next/server";
import { WorkflowSuggestionPayload, WorkflowSuggestionResult } from "@/types/portfolio";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body: WorkflowSuggestionPayload = await req.json();
    const title = body.title || "AI Creative Piece";
    const description = body.description || "";
    const genre = body.genre || "Art";
    const combined = `${title} ${description} ${genre}`.toLowerCase();

    // Check if backend API URL is configured
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (backendUrl && !backendUrl.startsWith("/")) {
      try {
        const resp = await fetch(`${backendUrl}/api/portfolios/suggest-workflow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (resp.ok) {
          const data = await resp.json();
          return NextResponse.json(data);
        }
      } catch (err) {
        console.warn("FastAPI suggest-workflow call failed, using Next.js engine fallback:", err);
      }
    }

    // Serverless intelligent workflow generator
    let result: WorkflowSuggestionResult;

    if (combined.includes("film") || combined.includes("reel") || combined.includes("cinematic") || combined.includes("video") || combined.includes("sneaker")) {
      result = {
        tools: [
          { name: "Midjourney", kind: "model", version: "v6" },
          { name: "Runway", kind: "model", version: "Gen-3 Alpha" },
          { name: "Topaz Video AI", kind: "app", version: "v4" },
          { name: "DaVinci Resolve", kind: "app", version: "19 Studio" },
          { name: "ElevenLabs", kind: "model", version: "v2" },
        ],
        steps: [
          { order: 1, title: "Photorealistic Keyframe Prompting", tool: "Midjourney v6", description: "Prompted master camera keyframes with 16:9 cinematic aspect ratio and dynamic directional lighting.", minutes: 45 },
          { order: 2, title: "Image-to-Video Motion Synthesis", tool: "Runway Gen-3 Alpha", description: "Motion interpolation using precise motion brush and 4s cinematic speed ramping.", minutes: 60 },
          { order: 3, title: "Neural Upscaling & 60fps Interpolation", tool: "Topaz Video AI", description: "Upscaled raw 720p generations to crisp 4K 60fps ProRes master.", minutes: 25 },
          { order: 4, title: "ACES Color Grading & Audio Synthesis", tool: "DaVinci Resolve", description: "ACES color management, film grain overlay, and synchronized audio track from ElevenLabs sound FX.", minutes: 50 },
        ],
        totalHours: 3.0,
        suggestedPrompt: `Cinematic ${genre} hero shot, volumetric illumination, 35mm anamorphic lens, hyperrealistic textures --ar 16:9 --style raw --v 6.0`,
        rationale: "Tier-1 commercial production pipeline combining Midjourney keyframing, Runway motion synthesis, and DaVinci post-production."
      };
    } else if (combined.includes("3d") || combined.includes("product") || combined.includes("render") || combined.includes("tech")) {
      result = {
        tools: [
          { name: "Blender", kind: "app", version: "4.2 LTS" },
          { name: "Stable Diffusion", kind: "model", version: "SDXL / ControlNet" },
          { name: "Photoshop", kind: "app", version: "2024" },
        ],
        steps: [
          { order: 1, title: "3D Geometry & Camera Blocking", tool: "Blender", description: "Modeled core product mesh and camera path with realistic focal length and depth of field.", minutes: 60 },
          { order: 2, title: "ControlNet Depth & Normal Pass", tool: "Stable Diffusion SDXL", description: "Conditioned generation on depth map passes to synthesise ultra-detailed micro-surface textures.", minutes: 40 },
          { order: 3, title: "Lighting & Specular Compositing", tool: "Photoshop", description: "Final composite, specular reflection highlights and color grading.", minutes: 30 },
        ],
        totalHours: 2.2,
        suggestedPrompt: `Studio product rendering of ${title}, luxury lighting, octanerender aesthetic, pristine clean background, 8k resolution`,
        rationale: "Hybrid 3D CGI and ControlNet pipeline ensuring exact geometric accuracy with generative texturing."
      };
    } else {
      result = {
        tools: [
          { name: "Midjourney", kind: "model", version: "v6" },
          { name: "Photoshop", kind: "app", version: "2024" },
          { name: "Magnific AI", kind: "model", version: "v2" },
        ],
        steps: [
          { order: 1, title: "Creative Concepting & Exploration", tool: "Midjourney v6", description: `Explored aesthetic directions matching ${title} with rich textural fidelity.`, minutes: 40 },
          { order: 2, title: "Neural Texture Upscaling", tool: "Magnific AI", description: "Enhanced fine detail, skin/surface micro-textures, and atmospheric lighting.", minutes: 30 },
          { order: 3, title: "Final Master Touchup & Grading", tool: "Photoshop", description: "Color balancing, localized contrast curves, and client deliverable prep.", minutes: 20 },
        ],
        totalHours: 1.5,
        suggestedPrompt: `${title}, high aesthetic quality, intricate details, masterwork ${genre} composition --ar 16:9 --v 6`,
        rationale: "Precision visual synthesis workflow for commercial editorial and key visual deliverables."
      };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to suggest workflow" },
      { status: 500 }
    );
  }
}
