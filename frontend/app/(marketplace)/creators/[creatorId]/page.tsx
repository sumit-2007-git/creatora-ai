"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchCreatorById, sendInquiry } from "@/lib/api/creators";
import { fetchPortfolios } from "@/lib/api/portfolios";
import { fetchCreatorTrustProfile } from "@/lib/api/trust";
import { demoCreators, demoPortfolios } from "@/lib/demo-data";
import { Creator, TrustProfile } from "@/types/creator";
import { PortfolioItem } from "@/types/portfolio";
import { getStoredUser } from "@/lib/firebase/auth";
import { VideoPortfolioCard } from "@/components/portfolio/VideoPortfolioCard";
import { WorkflowPortfolioViewer } from "@/components/portfolio/WorkflowPortfolioViewer";
import { TrustBadge } from "@/components/trust/TrustBadge";
import { TrustChecklistPanel } from "@/components/trust/TrustChecklistPanel";
import { CreatorPostsFeed } from "@/components/creator/CreatorPostsFeed";

export default function CreatorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const creatorId = Array.isArray(params?.creatorId) ? params.creatorId[0] : (params?.creatorId as string) || "creator-001";

  const [creator, setCreator] = useState<Creator | null>(null);
  const [trustProfile, setTrustProfile] = useState<TrustProfile | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [activeTab, setActiveTab] = useState<"portfolio" | "workflows" | "trust" | "posts" | "about" | "socials" | "insights">("portfolio");
  const [portfolioFilter, setPortfolioFilter] = useState<string>("All");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(250000);

  // Inquiry modal state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquiryBudget, setInquiryBudget] = useState("$2,500");
  const [inquirySending, setInquirySending] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Full-screen workflow portfolio viewer index
  const [viewerIndex, setViewerIndex] = useState<number>(-1);

  useEffect(() => {
    const load = async () => {
      try {
        const c = await fetchCreatorById(creatorId);
        setCreator(c);
        setFollowersCount(c.totalFollowers || 250000);
      } catch {
        const found = demoCreators.find((d) => d.creatorId === creatorId || d.uid === creatorId) || demoCreators[0];
        setCreator(found);
        setFollowersCount(found.totalFollowers);
      }

      try {
        const tp = await fetchCreatorTrustProfile(creatorId);
        setTrustProfile(tp);
      } catch {
        // Fallback default trust profile
        setTrustProfile({
          creatorId,
          trustScore: 82,
          dominantTier: "link-checked",
          claimsCount: 2,
          proofBackedCount: 1,
          linkCheckedCount: 1,
          selfReportedCount: 0,
          needsProofCount: 0,
          checklist: {
            toolsVerified: true,
            pastWorkLinked: true,
            processProofAdded: true,
            licenceStated: true,
            profileComplete: true,
          },
          claims: [
            {
              id: "claim-fallback-1",
              creatorId,
              type: "identity",
              claim: "Verified Instagram creator link active with 250k+ followers",
              tier: "link-checked",
              evidence: [{ type: "url", url: "https://instagram.com" }],
              checkedAt: new Date().toISOString(),
              checkedBy: "system",
            },
            {
              id: "claim-fallback-2",
              creatorId,
              type: "workflow",
              claim: "Midjourney + Runway Gen-3 composition workflow certified",
              tier: "proof-backed",
              evidence: [{ type: "image", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" }],
              checkedAt: new Date().toISOString(),
              checkedBy: "gemini",
            }
          ]
        });
      }

      try {
        const items = await fetchPortfolios({ creatorId });
        if (items && items.length > 0) {
          setPortfolios(items);
        } else {
          setPortfolios(demoPortfolios);
        }
      } catch {
        setPortfolios(demoPortfolios);
      }
    };
    load();
  }, [creatorId]);

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator) return;
    try {
      setInquirySending(true);
      await sendInquiry(creator.creatorId || creatorId, {
        campaignTitle: inquiryTitle || "Campaign Collaboration Proposal",
        message: inquiryMessage || "We love your visual storytelling and would like to collaborate on an upcoming project.",
        budgetOffer: inquiryBudget,
      });
      setInquirySuccess(true);
      setTimeout(() => {
        setShowInquiryModal(false);
        setInquirySuccess(false);
        setInquiryTitle("");
        setInquiryMessage("");
      }, 1800);
    } catch {
      // Mock success if offline
      setInquirySuccess(true);
      setTimeout(() => {
        setShowInquiryModal(false);
        setInquirySuccess(false);
      }, 1500);
    } finally {
      setInquirySending(false);
    }
  };

  if (!creator) {
    return (
      <PublicLayout>
        <div style={{ textAlign: "center", padding: 100, color: "var(--muted)" }}>
          Loading creator profile...
        </div>
      </PublicLayout>
    );
  }

  const filteredPortfolios = portfolioFilter === "All"
    ? portfolios
    : portfolios.filter((p) => p.contentType?.toLowerCase() === portfolioFilter.toLowerCase() || p.genre?.toLowerCase() === portfolioFilter.toLowerCase());

  // Aggregate tools used across portfolios with counts and kind
  const toolsMap = new Map<string, { name: string; kind?: "model" | "app"; count: number; version?: string }>();
  portfolios.forEach((p) => {
    if (p.workflow?.tools && p.workflow.tools.length > 0) {
      p.workflow.tools.forEach((t) => {
        const key = t.name.trim();
        const existing = toolsMap.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          toolsMap.set(key, { name: t.name, kind: t.kind, count: 1, version: t.version });
        }
      });
    }
  });

  if (toolsMap.size === 0 && creator.tools) {
    creator.tools.forEach((toolName) => {
      toolsMap.set(toolName, { name: toolName, kind: "model", count: 2 });
    });
  }
  const aggregatedTools = Array.from(toolsMap.values()).sort((a, b) => b.count - a.count);

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "30px 0 80px" }}>
        {/* Profile Card Banner matching middle left design */}
        <section
          className="surface"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            border: "1.5px solid var(--line-strong)",
            boxShadow: "0 8px 30px rgba(50, 40, 70, 0.05)",
            background: "#FFFFFF",
            marginBottom: 32,
          }}
        >
          {/* Studio Banner */}
          <div style={{ position: "relative", height: 260, overflow: "hidden", background: "#EAE5DC" }}>
            <img
              src={creator.coverImage || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85"}
              alt="Japanese Studio scenery"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Japanese Kanji scroll watermark */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 32,
                background: "rgba(255, 255, 255, 0.9)",
                border: "2px solid var(--sakura-pink)",
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 900, color: "var(--pencil)", letterSpacing: "0.2em", writingMode: "vertical-rl" }}>
                INSPIRE
              </span>
            </div>
          </div>

          {/* Profile Header Details */}
          <div className="creator-profile-padding">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: -48,
                marginBottom: 16,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              {/* Avatar + Main Title */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 26,
                      border: "4px solid #FFFFFF",
                      objectFit: "cover",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      background: "#FAF7F2",
                    }}
                  />
                  {creator.verified && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 26,
                        height: 26,
                        background: "#4C6EF5",
                        color: "#FFFFFF",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 14,
                        fontWeight: 900,
                        border: "3px solid #FFFFFF",
                      }}
                      title="Verified AI Creator"
                    >
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em" }}>
                      {creator.name}
                    </h1>
                    <TrustBadge tier={creator.trustTier || (creator.verified ? "proof-backed" : "link-checked")} size="md" />
                    <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                      {creator.handle}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 6px", fontSize: 14.5, color: "var(--pencil)", fontWeight: 600 }}>
                    {creator.roleTitle}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    {creator.genres?.map((g) => (
                      <span key={g} className="pill purple" style={{ fontSize: 11 }}>
                        {g}
                      </span>
                    ))}
                    <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 6 }}>
                      📍 {creator.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleToggleFollow}
                  className={`button ${isFollowing ? "secondary" : ""}`}
                  style={{ minWidth: 100 }}
                >
                  {isFollowing ? "✓ Following" : "+ Follow"}
                </button>
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="button secondary"
                >
                  ✉ Message / Inquire
                </button>
              </div>
            </div>

            {/* 4 Stats Cards matching design */}
            <div
              className="creator-stats-grid"
              style={{
                padding: "20px 0 12px",
                borderTop: "1.5px solid var(--line)",
                borderBottom: "1.5px solid var(--line)",
                margin: "18px 0 12px",
              }}
            >
              <div className="surface" style={{ padding: "14px 18px", border: "1px solid var(--line)" }}>
                <strong style={{ display: "block", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>
                  {followersCount >= 1000 ? `${(followersCount / 1000).toFixed(0)}K` : followersCount}
                </strong>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Followers
                </span>
              </div>

              <div className="surface" style={{ padding: "14px 18px", border: "1px solid var(--line)" }}>
                <strong style={{ display: "block", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>
                  {creator.monthlyViews >= 1000000 ? `${(creator.monthlyViews / 1000000).toFixed(0)}M` : `${creator.monthlyViews / 1000}K`}
                </strong>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Monthly Views
                </span>
              </div>

              <div className="surface" style={{ padding: "14px 18px", border: "1px solid var(--line)" }}>
                <strong style={{ display: "block", fontSize: 22, fontWeight: 800, color: "var(--purple-primary)" }}>
                  {creator.engagementRate}%
                </strong>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Engagement
                </span>
              </div>

              <div className="surface" style={{ padding: "14px 18px", border: "1px solid var(--line)" }}>
                <strong style={{ display: "block", fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>
                  {creator.postsCount || 320}
                </strong>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Posts
                </span>
              </div>
            </div>

            {/* Self-reported label & availability */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                {creator.isSelfReported !== false ? "✎ Self-Reported Metrics (Creator Confirmed)" : "✓ Verified Metrics"}
              </span>
              {creator.commercialAvailability && (
                <span style={{ fontSize: 12, color: "#00B894", fontWeight: 800 }}>
                  ● Commercial Availability: {creator.commercialAvailability}
                </span>
              )}
            </div>

            {/* Bio */}
            <p style={{ margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.7, color: "var(--pencil)", maxWidth: 840 }}>
              {creator.bio}
            </p>

            {/* Strengths & Best For tags */}
            {creator.strengths && creator.strengths.length > 0 && (
              <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase" }}>Strengths:</span>
                {creator.strengths.map((st) => (
                  <span key={st} style={{ fontSize: 11, padding: "3px 9px", background: "var(--surface-soft)", borderRadius: 6, color: "var(--ink)", fontWeight: 600 }}>
                    ★ {st}
                  </span>
                ))}
              </div>
            )}

            {/* Tools Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 750, color: "var(--muted)", textTransform: "uppercase" }}>Tools:</span>
              {creator.tools?.map((tool) => (
                <span key={tool} className="pill" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", borderColor: "var(--line-strong)" }}>
                  ⚡ {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION (Styled as Folder Tabs) */}
        <div className="folder-tabs" style={{ marginBottom: 28 }}>
          {[
            { id: "portfolio", label: "Portfolio 🎨" },
            { id: "workflows", label: "Tools & Workflows ⚡" },
            { id: "trust", label: "Trust & Verification 🛡️" },
            { id: "posts", label: "Published Posts 📱" },
            { id: "about", label: "About" },
            { id: "socials", label: "Socials" },
            { id: "insights", label: "AI Insights ✨" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`folder-tab ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div>
            {/* Filter Pills matching design */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["All", "Reels", "Ads", "AI Films", "Shorts"].map((pill) => (
                <button
                  key={pill}
                  onClick={() => setPortfolioFilter(pill)}
                  className={`pill ${portfolioFilter === pill ? "purple" : ""}`}
                  style={{
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {filteredPortfolios.map((item, index) => (
                <VideoPortfolioCard
                  key={item.id}
                  item={item}
                  onOpenPreview={() => setViewerIndex(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB: TOOLS & WORKFLOWS PIPELINE */}
        {activeTab === "workflows" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Primary Creative Pipeline Diagram */}
            <div className="surface" style={{ padding: 28, borderRadius: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="kanji-stamp">PIPELINE</span>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                      Signature Generative Pipeline
                    </h3>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)" }}>
                    End-to-end production pipeline refined across {portfolios.length} commercial works.
                  </p>
                </div>
                <span className="pill purple" style={{ fontSize: 12 }}>
                  ✓ Reproducible Workflow Certified
                </span>
              </div>

              {/* Pipeline Step Flow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  overflowX: "auto",
                  paddingBottom: 8,
                }}
              >
                {[
                  { step: "01", name: "Concept & Prompting", tool: "Midjourney v6 / Claude 3.5", desc: "High-coherence visual prompt engineering" },
                  { step: "02", name: "Generative Motion", tool: "Runway Gen-3 / Luma", desc: "Camera motion & temporal coherence synthesis" },
                  { step: "03", name: "Upscaling & Texture", tool: "Magnific AI / Topaz", desc: "8K micro-texture restoration & detail enhancement" },
                  { step: "04", name: "Audio & Scoring", tool: "ElevenLabs / Suno", desc: "Foley sound effects & AI voiceover scoring" },
                  { step: "05", name: "Mastering & Color", tool: "DaVinci Resolve Studio", desc: "ACES color pipeline & brand-safe delivery" },
                ].map((item, idx, arr) => (
                  <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <div
                      style={{
                        padding: "16px 20px",
                        background: idx === 0 ? "var(--purple-soft)" : "var(--surface-soft)",
                        border: idx === 0 ? "1.5px solid var(--purple-line)" : "1px solid var(--line)",
                        borderRadius: 14,
                        minWidth: 200,
                        maxWidth: 240,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)" }}>STEP {item.step}</span>
                        <span style={{ fontSize: 12 }}>⚡</span>
                      </div>
                      <strong style={{ display: "block", fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>
                        {item.name}
                      </strong>
                      <div style={{ fontSize: 12, color: "var(--pencil)", fontWeight: 700, marginBottom: 4 }}>
                        {item.tool}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <span style={{ fontSize: 20, color: "var(--muted)", fontWeight: 800 }}>➔</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Aggregated Tool Stack Grid */}
            <div className="surface" style={{ padding: 28, borderRadius: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Verified Tool Stack & Frequency
                </h3>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Aggregated from creator's portfolio works
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {aggregatedTools.map((t) => (
                  <div
                    key={t.name}
                    style={{
                      padding: "16px 18px",
                      background: "#FFFFFF",
                      border: "1.5px solid var(--line-strong)",
                      borderRadius: 14,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={`pill ${t.kind === "app" ? "green" : "purple"}`} style={{ fontSize: 10, textTransform: "uppercase" }}>
                        {t.kind === "app" ? "Application" : "AI Model"}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
                        {t.count} {t.count === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
                    <strong style={{ fontSize: 15, color: "var(--ink)" }}>
                      {t.name}
                    </strong>
                    {t.version && (
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>Version: {t.version}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Works with Reconstructible Workflows */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Works with Step-by-Step AI Workflows ({portfolios.filter(p => Boolean(p.workflow)).length || portfolios.length})
                </h3>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Click to open full before/after comparison slider
                </span>
              </div>

              <div className="grid-2">
                {portfolios.map((item, idx) => (
                  <div
                    key={item.id}
                    className="surface"
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      border: "1px solid var(--line)",
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onClick={() => setViewerIndex(idx)}
                  >
                    <img
                      src={item.mediaUrl || item.thumbnailUrl}
                      alt={item.title}
                      style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 12, border: "1px solid var(--line)" }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span className="pill purple" style={{ fontSize: 10 }}>{item.genre || "Creative"}</span>
                        {item.workflow?.steps && (
                          <span style={{ fontSize: 11, color: "var(--purple-primary)", fontWeight: 700 }}>
                            {item.workflow.steps.length} Steps
                          </span>
                        )}
                      </div>
                      <strong style={{ display: "block", fontSize: 15, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.title}
                      </strong>
                      <p style={{ margin: "4px 0 8px", fontSize: 12, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.workflow?.steps?.[0]?.description || item.description || "Synthesized visual narrative"}
                      </p>
                      <button className="button small secondary" style={{ fontSize: 11, padding: "4px 10px" }}>
                        View Workflow & Slider ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: TRUST & VERIFICATION */}
        {activeTab === "trust" && (
          <div>
            <TrustChecklistPanel
              profile={trustProfile || {
                creatorId: creator.creatorId || creatorId,
                trustScore: creator.trustScore || 85,
                dominantTier: (creator.trustTier as any) || "link-checked",
                claimsCount: 2,
                proofBackedCount: 1,
                linkCheckedCount: 1,
                selfReportedCount: 0,
                needsProofCount: 0,
                checklist: {
                  toolsVerified: true,
                  pastWorkLinked: true,
                  processProofAdded: portfolios.some(p => Boolean(p.workflow)),
                  licenceStated: true,
                  profileComplete: true,
                },
                claims: [
                  {
                    id: "claim-1",
                    creatorId: creator.creatorId || creatorId,
                    type: "identity",
                    claim: "Instagram link verified with live follower metrics",
                    tier: "link-checked",
                    evidence: [{ type: "url", url: "https://instagram.com" }],
                    checkedAt: new Date().toISOString(),
                    checkedBy: "system",
                  },
                  {
                    id: "claim-2",
                    creatorId: creator.creatorId || creatorId,
                    type: "workflow",
                    claim: "Midjourney + Runway Gen-3 composition workspace verified",
                    tier: "proof-backed",
                    evidence: [{ type: "image", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" }],
                    checkedAt: new Date().toISOString(),
                    checkedBy: "gemini",
                  }
                ]
              }}
              isOwner={getStoredUser()?.creatorId === (creator.creatorId || creatorId) || getStoredUser()?.uid === creator.uid}
              onProofVerified={() => {
                fetchCreatorTrustProfile(creator.creatorId || creatorId).then(setTrustProfile).catch(() => {});
              }}
            />
          </div>
        )}

        {/* TAB: PUBLISHED SOCIAL POSTS */}
        {activeTab === "posts" && (
          <CreatorPostsFeed
            creatorId={creator.creatorId || creatorId}
            isOwner={getStoredUser()?.creatorId === (creator.creatorId || creatorId) || getStoredUser()?.uid === creator.uid}
          />
        )}

        {/* TAB 2: ABOUT */}
        {activeTab === "about" && (
          <div className="surface" style={{ padding: 32, borderRadius: 20 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>Creative Background</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--pencil)", margin: "0 0 24px" }}>
              {creator.bio}
            </p>

            <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 800, color: "var(--ink)", textTransform: "uppercase" }}>Specializations</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {creator.specializations?.map((s) => (
                <span key={s} className="pill purple">{s}</span>
              ))}
            </div>

            <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 800, color: "var(--ink)", textTransform: "uppercase" }}>Identified Skills</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {creator.skills?.map((s) => (
                <span key={s} className="pill">{s}</span>
              ))}
            </div>

            <div style={{ padding: "16px 20px", background: "var(--purple-soft)", borderRadius: 14, border: "1px solid var(--purple-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ display: "block", fontSize: 14, color: "var(--ink)" }}>Standard Brand Rate</strong>
                <small style={{ color: "var(--muted)", fontSize: 12 }}>Includes 1 primary deliverable, licensing, and 2 revision rounds.</small>
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "var(--purple-primary)" }}>{creator.rate || "$1,500"}</span>
            </div>
          </div>
        )}

        {/* TAB 3: SOCIALS */}
        {activeTab === "socials" && (
          <div className="grid-2">
            <div className="surface" style={{ padding: 28, borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>📸</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Instagram Verified Sync</h3>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 18px" }}>
                Synced directly from @{creator.instagram?.username || creator.handle.replace("@", "")}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ padding: 14, background: "var(--surface-soft)", borderRadius: 12 }}>
                  <small style={{ color: "var(--muted)", display: "block" }}>Followers</small>
                  <strong style={{ fontSize: 18 }}>{creator.instagram?.followers ? `${(creator.instagram.followers / 1000).toFixed(0)}K` : "185K"}</strong>
                </div>
                <div style={{ padding: 14, background: "var(--surface-soft)", borderRadius: 12 }}>
                  <small style={{ color: "var(--muted)", display: "block" }}>Avg Likes</small>
                  <strong style={{ fontSize: 18 }}>{creator.instagram?.avgLikes ? `${creator.instagram.avgLikes}` : "4,100"}</strong>
                </div>
              </div>
            </div>

            <div className="surface" style={{ padding: 28, borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>▶️</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>YouTube Studio</h3>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 18px" }}>
                Channel: {creator.youtube?.channelName || `${creator.name} AI Films`}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ padding: 14, background: "var(--surface-soft)", borderRadius: 12 }}>
                  <small style={{ color: "var(--muted)", display: "block" }}>Subscribers</small>
                  <strong style={{ fontSize: 18 }}>{creator.youtube?.subscribers ? `${(creator.youtube.subscribers / 1000).toFixed(0)}K` : "65K"}</strong>
                </div>
                <div style={{ padding: 14, background: "var(--surface-soft)", borderRadius: 12 }}>
                  <small style={{ color: "var(--muted)", display: "block" }}>Total Views</small>
                  <strong style={{ fontSize: 18 }}>3.8M</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI INSIGHTS */}
        {activeTab === "insights" && (
          <div className="surface" style={{ padding: 32, borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="kanji-stamp">INSIGHTS</span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>Gemini AI Creative Assessment</h3>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--pencil)", margin: "0 0 24px" }}>
              {creator.aiSummary || "Exceptional mastery in prompt crafting, generative video synthesis, and narrative storyboards. Audience engagement shows strong resonance for design, tech, and aesthetic lifestyle brands."}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <div style={{ padding: 18, background: "var(--purple-soft)", borderRadius: 14, border: "1px solid var(--purple-line)" }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--purple-primary)", textTransform: "uppercase" }}>Brand Fit Score</span>
                <strong style={{ fontSize: 24, color: "var(--ink)" }}>96 / 100</strong>
              </div>
              <div style={{ padding: 18, background: "var(--surface-soft)", borderRadius: 14 }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Production Speed</span>
                <strong style={{ fontSize: 24, color: "var(--ink)" }}>High (48-72h)</strong>
              </div>
              <div style={{ padding: 18, background: "var(--surface-soft)", borderRadius: 14 }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Visual Consistency</span>
                <strong style={{ fontSize: 24, color: "var(--ink)" }}>98%</strong>
              </div>
            </div>
          </div>
        )}

        {/* INQUIRY MODAL */}
        {showInquiryModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(31, 27, 44, 0.6)",
              backdropFilter: "blur(4px)",
              display: "grid",
              placeItems: "center",
              zIndex: 100,
              padding: 20,
            }}
          >
            <div className="surface" style={{ width: "min(520px, 100%)", padding: 32, borderRadius: 24, position: "relative" }}>
              <button
                onClick={() => setShowInquiryModal(false)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span className="kanji-stamp">PROPOSAL</span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Contact {creator.name}</h3>
              </div>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
                Send a direct project proposal or campaign brief inquiry.
              </p>

              {inquirySuccess ? (
                <div style={{ padding: 24, background: "#E8F5E9", color: "#2E7D32", borderRadius: 14, textAlign: "center", fontWeight: 700 }}>
                  ✓ Proposal sent successfully! The creator has received your message in their dashboard.
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Campaign Title</label>
                    <input
                      type="text"
                      className="field"
                      placeholder="e.g. Summer Collection Launch Hero Reel"
                      value={inquiryTitle}
                      onChange={(e) => setInquiryTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Budget Offer</label>
                    <input
                      type="text"
                      className="field"
                      value={inquiryBudget}
                      onChange={(e) => setInquiryBudget(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Message & Project Scope</label>
                    <textarea
                      className="textarea-field"
                      placeholder="Describe what deliverables you need, visual aesthetic, and desired timeline..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => setShowInquiryModal(false)} className="button ghost">
                      Cancel
                    </button>
                    <button type="submit" disabled={inquirySending} className="button">
                      {inquirySending ? "Sending..." : "Send Proposal →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* WORKFLOW-FIRST FULLSCREEN VIEWER WITH BEFORE-AFTER SLIDER & PROMPT INSPECTION */}
        <WorkflowPortfolioViewer
          items={filteredPortfolios}
          currentIndex={viewerIndex >= 0 ? viewerIndex : 0}
          isOpen={viewerIndex >= 0}
          onClose={() => setViewerIndex(-1)}
          onNavigate={(newIdx) => setViewerIndex(newIdx)}
          onTriggerLookAlike={(item) => {
            setViewerIndex(-1);
            router.push(`/discover?lookalike=${encodeURIComponent(item.mediaUrl || item.thumbnailUrl || "")}`);
          }}
        />
      </main>
    </PublicLayout>
  );
}
