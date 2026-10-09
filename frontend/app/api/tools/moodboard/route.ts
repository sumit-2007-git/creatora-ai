import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const concept = (body.concept || "Futuristic AI Campaign").trim();
    const category = body.category || "Fashion & Luxury";
    const mood = body.mood || "Cinematic Neo-Noir";

    const moodboard = {
      concept,
      palette: [
        { name: "Electric Violet", hex: "#7C3AED", role: "Hero Accent" },
        { name: "Obsidian Ink", hex: "#161026", role: "Deep Shadow" },
        { name: "Sakura Blush", hex: "#FF7597", role: "Atmospheric Glow" },
        { name: "Cream Paper", hex: "#FAF7F2", role: "Surface Neutral" },
        { name: "Nova Sparkle", hex: "#E0B0FF", role: "Highlight Lens Flare" },
      ],
      lighting: "Chiaroscuro studio illumination with volumetric anamorphic rim lights and cyan bounce",
      camera: "ARRI Alexa 65 sensor look, 35mm anamorphic prime lens, shallow depth of field (f/1.8)",
      toolchain: ["Midjourney v6.1", "Runway Gen-3 Alpha", "ComfyUI ControlNet", "DaVinci Resolve Studio"],
      promptRecipes: [
        {
          tool: "Midjourney v6.1",
          prompt: `Cinematic key visual for ${concept}, hyper-detailed anime watercolor realism, volumetric neon rim light, octane render, 8k resolution, photorealistic paper texture, --ar 16:9 --style raw --v 6.1`,
          notes: "Ideal for primary campaign hero banner & storyboard keyframes.",
        },
        {
          tool: "Runway Gen-3",
          prompt: `Slow camera dolly in on ${concept}, atmospheric dust motes floating in violet backlight, dynamic fabric motion, high cinematic dynamic range, 4k 60fps`,
          notes: "Perfect for generating 10s viral Reels & TikTok brand stingers.",
        },
        {
          tool: "ElevenLabs Audio",
          prompt: `Subtle ambient neo-classical synth drone building into crisp cinematic percussion for ${concept}`,
          notes: "Sonic atmosphere bed to accompany the visual motion.",
        },
      ],
      aestheticSummary: `A visually striking '${mood}' aesthetic tailored for high-end ${category} campaigns, pairing tactile paper texture with cutting-edge neural lighting.`,
    };

    return NextResponse.json(moodboard);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to generate moodboard" }, { status: 400 });
  }
}
