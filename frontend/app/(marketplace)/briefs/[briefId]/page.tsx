"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchBriefById, applyToBrief, fetchBriefApplications, updateApplicationStatus } from "@/lib/api/briefs";
import { demoBriefs } from "@/lib/demo-data";
import { Brief, BriefApplication } from "@/types/brief";
import { getStoredUser } from "@/lib/firebase/auth";
import { DreamTeamModal } from "@/components/brief/DreamTeamModal";

export default function BriefDetailPage() {
  const params = useParams();
  const router = useRouter();
  const briefId = Array.isArray(params?.briefId) ? params.briefId[0] : (params?.briefId as string) || "brief-001";

  const [brief, setBrief] = useState<Brief | null>(null);
  const [applications, setApplications] = useState<BriefApplication[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showDreamTeam, setShowDreamTeam] = useState(false);

  // Creator apply modal
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedRate, setProposedRate] = useState("$2,500");
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    const load = async () => {
      try {
        const b = await fetchBriefById(briefId);
        setBrief(b);
      } catch {
        const found = demoBriefs.find((d) => d.id === briefId) || demoBriefs[0];
        setBrief(found);
      }

      try {
        const apps = await fetchBriefApplications(briefId);
        setApplications(apps);
      } catch {
        setApplications([]);
      }
    };
    load();
  }, [briefId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief) return;
    try {
      setApplying(true);
      await applyToBrief(brief.id, {
        creatorId: currentUser?.creatorId || "creator-001",
        coverLetter: coverLetter || "I would love to produce this campaign reel using Runway and Midjourney.",
        proposedRate,
      });
      setApplySuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccess(false);
        window.location.reload();
      }, 1500);
    } catch {
      setApplySuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccess(false);
      }, 1500);
    } finally {
      setApplying(false);
    }
  };

  const handleUpdateAppStatus = async (appId: string, status: string) => {
    try {
      await updateApplicationStatus(briefId, appId, status);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: status as any } : a))
      );
    } catch (e) {
      console.warn("Update status warning:", e);
    }
  };

  if (!brief) {
    return (
      <PublicLayout>
        <div style={{ textAlign: "center", padding: 100, color: "var(--muted)" }}>
          Loading brief...
        </div>
      </PublicLayout>
    );
  }

  const isBrandOwner = currentUser?.role === "BRAND";

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Header Card */}
          <div className="surface" style={{ padding: 36, borderRadius: 24, border: "1.5px solid var(--line)", marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <span className="pill purple" style={{ marginBottom: 10 }}>
                  {brief.brandName}
                </span>
                <h1 style={{ margin: "6px 0", fontSize: 32, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
                  {brief.title}
                </h1>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {brief.genres?.map((g) => (
                    <span key={g} className="pill">{g}</span>
                  ))}
                  <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9" }}>
                    ● {brief.status === "open" ? "Accepting Creators" : brief.status}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setShowDreamTeam(true)}
                  className="button secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <span>⚡</span> Build Dream Team
                </button>
                <button onClick={() => setShowApplyModal(true)} className="button">
                  Apply for this Campaign →
                </button>
              </div>
            </div>

            {/* Description */}
            <div style={{ margin: "24px 0", fontSize: 15, lineHeight: 1.8, color: "var(--pencil)" }}>
              {brief.description}
            </div>

            {/* Metrics Row */}
            <div
              className="brief-stats-grid"
              style={{
                padding: "20px 0",
                borderTop: "1.5px solid var(--line)",
                borderBottom: "1.5px solid var(--line)",
                fontSize: 13,
              }}
            >
              <div>
                <span style={{ color: "var(--muted)", display: "block", fontSize: 11, textTransform: "uppercase" }}>Budget</span>
                <strong style={{ fontSize: 18, color: "var(--purple-primary)" }}>{brief.budget}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted)", display: "block", fontSize: 11, textTransform: "uppercase" }}>Timeline</span>
                <strong style={{ fontSize: 18 }}>{brief.deadline}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted)", display: "block", fontSize: 11, textTransform: "uppercase" }}>Deliverables</span>
                <strong style={{ fontSize: 18 }}>{brief.deliverablesCount} items</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted)", display: "block", fontSize: 11, textTransform: "uppercase" }}>Applicants</span>
                <strong style={{ fontSize: 18 }}>{brief.applicantCount} creators</strong>
              </div>
            </div>

            {/* Detailed requirements */}
            <div className="brief-reqs-grid" style={{ marginTop: 24 }}>
              <div>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Target Audience</h4>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)" }}>{brief.targetAudience}</p>
              </div>
              <div>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Visual Aesthetic</h4>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)" }}>{brief.visualAesthetic}</p>
              </div>
            </div>
          </div>

          {/* Incoming Applications (if Brand) */}
          <div className="surface" style={{ padding: 32, borderRadius: 24, border: "1.5px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="kanji-stamp">APPLY</span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Applicant Creators</h3>
              </div>
              <span className="pill">{applications.length} applications received</span>
            </div>

            {applications.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No creators have applied yet. Be the first creator to apply!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {applications.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      padding: 18,
                      border: "1px solid var(--line)",
                      borderRadius: 16,
                      background: "var(--surface-soft)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <img
                        src={app.creatorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                        alt={app.creatorName}
                        style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }}
                      />
                      <div>
                        <strong style={{ fontSize: 15, display: "block" }}>{app.creatorName}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>{app.coverLetter}</p>
                        <small style={{ color: "var(--purple-primary)", fontWeight: 700 }}>Rate: {app.proposedRate || "$2,500"}</small>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="pill" style={{ textTransform: "capitalize" }}>{app.status}</span>
                      {isBrandOwner && app.status === "pending" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => handleUpdateAppStatus(app.id, "shortlisted")} className="button small secondary">
                            Shortlist
                          </button>
                          <button onClick={() => handleUpdateAppStatus(app.id, "accepted")} className="button small">
                            Accept
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* APPLICATION MODAL */}
          {showApplyModal && (
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
                  onClick={() => setShowApplyModal(false)}
                  style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
                >
                  ✕
                </button>

                <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800 }}>Apply to {brief.title}</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
                  Submit your creative pitch and proposed rate to the brand.
                </p>

                {applySuccess ? (
                  <div style={{ padding: 24, background: "#E8F5E9", color: "#2E7D32", borderRadius: 14, textAlign: "center", fontWeight: 700 }}>
                    ✓ Application submitted successfully to {brief.brandName}!
                  </div>
                ) : (
                  <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Proposed Collaboration Rate</label>
                      <input
                        type="text"
                        className="field"
                        value={proposedRate}
                        onChange={(e) => setProposedRate(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Cover Letter & Creative Angle</label>
                      <textarea
                        className="textarea-field"
                        placeholder="Explain why your generative visual style matches this brief..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                      <button type="button" onClick={() => setShowApplyModal(false)} className="button ghost">
                        Cancel
                      </button>
                      <button type="submit" disabled={applying} className="button">
                        {applying ? "Submitting..." : "Submit Application 🚀"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DREAM TEAM BUILDER MODAL */}
      <DreamTeamModal
        brief={brief}
        isOpen={showDreamTeam}
        onClose={() => setShowDreamTeam(false)}
      />
    </PublicLayout>
  );
}
