"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchBriefs } from "@/lib/api/briefs";
import { matchBriefWithAI } from "@/lib/api/recommendations";
import { demoBriefs } from "@/lib/demo-data";
import { Brief } from "@/types/brief";
import { CreatorRecommendation } from "@/types/recommendation";
import { RecommendationCard } from "@/components/creator/RecommendationCard";

const ONE_CLICK_DEMO_BRIEFS = [
  {
    id: "demo-brief-01",
    title: "Cinematic Sneaker Launch",
    emoji: "👟",
    genres: ["Sneakers", "Fashion", "AI Video"],
    preferredTools: ["Runway", "Midjourney", "After Effects"],
    budget: "$6,000–$12,000",
    description: "Global reveal film for futuristic streetwear sneaker. High-octane camera rotations, floating sole cushioning explosions, neon asphalt reflections, and beat-driven sound design.",
  },
  {
    id: "demo-brief-02",
    title: "AI Beauty Campaign",
    emoji: "🌸",
    genres: ["Beauty", "Lifestyle", "Skincare", "Art"],
    preferredTools: ["Midjourney", "Stable Diffusion", "Photoshop"],
    budget: "$3,500–$7,000",
    description: "Botanical Glow Serum launch. Soft watercolor paper textures, morning sunlight refracting through glass droppers, floating petals, and tranquil Japanese self-care rituals.",
  },
  {
    id: "demo-brief-03",
    title: "Gaming Character Campaign",
    emoji: "⚔️",
    genres: ["Gaming", "Anime", "VFX", "Tech"],
    preferredTools: ["Blender", "Runway", "Unreal Engine"],
    budget: "$8,000–$15,000",
    description: "Character teaser series for cybernetic ronin 'Kaelen'. 3D combat animations, sword trail VFX, rain-slicked neon alleys, and mecha armor transformations.",
  },
  {
    id: "demo-brief-04",
    title: "Luxury Automotive Ad",
    emoji: "🏎️",
    genres: ["Automotive", "Luxury", "Tech", "3D Motion"],
    preferredTools: ["Unreal Engine", "ComfyUI", "DaVinci Resolve"],
    budget: "$10,000–$20,000",
    description: "Commercial for the Veloce Stradale-EV electric hypercar. Sweeping coastal cliff drives at twilight, carbon-fiber aerodynamics, high-speed tracking shots, and sleek luxury lighting.",
  },
  {
    id: "demo-brief-05",
    title: "Travel Social Campaign",
    emoji: "🏔️",
    genres: ["Travel", "Culture", "Lifestyle", "Outdoors"],
    preferredTools: ["Premiere", "Midjourney", "Topaz", "Runway"],
    budget: "$2,500–$5,000",
    description: "Sensory visual travel series across the Japanese Alps and Nordic fjords. Ethereal morning mist, rugged trail expeditions, and poetic reflections on wanderlust.",
  },
];

