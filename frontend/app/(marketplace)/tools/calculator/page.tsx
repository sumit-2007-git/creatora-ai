"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface DeliverableOption {
  id: string;
  label: string;
  basePrice: number;
  description: string;
  duration: string;
}

const DELIVERABLES: DeliverableOption[] = [
  { id: "reel-30", label: "📱 30s AI Commercial Reel", basePrice: 1500, description: "Vertical 9:16 high-impact reel for Instagram & TikTok with voiceover", duration: "30 seconds" },
  { id: "film-60", label: "🎬 60s Cinematic Short Film", basePrice: 3200, description: "Wide 16:9 cinematic narrative film with sound design and multi-scene continuity", duration: "60 seconds" },
  { id: "stills-10", label: "🖼️ 10x Generative Key Visuals", basePrice: 950, description: "Curated 8K print/web hero stills with custom aesthetic control", duration: "10 images" },
  { id: "char-3d", label: "👾 3D AI Brand Avatar / Character", basePrice: 2400, description: "Consistent generative character model with turnarounds and emotional poses", duration: "Asset Pack" },
  { id: "full-camp", label: "🌟 Full Omnichannel Campaign", basePrice: 6500, description: "Hero film + 3 cutdowns + 10 stills + sound design package", duration: "Full Suite" },
];

const TOOLS = [
  { id: "runway", name: "Runway Gen-3 Alpha", cost: 150 },
  { id: "midjourney", name: "Midjourney v6.1", cost: 80 },
  { id: "comfy", name: "ComfyUI / ControlNet", cost: 300 },
  { id: "kling", name: "Kling AI Motion", cost: 120 },
  { id: "elevenlabs", name: "ElevenLabs Voice AI", cost: 90 },
  { id: "topaz", name: "Topaz 4K Upscale", cost: 110 },
];

