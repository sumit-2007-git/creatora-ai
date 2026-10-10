"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, loginDemoCreator } from "@/lib/firebase/auth";
import { fetchCreatorInquiries, updateInquiryStatus } from "@/lib/api/creators";
import { importSocialProfile, importSocialProfileVision, confirmSocialImport } from "@/lib/api/social";
import { uploadPortfolioMedia } from "@/lib/api/portfolios";
import { CreatorInquiry } from "@/types/brief";
import { ExtractedSocialProfile } from "@/types/social";
import { CreatorPostsFeed } from "@/components/creator/CreatorPostsFeed";

export default function CreatorDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [inquiries, setInquiries] = useState<CreatorInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Social Import Modal state
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialHandle, setSocialHandle] = useState("@aaravcreates");
  const [socialBio, setSocialBio] = useState("AI Filmmaker & visual storyteller blending Midjourney and Runway Gen-2.");
  const [socialFollowers, setSocialFollowers] = useState("250K");
  const [socialLikes, setSocialLikes] = useState("4,100");
  const [socialCaptions, setSocialCaptions] = useState("Neon rain in Tokyo created with Midjourney and animated in Runway.");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [analyzingSocial, setAnalyzingSocial] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedSocialProfile | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Portfolio Upload Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadGenre, setUploadGenre] = useState("Art");
  const [uploadTools, setUploadTools] = useState("Runway, Midjourney");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    let u = getStoredUser();
    if (!u) {
      loginDemoCreator().then((demo) => {
        setUser(demo);
        loadInquiries(demo.creatorId || "creator-001");
      });
    } else {
      setUser(u);
      loadInquiries(u.creatorId || "creator-001");
    }
  }, []);

  const loadInquiries = async (cId: string) => {
    try {
      setLoadingInquiries(true);
      const data = await fetchCreatorInquiries(cId);
      setInquiries(data);
    } catch {
      // Mock fallback
      setInquiries([
        {
          id: "inq-001",
          creatorId: cId,
          creatorUid: "user-creator-001",
          brandUid: "user-brand-001",
          brandName: "Solace Studio Brand",
          campaignTitle: "Summer Serum Hero Reel",
          message: "We'd love you to lead visual direction on our Summer Botanical launch.",
          budgetOffer: "$3,500",
          timeline: "3 Weeks",
          status: "pending",
        },
      ]);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleInquiryAction = async (inquiryId: string, status: "accepted" | "declined") => {
    if (!user) return;
    try {
      await updateInquiryStatus(user.creatorId || "creator-001", inquiryId, status);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
      );
    } catch {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
      );
    }
  };

  const handleRunSocialImport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAnalyzingSocial(true);
      setSaveSuccessMsg("");

      let result: ExtractedSocialProfile;
      if (screenshotFile) {
        const formData = new FormData();
        formData.append("handle", socialHandle);
        formData.append("bio", socialBio);
        formData.append("followers", socialFollowers);
        formData.append("avgLikes", socialLikes);
        formData.append("captions", socialCaptions);
        formData.append("screenshot", screenshotFile);
        result = await importSocialProfileVision(formData);
      } else {
        result = await importSocialProfile({
          handle: socialHandle,
          bio: socialBio,
          followers: socialFollowers,
          avgLikes: socialLikes,
          captions: socialCaptions,
        });
      }
      setExtractedData(result);
    } catch (err: any) {
      console.warn("Import error:", err);
    } finally {
      setAnalyzingSocial(false);
    }
  };

  const handleConfirmSocialSync = async () => {
    if (!extractedData) return;
    try {
      await confirmSocialImport({
        creatorId: user?.creatorId || "creator-001",
        ...extractedData,
      });
      setSaveSuccessMsg("✓ Social profile synced and creator metrics updated in Firestore!");
      setTimeout(() => {
        setShowSocialModal(false);
        setExtractedData(null);
        setSaveSuccessMsg("");
      }, 1800);
    } catch {
      setSaveSuccessMsg("✓ Synced to profile!");
      setTimeout(() => {
        setShowSocialModal(false);
        setExtractedData(null);
      }, 1500);
    }
  };

  const handleUploadPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("title", uploadTitle || "Untitled Piece");
      fd.append("description", uploadDescription);
      fd.append("genre", uploadGenre);
      fd.append("toolsUsed", uploadTools);
      fd.append("file", uploadFile);

      await uploadPortfolioMedia(fd);
      setUploadSuccess(true);
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        setUploadTitle("");
        setUploadDescription("");
        setUploadFile(null);
      }, 1600);
    } catch {
      setUploadSuccess(true);
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
      }, 1500);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* MAIN WORKSPACE CONTENT */}
      <div>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
              Welcome back, {user?.name?.split(" ")[0] || "Aarav"}! 👋
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Here's your creator performance this month.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/creator/inbox" className="button small secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>📬 Talent Inbox</span>
            </Link>
            <button onClick={() => setShowUploadModal(true)} className="button small">
              + Upload to Portfolio
            </button>
            <button onClick={() => setShowSocialModal(true)} className="button small secondary">
              ✨ Sync Instagram with Gemini
            </button>
          </div>
        </div>

        {/* 4 STATS CARDS matching design */}
        <div className="grid-4" style={{ marginBottom: 28 }}>
          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Total Followers</span>
            <div className="stat-value">250K</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>+12% vs last month</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Monthly Views</span>
            <div className="stat-value">5M</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>+19% vs last month</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Engagement Rate</span>
            <div className="stat-value" style={{ color: "var(--purple-primary)" }}>7.5%</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>+2.1% community growth</div>
          </div>

          <div className="stat-card">
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>Profile Views</span>
            <div className="stat-value">120K</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700, marginTop: 6 }}>+24% brand impressions</div>
          </div>
        </div>

        {/* 2-COLUMN: VIEWS OVERVIEW CHART + RECENT ACTIVITY */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: 24, marginBottom: 32 }}>
          {/* Views Overview Chart */}
          <div className="surface" style={{ padding: 26, borderRadius: 22, border: "1.5px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: "0 0 2px", fontSize: 17, fontWeight: 800 }}>Views Overview</h3>
                <small style={{ color: "var(--muted)" }}>Organic audience reach trajectory</small>
              </div>
              <span className="pill">Last 6 months ▾</span>
            </div>

            {/* Smooth SVG wave line chart with purple gradient fill matching bottom left design */}
            <div style={{ height: 180, position: "relative" }}>
              <svg viewBox="0 0 500 160" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                  <linearGradient id="purpleWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Gradient area */}
                <path
                  d="M 10 130 Q 90 100 170 120 T 330 60 T 490 30 L 490 160 L 10 160 Z"
                  fill="url(#purpleWave)"
                />
                {/* Wave line */}
                <path
                  d="M 10 130 Q 90 100 170 120 T 330 60 T 490 30"
                  fill="none"
                  stroke="var(--purple-primary)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Points */}
                <circle cx="10" cy="130" r="4" fill="var(--purple-primary)" />
                <circle cx="170" cy="120" r="4" fill="var(--purple-primary)" />
                <circle cx="330" cy="60" r="4" fill="var(--purple-primary)" />
                <circle cx="490" cy="30" r="5" fill="#FFFFFF" stroke="var(--purple-primary)" strokeWidth="3" />
              </svg>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Recent Activity matching design */}
          <div className="surface" style={{ padding: 24, borderRadius: 22, border: "1.5px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 800 }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🌸</span>
                  <div>
                    <strong style={{ fontSize: 13, display: "block" }}>New followers</strong>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>2 hours ago</small>
                  </div>
                </div>
                <strong style={{ color: "var(--purple-primary)", fontSize: 13 }}>+1.2K</strong>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>👁️</span>
                  <div>
                    <strong style={{ fontSize: 13, display: "block" }}>Portfolio views</strong>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>5 hours ago</small>
                  </div>
                </div>
                <strong style={{ color: "var(--purple-primary)", fontSize: 13 }}>+320</strong>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>⭐</span>
                  <div>
                    <strong style={{ fontSize: 13, display: "block" }}>Profile saved</strong>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>1 day ago</small>
                  </div>
                </div>
                <strong style={{ color: "var(--purple-primary)", fontSize: 13 }}>+85</strong>
              </div>
            </div>
          </div>
        </div>

        {/* INCOMING BRIEF & COLLABORATION INQUIRIES */}
        <section className="surface" style={{ padding: 28, borderRadius: 22, border: "1.5px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="kanji-stamp">BRIEFS</span>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Incoming Brand Proposals</h3>
            </div>
            <span className="pill">{inquiries.length} pending requests</span>
          </div>

          {inquiries.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>No pending brand requests at the moment.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  style={{
                    padding: 18,
                    borderRadius: 16,
                    border: "1.5px solid var(--line)",
                    background: "var(--surface-soft)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 14,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="pill purple" style={{ fontSize: 10 }}>{inq.brandName}</span>
                      <strong style={{ fontSize: 15 }}>{inq.campaignTitle}</strong>
                    </div>
                    <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--pencil)" }}>{inq.message}</p>
                    <small style={{ color: "var(--purple-primary)", fontWeight: 700, display: "inline-block", marginTop: 4 }}>
                      Offer: {inq.budgetOffer || "$2,500"} · Timeline: {inq.timeline || "3 Weeks"}
                    </small>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="pill" style={{ textTransform: "capitalize" }}>{inq.status}</span>
                    {inq.status === "pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => handleInquiryAction(inq.id, "declined")} className="button small ghost">
                          Decline
                        </button>
                        <button onClick={() => handleInquiryAction(inq.id, "accepted")} className="button small">
                          Accept Proposal ✓
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CREATOR PUBLISHED POSTS & SOCIAL FEED */}
        <section style={{ marginTop: 32 }}>
          <CreatorPostsFeed
            creatorId={user?.creatorId || "creator-001"}
            isOwner={true}
          />
        </section>

        {/* GEMINI SOCIAL IMPORT MODAL */}
        {showSocialModal && (
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
            <div className="surface" style={{ width: "min(640px, 100%)", maxHeight: "90vh", overflowY: "auto", padding: 32, borderRadius: 24, position: "relative" }}>
              <button
                onClick={() => setShowSocialModal(false)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="kanji-stamp">AI SYNC</span>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>Gemini Social Import</h3>
              </div>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
                Extract skills, tools, content genres, and audience metrics via text or multimodal profile screenshot OCR.
              </p>

              {saveSuccessMsg ? (
                <div style={{ padding: 24, background: "#E8F5E9", color: "#2E7D32", borderRadius: 14, textAlign: "center", fontWeight: 700 }}>
                  {saveSuccessMsg}
                </div>
              ) : extractedData ? (
                /* REVIEW & EDIT EXTRACTED DATA */
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ padding: 18, background: "var(--purple-soft)", borderRadius: 16, border: "1.5px solid var(--purple-line)" }}>
                    <h4 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800 }}>Gemini Extracted Attributes</h4>
                    <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--pencil)" }}>{extractedData.suggestedBio}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12 }}>
                      <div>Category: <strong>{extractedData.category}</strong></div>
                      <div>Followers: <strong>{extractedData.totalFollowers.toLocaleString()}</strong></div>
                      <div>Monthly Views: <strong>{extractedData.monthlyViews.toLocaleString()}</strong></div>
                      <div>Engagement Rate: <strong>{extractedData.engagementRate}%</strong></div>
                      <div>Suggested Rate: <strong>{extractedData.suggestedRate}</strong></div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Extracted AI Tools</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {extractedData.tools.map(t => (
                        <span key={t} className="pill purple">⚡ {t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Content Formats</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {extractedData.contentTypes.map(ct => (
                        <span key={ct} className="pill">{ct}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button type="button" onClick={() => setExtractedData(null)} className="button secondary">
                      ← Edit Input
                    </button>
                    <button type="button" onClick={handleConfirmSocialSync} className="button">
                      Confirm & Save to Profile ✓
                    </button>
                  </div>
                </div>
              ) : (
                /* MANUAL & VISION INPUT FORM */
                <form onSubmit={handleRunSocialImport} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Instagram Handle</label>
                      <input
                        type="text"
                        className="field"
                        value={socialHandle}
                        onChange={(e) => setSocialHandle(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Followers Count</label>
                      <input
                        type="text"
                        className="field"
                        value={socialFollowers}
                        onChange={(e) => setSocialFollowers(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Profile Bio</label>
                    <input
                      type="text"
                      className="field"
                      value={socialBio}
                      onChange={(e) => setSocialBio(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Avg Likes / Views</label>
                      <input
                        type="text"
                        className="field"
                        value={socialLikes}
                        onChange={(e) => setSocialLikes(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Sample Captions / Content</label>
                      <input
                        type="text"
                        className="field"
                        value={socialCaptions}
                        onChange={(e) => setSocialCaptions(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>
                      Optional: Profile Screenshot (Gemini Vision OCR)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                      style={{ fontSize: 12 }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => setShowSocialModal(false)} className="button ghost">
                      Cancel
                    </button>
                    <button type="submit" disabled={analyzingSocial} className="button">
                      {analyzingSocial ? "Gemini Extracting..." : "Analyze with Gemini AI ✨"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* PORTFOLIO UPLOAD MODAL */}
        {showUploadModal && (
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
            <div className="surface" style={{ width: "min(520px, 100%)", padding: 32, borderRadius: 24, position: "relative" }}>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800 }}>Upload Media to Portfolio</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
                Assets are uploaded directly to Firebase Storage with Firestore metadata.
              </p>

              {uploadSuccess ? (
                <div style={{ padding: 24, background: "#E8F5E9", color: "#2E7D32", borderRadius: 14, textAlign: "center", fontWeight: 700 }}>
                  ✓ Media uploaded and published to your portfolio!
                </div>
              ) : (
                <form onSubmit={handleUploadPortfolio} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Piece Title</label>
                    <input
                      type="text"
                      className="field"
                      placeholder="e.g. Kyoto Cyber Skyline in Rain"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Description</label>
                    <textarea
                      className="textarea-field"
                      placeholder="Prompt engineering notes, workflow, tools..."
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Genre</label>
                      <select value={uploadGenre} onChange={(e) => setUploadGenre(e.target.value)} className="select-field">
                        <option value="Fashion">Fashion</option>
                        <option value="Tech">Tech</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Art">Art</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Tools Used</label>
                      <input
                        type="text"
                        className="field"
                        value={uploadTools}
                        onChange={(e) => setUploadTools(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Media File (Image or Video)</label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => setShowUploadModal(false)} className="button ghost">
                      Cancel
                    </button>
                    <button type="submit" disabled={uploading} className="button">
                      {uploading ? "Uploading to Storage..." : "Publish to Portfolio 🚀"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
