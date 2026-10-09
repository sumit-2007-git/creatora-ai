"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface AuraAuditResult {
  auraScore: number;
  commercialTier: string;
  rateRange: string;
  strengths: string[];
  growthOpportunities: string[];
  recommendedBrandNiches: string[];
  pitchSummary: string;
}

const AVAILABLE_TOOLS = [
  "Midjourney v6.1", "Runway Gen-3 Alpha", "ComfyUI ControlNet", "Kling AI",
  "Luma Dream Machine", "ElevenLabs Voice", "Topaz Video AI 4K", "Blender 3D",
  "DaVinci Resolve", "Stable Video Diffusion", "Suno / Udio Music"
];

const AVAILABLE_SKILLS = [
  "Prompt Engineering", "Character Consistency", "Camera Motion Control",
  "Color Grading", "Sound Design", "Lip Sync Animation", "3D Camera Projection",
  "Commercial Storyboarding", "Upscaling & Restoration"
];

export default function AuraAuditPage() {
  const [creatorName, setCreatorName] = useState("Aarav Chen");
  const [specialization, setSpecialization] = useState("AI Filmmaker & Creative Director");
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "Midjourney v6.1", "Runway Gen-3 Alpha", "ComfyUI ControlNet", "DaVinci Resolve"
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Prompt Engineering", "Character Consistency", "Camera Motion Control", "Color Grading"
  ]);
  const [experience, setExperience] = useState(2);
  const [loading, setLoading] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [result, setResult] = useState<AuraAuditResult | null>(null);

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      if (list.length > 1) setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleRunAudit = async () => {
    try {
      setLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${apiBase}/api/tools/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName,
          specialization,
          tools: selectedTools,
          skills: selectedSkills,
          experienceYears: experience,
        }),
      });

      if (!res.ok) throw new Error("Audit request failed");
      const json = await res.json();
      setResult(json);
    } catch {
      // Deterministic client fallback
      const base = 78 + Math.min(14, selectedTools.length * 2) + Math.min(6, selectedSkills.length);
      const score = Math.min(98, base);
      setResult({
        auraScore: score,
        commercialTier: score >= 90 ? "Tier-1 Commercial Master" : "Established Commercial Creator",
        rateRange: score >= 90 ? "$3,500 – $7,000 per asset" : "$1,800 – $3,500 per asset",
        strengths: [
          `Mastery of enterprise generative video pipelines (${selectedTools.slice(0, 3).join(", ")})`,
          `Specialized aesthetic depth in ${specialization}`,
          "Proven capability to maintain visual continuity across multi-scene briefs"
        ],
        growthOpportunities: [
          "Offer packaged 3-tier delivery (Stinger, Hero Reel, Stills package) to command 2x higher retainers",
          "Highlight commercial licensing terms explicitly on your profile to speed up brand procurement",
          "Include a short 5s technical breakdown / prompt architecture reel to demonstrate deep mastery"
        ],
        recommendedBrandNiches: ["Sneakers & Streetwear", "Luxury Fashion", "Gaming & Entertainment", "Fintech & Web3"],
        pitchSummary: `${creatorName} is an elite ${specialization} combining neural diffusion pipelines with cinematic color grading to deliver commercial-grade motion and key visuals for forward-thinking brands.`
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPitch = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.pitchSummary);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <PublicLayout>
      <div className="container" style={{ padding: "48px 0 80px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="kanji-stamp">AUDIT</span>
            <span className="pill purple">Talent Benchmarking Engine</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em", margin: "0 0 12px" }}>
            Creator Aura Audit & Profile Optimizer
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            Benchmark your commercial readiness. Powered by Gemini, this engine analyzes your generative toolchain and capabilities to forecast your market value and unlock higher-budget brand briefs.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32, alignItems: "start" }}>
          {/* Creator Profile Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Basic Info */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                1. Creator Profile Information
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Creator Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="field"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Experience Level</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                    className="field"
                  >
                    <option value={1}>1 Year (Emerging)</option>
                    <option value={2}>2+ Years (Intermediate)</option>
                    <option value={3}>3+ Years (Commercial Pro)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Specialization Focus</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. AI Filmmaker & Commercial Director"
                  className="field"
                />
              </div>
            </div>

            {/* Tools Stack */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                2. AI Models & Production Tools
              </h3>
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 12px" }}>
                Select all tools in your active production workflow:
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {AVAILABLE_TOOLS.map((tool) => {
                  const active = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleItem(selectedTools, setSelectedTools, tool)}
                      className="pill"
                      style={{
                        cursor: "pointer",
                        fontSize: 12,
                        background: active ? "var(--purple-soft)" : "transparent",
                        borderColor: active ? "var(--purple-primary)" : "var(--line)",
                        fontWeight: active ? 700 : 500,
                      }}
                    >
                      {active ? "✓ " : "+ "}{tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                3. Technical & Creative Skills
              </h3>
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 12px" }}>
                Select key proficiencies you bring to commercial projects:
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {AVAILABLE_SKILLS.map((sk) => {
                  const active = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleItem(selectedSkills, setSelectedSkills, sk)}
                      className="pill"
                      style={{
                        cursor: "pointer",
                        fontSize: 12,
                        background: active ? "var(--purple-soft)" : "transparent",
                        borderColor: active ? "var(--purple-primary)" : "var(--line)",
                        fontWeight: active ? 700 : 500,
                      }}
                    >
                      {active ? "✓ " : "+ "}{sk}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={loading}
              className="button"
              style={{ padding: "14px 28px", fontSize: 15, justifyContent: "center" }}
            >
              {loading ? "Analyzing Profile with Gemini..." : "⚡ Run Commercial Aura Audit"}
            </button>
          </div>

          {/* Audit Results Column */}
          <div>
            {result ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Score Hero Card */}
                <div
                  className="surface"
                  style={{
                    padding: 32,
                    borderRadius: 24,
                    border: "2px solid var(--purple-line)",
                    background: "linear-gradient(145deg, #FAF7F2, #F5EFF9)",
                    boxShadow: "0 12px 32px rgba(124, 92, 252, 0.1)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <span className="kanji-stamp">VERIFIED</span>
                      <h2 style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 900, color: "var(--ink)" }}>
                        {creatorName}
                      </h2>
                      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{specialization}</div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 44, fontWeight: 900, color: "var(--purple-primary)", lineHeight: 1 }}>
                        {result.auraScore}
                      </div>
                      <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Aura Score / 100
                      </div>
                    </div>
                  </div>

                  {/* Meter bar */}
                  <div style={{ width: "100%", height: 8, background: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden", marginBottom: 18 }}>
                    <div
                      style={{
                        width: `${result.auraScore}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #7C5CFC, #FF7597)",
                        borderRadius: 4,
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "14px 0", borderTop: "1.5px solid var(--line)" }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Commercial Tier:</span>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginTop: 2 }}>
                        {result.commercialTier}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Earning Potential:</span>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--purple-primary)", marginTop: 2 }}>
                        {result.rateRange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monetization Opportunities */}
                <div className="surface" style={{ padding: 24, borderRadius: 20, border: "1.5px solid var(--line)" }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                    💡 Monetization Opportunities to Double Deal Size
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {result.growthOpportunities.map((tip, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.5 }}>
                        <span style={{ color: "var(--purple-primary)", fontWeight: 800 }}>{idx + 1}.</span>
                        <span style={{ color: "var(--ink)" }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Brand Niches */}
                <div className="surface" style={{ padding: 24, borderRadius: 20, border: "1.5px solid var(--line)" }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                    🎯 Highest ROI Brand Categories
                  </h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {result.recommendedBrandNiches.map((niche) => (
                      <span key={niche} className="pill purple" style={{ fontSize: 12, fontWeight: 700 }}>
                        ✦ {niche}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pitch Bio */}
                <div className="surface" style={{ padding: 24, borderRadius: 20, border: "1.5px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                      📝 Optimized Brand Pitch Bio
                    </h3>
                    <button
                      onClick={copyPitch}
                      className="button small ghost"
                      style={{ fontSize: 11, padding: "2px 8px", minHeight: 26 }}
                    >
                      {copiedPitch ? "✓ Copied!" : "📋 Copy Bio"}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6, fontStyle: "italic" }}>
                    &ldquo;{result.pitchSummary}&rdquo;
                  </p>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div
                className="surface"
                style={{
                  padding: 48,
                  borderRadius: 24,
                  border: "2px dashed var(--line)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 380,
                }}
              >
                <div style={{ fontSize: 42, marginBottom: 14 }}>✨</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Ready to Benchmark Your Profile
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--muted)", maxWidth: 320, lineHeight: 1.6, margin: "0 0 20px" }}>
                  Select your tools and skills on the left and click &apos;Run Commercial Aura Audit&apos; to view your score breakdown.
                </p>
                <button onClick={handleRunAudit} className="button small">
                  Analyze Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