export default function RateCalculatorPage() {
  const [selectedDeliverable, setSelectedDeliverable] = useState<string>("reel-30");
  const [selectedTools, setSelectedTools] = useState<string[]>(["runway", "midjourney", "elevenlabs"]);
  const [licensing, setLicensing] = useState<number>(1.25); // 1.0 = Organic, 1.25 = Paid Ads, 1.8 = Buyout
  const [licensingLabel, setLicensingLabel] = useState<string>("6-Month Paid Digital Ads (Global)");
  const [rushSpeed, setRushSpeed] = useState<number>(1.0); // 1.0 = Standard, 1.25 = Fast, 1.5 = Rush
  const [speedLabel, setSpeedLabel] = useState<string>("Standard (14–21 Days)");

  const currentDel = DELIVERABLES.find((d) => d.id === selectedDeliverable) || DELIVERABLES[0];

  const toggleTool = (id: string) => {
    if (selectedTools.includes(id)) {
      if (selectedTools.length > 1) setSelectedTools(selectedTools.filter((t) => t !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
    }
  };

  // Calculations
  const toolComputeCost = selectedTools.reduce((acc, tId) => {
    const t = TOOLS.find((item) => item.id === tId);
    return acc + (t ? t.cost : 0);
  }, 0);

  const baseSubtotal = currentDel.basePrice + toolComputeCost;
  const withLicensing = baseSubtotal * licensing;
  const finalPrice = Math.round(withLicensing * rushSpeed);
  const lowRange = Math.round(finalPrice * 0.88 / 50) * 50;
  const highRange = Math.round(finalPrice * 1.18 / 50) * 50;

  // Breakdown items
  const creatorExecutionFee = Math.round(currentDel.basePrice * 0.7);
  const gpuBuffer = toolComputeCost + Math.round(currentDel.basePrice * 0.15);
  const licensingPremium = Math.round(withLicensing - baseSubtotal);
  const rushFee = Math.round(finalPrice - withLicensing);

  return (
    <PublicLayout>
      <div className="container" style={{ padding: "48px 0 80px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="kanji-stamp">RATES</span>
            <span className="pill purple">AI Campaign Pricing Engine</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em", margin: "0 0 12px" }}>
            AI Campaign Budget & Rate Calculator
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            Accurate, transparent rate estimation for generative AI productions. Calibrated against real creator delivery costs, GPU inference buffers, and enterprise licensing terms.
          </p>
        </div>

        <div className="tool-layout-grid">
          {/* Controls Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Step 1: Deliverable Type */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                1. Select Deliverable Type
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {DELIVERABLES.map((del) => (
                  <div
                    key={del.id}
                    onClick={() => setSelectedDeliverable(del.id)}
                    style={{
                      padding: "14px 18px",
                      borderRadius: 14,
                      border: selectedDeliverable === del.id ? "1.5px solid var(--purple-primary)" : "1px solid var(--line)",
                      background: selectedDeliverable === del.id ? "rgba(124, 92, 252, 0.05)" : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{del.label}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{del.description}</div>
                    </div>
                    <span className="pill purple" style={{ fontSize: 11, fontWeight: 800 }}>
                      From ${del.basePrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Tools & Compute Stack */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                2. AI Toolchain & Compute Intensity
              </h3>
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: "0 0 12px" }}>
                Select models required for the project (includes model subscriptions and GPU credits buffer):
              </p>
              <div className="tool-chips-grid">
                {TOOLS.map((t) => {
                  const active = selectedTools.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTool(t.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: active ? "1.5px solid var(--purple-primary)" : "1px solid var(--line)",
                        background: active ? "rgba(124, 92, 252, 0.06)" : "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                        fontWeight: active ? 700 : 500,
                      }}
                    >
                      <span>{t.name}</span>
                      <span style={{ fontSize: 11, color: active ? "var(--purple-primary)" : "var(--muted)" }}>
                        {active ? "✓ Included" : `+$${t.cost}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Licensing & Turnaround */}
            <div className="surface" style={{ padding: 26, borderRadius: 20, border: "1.5px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                3. Commercial Rights & Turnaround
              </h3>
              
              {/* Licensing */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 8, color: "var(--ink)" }}>
                  Commercial Usage Rights:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { mult: 1.0, label: "Organic Social Only", desc: "Non-commercial feed" },
                    { mult: 1.25, label: "6-Mo Paid Digital Ads", desc: "Worldwide sponsored ads" },
                    { mult: 1.6, label: "Full Global Buyout", desc: "Perpetual exclusive" },
                  ].map((lic) => (
                    <button
                      key={lic.label}
                      type="button"
                      onClick={() => { setLicensing(lic.mult); setLicensingLabel(lic.label); }}
                      className="pill"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px 8px",
                        cursor: "pointer",
                        background: licensing === lic.mult ? "var(--purple-soft)" : "transparent",
                        border: licensing === lic.mult ? "1.5px solid var(--purple-primary)" : "1px solid var(--line)",
                        height: "auto",
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{lic.label}</span>
                      <span style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{lic.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Turnaround */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 8, color: "var(--ink)" }}>
                  Turnaround Speed:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { mult: 1.0, label: "Standard (14–21d)" },
                    { mult: 1.2, label: "Expedited (7–10d)" },
                    { mult: 1.45, label: "Rush (48–72h)" },
                  ].map((spd) => (
                    <button
                      key={spd.label}
                      type="button"
                      onClick={() => { setRushSpeed(spd.mult); setSpeedLabel(spd.label); }}
                      className="pill"
                      style={{
                        padding: "8px 6px",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 11.5,
                        background: rushSpeed === spd.mult ? "var(--purple-soft)" : "transparent",
                        border: rushSpeed === spd.mult ? "1.5px solid var(--purple-primary)" : "1px solid var(--line)",
                      }}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rate Summary Card Right Column */}
          <div style={{ position: "sticky", top: 90 }}>
            <div className="surface" style={{ padding: 32, borderRadius: 24, border: "2px solid var(--purple-line)", boxShadow: "0 12px 32px rgba(124, 92, 252, 0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="kanji-stamp">QUOTE</span>
                <span className="pill purple" style={{ fontSize: 11 }}>Recommended Budget</span>
              </div>

              <div style={{ margin: "16px 0 20px" }}>
                <span style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Estimated Fair Market Range
                </span>
                <div style={{ fontSize: 36, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em", margin: "4px 0" }}>
                  ${lowRange.toLocaleString()} – ${highRange.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: "var(--purple-primary)", fontWeight: 600 }}>
                  Median benchmark: ~${finalPrice.toLocaleString()} USD
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div style={{ borderTop: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", padding: "16px 0", margin: "18px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>🎨 Creator Creative Fee</span>
                  <strong style={{ color: "var(--ink)" }}>${creatorExecutionFee.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>⚡ GPU & Neural Inference Buffer</span>
                  <strong style={{ color: "var(--ink)" }}>${gpuBuffer.toLocaleString()}</strong>
                </div>
                {licensingPremium > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--muted)" }}>📜 Commercial Rights Surcharge</span>
                    <strong style={{ color: "var(--ink)" }}>+${licensingPremium.toLocaleString()}</strong>
                  </div>
                )}
                {rushFee > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--muted)" }}>⚡ Priority Delivery Expedite</span>
                    <strong style={{ color: "var(--ink)" }}>+${rushFee.toLocaleString()}</strong>
                  </div>
                )}
              </div>

              {/* Milestone Schedule */}
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>
                  Standard Escrow Milestones:
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>1. Prompt & Moodboard Lock (30%)</span>
                    <strong>${Math.round(finalPrice * 0.3).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>2. First Motion Cut / Stills (40%)</span>
                    <strong>${Math.round(finalPrice * 0.4).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>3. Final Master 4K Delivery (30%)</span>
                    <strong>${Math.round(finalPrice * 0.3).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href={`/briefs/create?title=${encodeURIComponent(currentDel.label)}&budget=${encodeURIComponent(`$${lowRange.toLocaleString()}–$${highRange.toLocaleString()}`)}&licensing=${encodeURIComponent(licensingLabel)}`}
                  className="button"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  🚀 Post Brief with this Budget →
                </Link>
                <Link
                  href="/discover"
                  className="button secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  🔍 Find Creators in this Budget
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
