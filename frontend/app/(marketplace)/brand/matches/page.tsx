"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { getStoredUser, loginDemoBrand } from "@/lib/firebase/auth";
import { fetchBrandMatches, resetBrandPasses } from "@/lib/api/swipes";
import { BrandMatchesResponse } from "@/lib/api/swipes";

export default function BrandMatchesPage() {
  const [user, setUser] = useState<any>(null);
  const [brandId, setBrandId] = useState("brand-001");
  const [data, setData] = useState<BrandMatchesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mutual" | "pending" | "passes">("mutual");
  const [resetFeedback, setResetFeedback] = useState(false);

  const loadMatches = async (bId: string) => {
    try {
      setLoading(true);
      const res = await fetchBrandMatches(bId);
      setData(res);
    } catch (e) {
      console.warn("Matches load warning:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let u = getStoredUser();
    if (!u) {
      loginDemoBrand().then((demo) => {
        setUser(demo);
        const bid = demo.brandId || "brand-001";
        setBrandId(bid);
        loadMatches(bid);
      });
    } else {
      setUser(u);
      const bid = u.brandId || "brand-001";
      setBrandId(bid);
      loadMatches(bid);
    }
  }, []);

  const handleResetPasses = async () => {
    try {
      await resetBrandPasses(brandId);
      setResetFeedback(true);
      setTimeout(() => setResetFeedback(false), 2500);
      loadMatches(brandId);
    } catch (e) {
      console.warn("Reset passes warning:", e);
    }
  };

  const mutualMatches = data?.mutualMatches || [];
  const pendingInterests = data?.interestedPending || [];
  const passes = data?.passes || [];

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px", maxWidth: 840 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>MATCHES</span>
              <span className="pill purple">Brand Talent Relations</span>
            </div>
            <h1 style={{ margin: "6px 0 2px", fontSize: 28, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
              Collaborations & Matches
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Review confirmed talent connections, pending swipes, and passed profiles.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/brand/swipe" className="button small">
              🔥 Swipe More Talent →
            </Link>
          </div>
        </div>

        {resetFeedback && (
          <div
            style={{
              padding: "10px 16px",
              background: "#E8F5E9",
              border: "1.5px solid #A5D6A7",
              color: "#2E7D32",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            ✓ Passes reset! All passed creators are available in your swipe deck again.
          </div>
        )}

        {/* Tabs Bar */}
        <div style={{ display: "flex", borderBottom: "1.5px solid var(--line)", marginBottom: 24, gap: 8 }}>
          <button
            onClick={() => setActiveTab("mutual")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 800,
              color: activeTab === "mutual" ? "var(--purple-primary)" : "var(--muted)",
              borderBottom: activeTab === "mutual" ? "2.5px solid var(--purple-primary)" : "none",
            }}
          >
            🎉 Mutual Matches ({mutualMatches.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 800,
              color: activeTab === "pending" ? "var(--purple-primary)" : "var(--muted)",
              borderBottom: activeTab === "pending" ? "2.5px solid var(--purple-primary)" : "none",
            }}
          >
            ⏳ Interested - Pending ({pendingInterests.length})
          </button>
          <button
            onClick={() => setActiveTab("passes")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 800,
              color: activeTab === "passes" ? "var(--purple-primary)" : "var(--muted)",
              borderBottom: activeTab === "passes" ? "2.5px solid var(--purple-primary)" : "none",
            }}
          >
            ✖ Passes ({passes.length})
          </button>
        </div>

        {/* TAB 1: MUTUAL MATCHES */}
        {activeTab === "mutual" && (
          <div>
            {mutualMatches.length === 0 ? (
              <div className="surface" style={{ padding: 48, textAlign: "center", borderRadius: 20 }}>
                <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>🤝</span>
                <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>No Confirmed Matches Yet</h3>
                <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--muted)" }}>
                  Swipe right on creators in the discovery deck to send invitations.
                </p>
                <Link href="/brand/swipe" className="button small">
                  Open Swipe Deck →
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 18 }}>
                {mutualMatches.map((m) => (
                  <div
                    key={m.id}
                    className="surface"
                    style={{
                      padding: 22,
                      borderRadius: 18,
                      border: "2px solid #A5D6A7",
                      background: "#FFFFFF",
                      boxShadow: "0 4px 18px rgba(46, 125, 50, 0.08)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                      <img
                        src={m.creatorAvatar}
                        alt={m.creatorName}
                        style={{ width: 60, height: 60, borderRadius: 16, objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                            {m.creatorName}
                          </h4>
                          <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9", fontSize: 10 }}>
                            ✓ Matched
                          </span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                          {m.creatorHandle} · {m.creatorRole}
                        </span>
                      </div>
                    </div>

                    {m.briefTitle && (
                      <div style={{ marginBottom: 12, fontSize: 12.5, color: "var(--pencil)" }}>
                        <strong>Campaign:</strong> {m.briefTitle}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                      <Link href={`/creators/${m.creatorId}`} className="button small secondary" style={{ flex: 1 }}>
                        View Profile
                      </Link>
                      <button
                        onClick={() => alert(`Starting production channel with ${m.creatorName} (Thread ID: ${m.projectThreadId})`)}
                        className="button small"
                        style={{ flex: 1.2, background: "#00B894", borderColor: "#00B894" }}
                      >
                        💬 Project Thread
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PENDING INTERESTS */}
        {activeTab === "pending" && (
          <div>
            {pendingInterests.length === 0 ? (
              <div className="surface" style={{ padding: 48, textAlign: "center", borderRadius: 20 }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>No pending interests right now.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {pendingInterests.map((p) => (
                  <div key={p.creatorId} className="surface" style={{ padding: 18, borderRadius: 16, border: "1.5px solid var(--line)" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                      <img src={p.avatar} alt={p.name} style={{ width: 48, height: 48, borderRadius: 14, objectFit: "cover" }} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>{p.name}</h4>
                        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{p.handle}</span>
                      </div>
                    </div>
                    <span className="pill" style={{ color: "#D97706", borderColor: "#FDE68A", background: "#FFFBEB", fontSize: 11 }}>
                      ⏳ Waiting for creator response
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PASSES */}
        {activeTab === "passes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                Creators you swiped left on. You can reset them to appear in your deck again.
              </span>
              <button onClick={handleResetPasses} className="button small secondary">
                🔄 Reset All Passes
              </button>
            </div>

            {passes.length === 0 ? (
              <div className="surface" style={{ padding: 48, textAlign: "center", borderRadius: 20 }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>No passed creators.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                {passes.map((p) => (
                  <div key={p.creatorId} className="surface" style={{ padding: 14, borderRadius: 14, border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={p.avatar} alt={p.name} style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{p.name}</h5>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.roleTitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </PublicLayout>
  );
}
