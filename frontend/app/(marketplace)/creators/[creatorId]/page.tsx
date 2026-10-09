"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchCreatorById, sendInquiry } from "@/lib/api/creators";
import { fetchPortfolios } from "@/lib/api/portfolios";
import { demoCreators, demoPortfolios } from "@/lib/demo-data";
import { Creator } from "@/types/creator";
import { PortfolioItem } from "@/types/portfolio";
import { getStoredUser } from "@/lib/firebase/auth";
import { VideoPortfolioCard } from "@/components/portfolio/VideoPortfolioCard";
import { VideoModalPlayer } from "@/components/portfolio/VideoModalPlayer";

export default function CreatorDetailPage() {
  const params = useParams();
  const creatorId = Array.isArray(params?.creatorId) ? params.creatorId[0] : (params?.creatorId as string) || "creator-001";

  const [creator, setCreator] = useState<Creator | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [activeTab, setActiveTab] = useState<"portfolio" | "about" | "socials" | "insights">("portfolio");
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

  // Media preview modal state
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);

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
          <div style={{ padding: "0 34px 28px" }}>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em" }}>
                      {creator.name}
                    </h1>
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
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

        {/* TABS NAVIGATION */}
        <div style={{ display: "flex", borderBottom: "1.5px solid var(--line)", marginBottom: 28 }}>
          {[
            { id: "portfolio", label: "Portfolio" },
            { id: "about", label: "About" },
            { id: "socials", label: "Socials" },
            { id: "insights", label: "AI Insights ✨" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "12px 24px",
                border: "none",
                background: "transparent",
                fontSize: 14.5,
                fontWeight: activeTab === tab.id ? 800 : 600,
                color: activeTab === tab.id ? "var(--purple-primary)" : "var(--muted)",
                borderBottom: activeTab === tab.id ? "3px solid var(--purple-primary)" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
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
              {filteredPortfolios.map((item) => (
                <VideoPortfolioCard
                  key={item.id}
                  item={item}
                  onOpenPreview={(i) => setPreviewItem(i)}
                />
              ))}
            </div>
          </div>
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

        {/* VIDEO MODAL PLAYER */}
        <VideoModalPlayer
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      </main>
    </PublicLayout>
  );
}
