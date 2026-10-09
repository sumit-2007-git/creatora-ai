"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface PaletteColor {
  name: string;
  hex: string;
  role: string;
}

interface PromptRecipe {
  tool: string;
  prompt: string;
  notes: string;
}

interface MoodboardData {
  concept: string;
  palette: PaletteColor[];
  lighting: string;
  camera: string;
  toolchain: string[];
  promptRecipes: PromptRecipe[];
  aestheticSummary: string;
}

const PRESET_IDEAS = [
  { label: "👟 Cyberpunk Sneaker", concept: "Cyberpunk Tokyo sneaker launch with neon rain and chromatic rim light", category: "Footwear & Streetwear" },
  { label: "🌸 Bioluminescent Perfume", concept: "Surrealist organic perfume ad with glowing flora and floating water droplets", category: "Luxury & Beauty" },
  { label: "🏎️ High-Speed Hypercar", concept: "Minimalist titanium hypercar carving mountain canyons at dusk with golden hour reflections", category: "Automotive" },
  { label: "🎮 Anime Esports Mecha", concept: "High-octane anime mecha tournament trailer with hand-drawn brush ink energy flares", category: "Gaming & Entertainment" }
];

export default function MoodboardPage() {
  const [concept, setConcept] = useState("Cyberpunk Tokyo sneaker launch with neon rain and chromatic rim light");
  const [category, setCategory] = useState("Footwear & Streetwear");
  const [mood, setMood] = useState("Cinematic Neo-Noir");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [data, setData] = useState<MoodboardData | null>(null);

  const handleGenerate = async (seedConcept?: string, seedCategory?: string) => {
    const activeConcept = seedConcept || concept;
    const activeCategory = seedCategory || category;
    if (!activeConcept.trim()) return;

    try {
      setLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${apiBase}/api/tools/moodboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: activeConcept, category: activeCategory, mood }),
      });

      if (!res.ok) throw new Error("Moodboard API request failed");
      const json: MoodboardData = await res.json();
      setData(json);
    } catch {
      // Deterministic client fallback if backend is unreachable
      setData({
        concept: activeConcept,
        palette: [
          { name: "Electric Violet", hex: "#7C3AED", role: "Hero Accent" },
          { name: "Obsidian Ink", hex: "#161026", role: "Deep Shadow" },
          { name: "Sakura Blush", hex: "#FF7597", role: "Atmospheric Glow" },
          { name: "Cream Paper", hex: "#FAF7F2", role: "Surface Neutral" },
          { name: "Nova Sparkle", hex: "#E0B0FF", role: "Lens Flare" },
        ],
        lighting: "Chiaroscuro studio illumination with volumetric anamorphic rim lights and atmospheric haze",
        camera: "35mm anamorphic prime lens, ARRI large-format sensor aesthetic, shallow depth of field (f/1.8)",
        toolchain: ["Midjourney v6.1", "Runway Gen-3 Alpha", "ComfyUI ControlNet", "DaVinci Resolve"],
        promptRecipes: [
          {
            tool: "Midjourney v6.1",
            prompt: `Cinematic key visual for ${activeConcept}, hyper-detailed Japanese anime watercolor realism, volumetric neon rim light, octane render, 8k resolution --ar 16:9 --style raw`,
            notes: "Hero banner & keyframe generation"
          },
          {
            tool: "Runway Gen-3",
            prompt: `Slow camera dolly in on ${activeConcept}, atmospheric dust motes floating in violet backlight, dynamic cloth motion, 4k 60fps`,
            notes: "10-second vertical motion clip"
          },
          {
            tool: "ElevenLabs Audio",
            prompt: `Ambient neo-classical synth drone building into crisp cinematic percussion for ${activeConcept}`,
            notes: "Atmospheric soundtrack cue"
          }
        ],
        aestheticSummary: `A visually striking '${mood}' aesthetic tailored for high-end ${activeCategory} campaigns, blending tactile textures with generative intelligence.`
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: "hex" | "prompt", index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === "hex") {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 1800);
    } else if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    }
  };

  return (
    <PublicLayout>
      <div className="container" style={{ padding: "48px 0 80px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="kanji-stamp">STUDIO</span>
            <span className="pill purple">AI Visual Direction Deck</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em", margin: "0 0 12px" }}>
            Creative Moodboard & Style DNA Generator
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            Describe any campaign or visual concept. Gemini extracts an authentic color palette, camera specifications, AI toolchains, and copyable prompt recipes.
          </p>
        </div>

        {/* Input Card */}
        <div className="surface" style={{ padding: 28, borderRadius: 22, border: "1.5px solid var(--line)", marginBottom: 36 }}>
          {/* Preset Buttons */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>
              Quick Presets:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PRESET_IDEAS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setConcept(preset.concept);
                    setCategory(preset.category);
                    handleGenerate(preset.concept, preset.category);
                  }}
                  className="pill"
                  style={{ cursor: "pointer", fontSize: 12, background: concept === preset.concept ? "var(--purple-soft)" : "transparent" }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14 }}>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g. Cyberpunk Tokyo sneaker launch with neon rain and cinematic lighting"
              className="field"
              style={{ fontSize: 15 }}
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="button"
              style={{ padding: "0 28px", whiteSpace: "nowrap" }}
            >
              {loading ? "Generating DNA..." : "✨ Generate Moodboard"}
            </button>
          </div>
        </div>

        {/* Results Deck */}
        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Aesthetic Summary Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(124, 92, 252, 0.08), rgba(255, 117, 151, 0.08))",
                border: "1.5px solid var(--purple-line)",
                borderRadius: 20,
                padding: "22px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Aesthetic DNA Directive
                </span>
                <p style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 600, color: "var(--ink)", maxWidth: 720 }}>
                  {data.aestheticSummary}
                </p>
              </div>

              <Link
                href={`/briefs/create?title=${encodeURIComponent(data.concept)}`}
                className="button small"
                style={{ fontSize: 12.5 }}
              >
                🚀 Turn into Marketplace Brief →
              </Link>
            </div>

            {/* Interactive Color Palette */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                🎨 Extracted Color Palette
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                {data.palette.map((c) => (
                  <div
                    key={c.hex}
                    onClick={() => copyToClipboard(c.hex, "hex")}
                    style={{
                      borderRadius: 14,
                      border: "1.5px solid var(--line)",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.15s ease",
                      background: "#FFFFFF",
                    }}
                    title="Click to copy HEX"
                  >
                    <div style={{ height: 80, background: c.hex, borderBottom: "1px solid rgba(0,0,0,0.06)" }} />
                    <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{c.name}</div>
                        <div style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase" }}>{c.role}</div>
                      </div>
                      <span className="pill" style={{ fontSize: 10, fontFamily: "monospace", padding: "2px 6px" }}>
                        {copiedHex === c.hex ? "COPIED!" : c.hex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 2: Camera/Lighting Specs & AI Toolchain */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Camera & Lighting */}
              <div className="surface" style={{ padding: 24, borderRadius: 20, border: "1.5px solid var(--line)" }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                  📹 Lighting & Optical Specifications
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Lighting Architecture:</span>
                    <p style={{ margin: "3px 0 0", fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>{data.lighting}</p>
                  </div>
                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Camera & Sensor Profile:</span>
                    <p style={{ margin: "3px 0 0", fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>{data.camera}</p>
                  </div>
                </div>
              </div>

              {/* Toolchain */}
              <div className="surface" style={{ padding: 24, borderRadius: 20, border: "1.5px solid var(--line)" }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                  ⚡ Recommended Generative Toolchain
                </h3>
                <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 14px" }}>
                  Best generative models to achieve this exact visual fidelity:
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {data.toolchain.map((tool) => (
                    <span
                      key={tool}
                      className="pill purple"
                      style={{ fontSize: 12, padding: "6px 12px", fontWeight: 700 }}
                    >
                      ✦ {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ready-to-use Prompt Recipes */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                📜 Ready-to-Use Prompt Recipes
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {data.promptRecipes.map((recipe, idx) => (
                  <div
                    key={recipe.tool}
                    style={{
                      background: "rgba(250, 247, 242, 0.6)",
                      border: "1px solid var(--line)",
                      borderRadius: 14,
                      padding: "16px 20px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span className="pill purple" style={{ fontSize: 11, fontWeight: 800 }}>
                        {recipe.tool}
                      </span>
                      <button
                        onClick={() => copyToClipboard(recipe.prompt, "prompt", idx)}
                        className="button small ghost"
                        style={{ fontSize: 11, padding: "3px 10px", minHeight: 28 }}
                      >
                        {copiedIndex === idx ? "✓ Copied!" : "📋 Copy Prompt"}
                      </button>
                    </div>
                    <code style={{ display: "block", fontSize: 13, color: "var(--ink)", fontFamily: "monospace", lineHeight: 1.5, wordBreak: "break-word" }}>
                      {recipe.prompt}
                    </code>
                    <div style={{ marginTop: 8, fontSize: 11.5, color: "var(--muted)", fontStyle: "italic" }}>
                      💡 {recipe.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
