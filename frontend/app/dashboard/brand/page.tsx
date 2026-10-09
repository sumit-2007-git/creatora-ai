"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, loginDemoBrand } from "@/lib/firebase/auth";
import { fetchCreatorRecommendations } from "@/lib/api/recommendations";
import { fetchBriefs } from "@/lib/api/briefs";
import { sendInquiry } from "@/lib/api/creators";
import { RecommendationItem } from "@/types/api";
import { Brief } from "@/types/brief";
import { demoBriefs } from "@/lib/demo-data";

export default function BrandDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>(demoBriefs);
  const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);

  // Proposal modal
  const [proposalMsg, setProposalMsg] = useState("");
  const [proposalSent, setProposalSent] = useState(false);

  useEffect(() => {
    let u = getStoredUser();
    if (!u) {
      loginDemoBrand().then((demo) => {
        setUser(demo);
      });
    } else {
      setUser(u);
    }

    const loadRecs = async () => {
      try {
        const res = await fetchCreatorRecommendations();
        if (res?.recommendations?.length) {
          setRecommendations(res.recommendations);
        } else {
          setRecommendations([
            {
              creatorId: "creator-002",
              name: "Mizuki Tanaka",
              avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
              handle: "@mizuki_ai",
              roleTitle: "AI Lifestyle & Visual Artist",
              matchPercentage: 95,
              matchRationale: "Exceptional mastery in watercolor AI and tranquil aesthetic storytelling, aligning 95% with your Botanical Glow brief.",
              genres: ["Fashion", "AI"],
              tools: ["Midjourney", "Runway"],
              totalFollowers: "180K",
              engagementRate: "6.8%",
            },
            {
              creatorId: "creator-004",
              name: "Ryo Sato",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
              handle: "@ryo_soundscapes",
              roleTitle: "AI Sound & Cinematic Creator",
              matchPercentage: 92,
              matchRationale: "Unique audio-visual synchronisation style perfectly tailored for short-form product teasers.",
              genres: ["Tech", "Review"],
              tools: ["Runway", "Adobe"],
              totalFollowers: "145K",
              engagementRate: "7.1%",
            },
            {
              creatorId: "creator-005",
              name: "Hana Suzuki",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
              handle: "@hana_escapes",
              roleTitle: "AI Travel & Nature Storyteller",
              matchPercentage: 89,
              matchRationale: "Deep engagement among organic lifestyle audiences, ideal for nature-focused visual campaigns.",
              genres: ["Lifestyle", "Travel"],
              tools: ["Midjourney", "DaVinci"],
              totalFollowers: "95K",
              engagementRate: "8.4%",
            },
          ]);
        }
      } catch {
        // Fallback recommendations
      }
    };
    loadRecs();

    fetchBriefs().then(b => {
      if (b && b.length > 0) setBriefs(b);
    }).catch(() => {});
  }, []);

  const handleSendProposal = async () => {
    if (!selectedRec) return;
    try {
      await sendInquiry(selectedRec.creatorId, {
        campaignTitle: "Partnership Proposal from Solace Studio",
        message: proposalMsg || selectedRec.matchRationale,
        budgetOffer: "$3,000",
      });
      setProposalSent(true);
      setTimeout(() => {
        setSelectedRec(null);
        setProposalSent(false);
      }, 1500);
    } catch {
      setProposalSent(true);
      setTimeout(() => {
        setSelectedRec(null);
        setProposalSent(false);
      }, 1500);
    }
  };

  return (
    <div>
      <div>
        {/* Top greeting matching bottom center design */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
              Welcome back! 👋
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Here's an overview of your campaigns.
            </p>
          </div>

          <Link href="/briefs/create" className="button">
            + Create New Brief
          </Link>
        </div>

        {/* 4 STATS CARDS matching design */}
        <div className="grid-4" style={{ marginBottom: 32 }}>
          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Active Briefs</span>
            <div className="stat-value">3</div>
            <div style={{ fontSize: 11, color: "var(--purple-primary)", fontWeight: 700, marginTop: 6 }}>● Live in marketplace</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Total Applications</span>
            <div className="stat-value">48</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>+14 this week</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Shortlisted</span>
            <div className="stat-value" style={{ color: "var(--purple-primary)" }}>12</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>In review pipeline</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Completed</span>
            <div className="stat-value">5</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>100% delivered</div>
          </div>
        </div>

        {/* AI CREATOR RECOMMENDATIONS SECTION matching design */}
        <section className="surface" style={{ padding: 28, borderRadius: 22, border: "1.5px solid var(--line)", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="kanji-stamp">MATCH</span>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>AI Creator Recommendations</h3>
              </div>
              <small style={{ color: "var(--muted)" }}>Ranked by Gemini multimodal synergy analysis</small>
            </div>
            <Link href="/discover" className="text-link" style={{ fontSize: 13 }}>
              View all →
            </Link>
          </div>

          <div className="grid-3">
            {recommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.creatorId}
                style={{
                  padding: 18,
                  borderRadius: 18,
                  border: "1.5px solid var(--line)",
                  background: "var(--surface-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={rec.avatar}
                    alt={rec.name}
                    style={{ width: 48, height: 48, borderRadius: 14, objectFit: "cover" }}
                  />
                  <div>
                    <strong style={{ fontSize: 15, display: "block" }}>{rec.name}</strong>
                    <span style={{ fontSize: 12, color: "var(--purple-primary)", fontWeight: 800 }}>
                      ⚡ {rec.matchPercentage}% match
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {rec.genres?.map((g) => (
                    <span key={g} className="pill" style={{ fontSize: 10 }}>{g}</span>
                  ))}
                  {rec.tools?.slice(0, 1).map((t) => (
                    <span key={t} className="pill purple" style={{ fontSize: 10 }}>{t}</span>
                  ))}
                </div>

                <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                  {rec.matchRationale}
                </p>

                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <button
                    onClick={() => setSelectedRec(rec)}
                    className="button small"
                    style={{ width: "100%" }}
                  >
                    See Recommendation →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVE BRIEFS SECTION */}
        <section className="surface" style={{ padding: 28, borderRadius: 22, border: "1.5px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Campaign Briefs Overview</h3>
            <span className="pill">{briefs.length} campaigns</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {briefs.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  border: "1px solid var(--line)",
                  background: "#FFFFFF",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14,
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>{b.title}</h4>
                  <small style={{ color: "var(--muted)" }}>
                    Budget: <strong style={{ color: "var(--purple-primary)" }}>{b.budget}</strong> · Deadline: {b.deadline} · {b.deliverablesCount} Deliverables
                  </small>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span className="pill purple">
                    👥 {b.applicantCount} applicants
                  </span>
                  <Link href={`/briefs/${b.id}`} className="button small secondary">
                    Manage Applicants →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDATION DETAIL MODAL */}
        {selectedRec && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(31, 27, 44, 0.7)",
              backdropFilter: "blur(5px)",
              display: "grid",
              placeItems: "center",
              zIndex: 100,
              padding: 20,
            }}
          >
            <div className="surface" style={{ width: "min(560px, 100%)", padding: 32, borderRadius: 24, position: "relative" }}>
              <button
                onClick={() => setSelectedRec(null)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <img
                  src={selectedRec.avatar}
                  alt={selectedRec.name}
                  style={{ width: 64, height: 64, borderRadius: 18, objectFit: "cover" }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{selectedRec.name}</h3>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{selectedRec.roleTitle}</span>
                  <div style={{ marginTop: 4 }}>
                    <span className="pill purple">✨ {selectedRec.matchPercentage}% Compatibility Match</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: 18, background: "var(--purple-soft)", borderRadius: 16, border: "1px solid var(--purple-line)", marginBottom: 18 }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800 }}>Gemini Synergy Analysis</h4>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
                  {selectedRec.matchRationale}
                </p>
              </div>

              {proposalSent ? (
                <div style={{ padding: 20, background: "#E8F5E9", color: "#2E7D32", borderRadius: 14, textAlign: "center", fontWeight: 700 }}>
                  ✓ Direct campaign proposal sent to {selectedRec.name}!
                </div>
              ) : (
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Custom Invitation Message</label>
                  <textarea
                    className="textarea-field"
                    value={proposalMsg}
                    onChange={(e) => setProposalMsg(e.target.value)}
                    placeholder={`Hi ${selectedRec.name}, we would love to have you lead visual production on our upcoming campaign...`}
                    rows={3}
                  />

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
                    <Link href={`/creators/${selectedRec.creatorId}`} className="button secondary">
                      View Profile
                    </Link>
                    <button onClick={handleSendProposal} className="button">
                      Send Direct Proposal →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