export default function BriefsListPage() {
  const [briefs, setBriefs] = useState<Brief[]>(demoBriefs);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  // One-click demo brief matching state
  const [activeDemoBrief, setActiveDemoBrief] = useState<typeof ONE_CLICK_DEMO_BRIEFS[0] | null>(null);
  const [recommendations, setRecommendations] = useState<CreatorRecommendation[]>([]);
  const [aiRationale, setAiRationale] = useState<string>("");
  const [matchingLoading, setMatchingLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchBriefs({ genre: selectedGenre === "All" ? undefined : selectedGenre });
        if (data && data.length > 0) {
          setBriefs(data);
        } else {
          setBriefs(demoBriefs);
        }
      } catch {
        setBriefs(demoBriefs);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedGenre]);

  const handleSelectDemoBrief = async (demo: typeof ONE_CLICK_DEMO_BRIEFS[0]) => {
    setActiveDemoBrief(demo);
    setMatchingLoading(true);
    try {
      const res = await matchBriefWithAI({
        briefId: demo.id,
        title: demo.title,
        description: demo.description,
        genres: demo.genres,
        preferredTools: demo.preferredTools,
        budget: demo.budget,
      });

      if (res && res.recommendations) {
        setRecommendations(res.recommendations);
        setAiRationale(res.aiRationale || "");
      }
    } catch (err) {
      console.warn("Matching pipeline offline, using local scoring:", err);
    } finally {
      setMatchingLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp">BRIEFS</span>
              <span className="pill purple">Brand Opportunities</span>
            </div>
            <h1 style={{ margin: "6px 0 2px", fontSize: 32, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
              Active Brand Briefs & AI Matchmaking
            </h1>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>
              Explore commercial brand briefs or load an instant demo brief to trigger the real Gemini matchmaking pipeline.
            </p>
          </div>

          <Link href="/briefs/create" className="button">
            + Post a New Brief
          </Link>
        </div>

        {/* 5 ONE-CLICK DEMO BRIEFS SECTION */}
        <div
          className="surface"
          style={{
            padding: "24px 28px",
            borderRadius: 22,
            border: "2px solid var(--purple-line)",
            background: "#FFFFFF",
            marginBottom: 36,
            boxShadow: "0 6px 24px rgba(108, 92, 231, 0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>IDEAS</span>
              <div>
                <strong style={{ fontSize: 16, color: "var(--ink)", display: "block" }}>
                  5 One-Click Demo Briefs (Real Matching Pipeline)
                </strong>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Clicking any brief evaluates candidate creators from Firestore with transparent weighted scores and Gemini explanations.
                </span>
              </div>
            </div>
            <span className="pill purple" style={{ fontSize: 11, fontWeight: 700 }}>
              ✧ Firestore + Gemini Pipeline
            </span>
          </div>

          {/* 5 Pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            {ONE_CLICK_DEMO_BRIEFS.map((demo) => {
              const isActive = activeDemoBrief?.id === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => handleSelectDemoBrief(demo)}
                  className={`pill ${isActive ? "purple" : ""}`}
                  style={{
                    padding: "10px 18px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    borderColor: isActive ? "var(--purple-primary)" : "var(--line)",
                    background: isActive ? "var(--purple-primary)" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "var(--ink)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <span>{demo.emoji}</span>
                  <span>{demo.title}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE DEMO BRIEF MATCH RESULTS */}
          {activeDemoBrief && (
            <div
              style={{
                marginTop: 24,
                padding: "20px 22px",
                borderRadius: 18,
                background: "var(--surface-soft)",
                border: "1.5px solid var(--purple-line)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <span className="pill purple" style={{ fontSize: 10, marginBottom: 4 }}>
                    Live AI Recommendation Pipeline
                  </span>
                  <h3 style={{ margin: "4px 0 6px", fontSize: 19, fontWeight: 900, color: "var(--ink)" }}>
                    {activeDemoBrief.emoji} {activeDemoBrief.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", maxWidth: 750 }}>
                    {activeDemoBrief.description}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>Budget</span>
                  <strong style={{ fontSize: 16, color: "var(--purple-primary)" }}>{activeDemoBrief.budget}</strong>
                </div>
              </div>

              {aiRationale && (
                <div
                  style={{
                    background: "#FFFFFF",
                    padding: "12px 16px",
                    borderRadius: 12,
                    fontSize: 12.5,
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    marginBottom: 16,
                  }}
                >
                  <strong style={{ color: "var(--purple-primary)" }}>✧ Talent Director Analysis: </strong>
                  {aiRationale}
                </div>
              )}

              {matchingLoading ? (
                <div style={{ textAlign: "center", padding: "36px 0", color: "var(--muted)" }}>
                  <p>Running multi-vector weighted scoring and querying Gemini for match rationales…</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div>
                  <h4 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 800, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Ranked Creator Candidates ({recommendations.length} Evaluated)
                  </h4>
                  <div className="grid-2">
                    {recommendations.map((rec) => (
                      <RecommendationCard key={rec.creatorId} recommendation={rec} />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0", color: "var(--muted)" }}>
                  <p>Click any of the 5 demo briefs above to run the matching pipeline.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION: ALL BRIEFS DIRECTORY */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "var(--ink)" }}>
            Explore All Campaign Briefs ({briefs.length})
          </h2>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All", "Sneakers", "Fashion", "Beauty", "Tech", "Gaming", "Automotive", "Travel"].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`pill ${selectedGenre === genre ? "purple" : ""}`}
                style={{ padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Briefs Grid */}
        <div className="grid-2">
          {briefs.map((b) => (
            <article
              key={b.id}
              className="surface surface-hover"
              style={{
                padding: 26,
                borderRadius: 22,
                border: "1.5px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                background: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span className="pill purple" style={{ fontSize: 10, marginBottom: 6 }}>
                    {b.brandName}
                  </span>
                  <Link href={`/briefs/${b.id}`}>
                    <h3 style={{ margin: "4px 0", fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                      {b.title}
                    </h3>
                  </Link>
                </div>
                <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9", fontSize: 10.5, fontWeight: 700 }}>
                  ● Accepting Pitches
                </span>
              </div>

              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>
                {b.description}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                  padding: "10px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 11.5,
                  textAlign: "center",
                }}
              >
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Budget</small>
                  <strong style={{ color: "var(--purple-primary)" }}>{b.budget}</strong>
                </div>
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Timeline</small>
                  <strong>{b.deadline}</strong>
                </div>
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Deliverables</small>
                  <strong>{b.deliverablesCount} items</strong>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 4 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {b.genres?.slice(0, 2).map((g) => (
                    <span key={g} className="pill" style={{ fontSize: 10 }}>{g}</span>
                  ))}
                  {b.platform && (
                    <span style={{ fontSize: 10, padding: "3px 7px", borderRadius: 6, background: "var(--surface-soft)", color: "var(--muted)", fontWeight: 600 }}>
                      📱 {b.platform}
                    </span>
                  )}
                </div>
                <Link href={`/briefs/${b.id}`} className="button small">
                  View Brief & Apply →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
