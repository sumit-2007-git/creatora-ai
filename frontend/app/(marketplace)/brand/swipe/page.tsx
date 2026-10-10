"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { getStoredUser, loginDemoBrand } from "@/lib/firebase/auth";
import { fetchSwipeDeck, recordSwipe, resetBrandPasses } from "@/lib/api/swipes";
import { fetchBriefs } from "@/lib/api/briefs";
import { SwipeDeckItem } from "@/types/creator";
import { Brief } from "@/types/brief";
import { demoBriefs } from "@/lib/demo-data";

export default function BrandSwipePage() {
  const [user, setUser] = useState<any>(null);
  const [brandId, setBrandId] = useState("brand-001");
  const [briefs, setBriefs] = useState<Brief[]>(demoBriefs);
  const [selectedBriefId, setSelectedBriefId] = useState<string>("");

  const [deck, setDeck] = useState<SwipeDeckItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ item: SwipeDeckItem; direction: string }[]>([]);

  // Drag gesture states
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Profile modal & intro message modal
  const [expandedCreator, setExpandedCreator] = useState<SwipeDeckItem | null>(null);
  const [showIntroModal, setShowIntroModal] = useState<SwipeDeckItem | null>(null);
  const [introMsg, setIntroMsg] = useState("");
  const [swipeNotificationFeedback, setSwipeNotificationFeedback] = useState<string | null>(null);

  const loadDeck = useCallback(async (bId?: string) => {
    try {
      setLoading(true);
      const res = await fetchSwipeDeck(brandId, bId || undefined);
      setDeck(res.deck || []);
    } catch (e) {
      console.warn("Deck loading error:", e);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    let u = getStoredUser();
    if (!u) {
      loginDemoBrand().then((demo) => {
        setUser(demo);
        setBrandId(demo.brandId || "brand-001");
      });
    } else {
      setUser(u);
      setBrandId(u.brandId || "brand-001");
    }

    fetchBriefs().then((b) => {
      if (b && b.length > 0) {
        setBriefs(b);
        setSelectedBriefId(b[0].id);
      }
    }).catch(() => {});

    loadDeck(selectedBriefId);
  }, [loadDeck, selectedBriefId]);

  const activeCard = deck[0];

  const handleSwipe = async (direction: "interested" | "pass", customIntro?: string) => {
    if (!activeCard) return;
    const current = activeCard;

    // Remove from deck and push to history for undo
    setDeck((prev) => prev.slice(1));
    setHistory((prev) => [...prev, { item: current, direction }]);
    setDragOffset({ x: 0, y: 0 });

    try {
      const res = await recordSwipe({
        brandId,
        creatorId: current.creatorId,
        direction,
        briefId: selectedBriefId || undefined,
        introMessage: customIntro,
      });

      if (direction === "interested") {
        setSwipeNotificationFeedback(`Sent collaboration invitation to ${current.name}!`);
        setTimeout(() => setSwipeNotificationFeedback(null), 2500);
      }
    } catch (err: any) {
      console.warn("Swipe recording error:", err);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setDeck((prev) => [last.item, ...prev]);
  };

  const handleResetPasses = async () => {
    try {
      await resetBrandPasses(brandId);
      loadDeck(selectedBriefId);
    } catch (e) {
      console.warn("Reset passes error:", e);
    }
  };

  // Keyboard controls (ArrowRight = interested, ArrowLeft = pass, z = undo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedCreator || showIntroModal) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("interested");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("pass");
      } else if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deck, history, expandedCreator, showIntroModal]);

  // Touch and Mouse drag event handlers
  const handleDragStart = (clientX: number, clientY: number) => {
    dragStartRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x > 110) {
      handleSwipe("interested");
    } else if (dragOffset.x < -110) {
      handleSwipe("pass");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    dragStartRef.current = null;
  };

  const selectedBrief = briefs.find((b) => b.id === selectedBriefId);

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "36px 0 80px", maxWidth: 640 }}>
        {/* Header and Controls Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>MATCH</span>
              <span className="pill purple">Swipe Matchmaking</span>
            </div>
            <h1 style={{ margin: "4px 0 2px", fontSize: 26, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
              Discovery Deck
            </h1>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/brand/matches" className="button small secondary">
              🤝 View Matches
            </Link>
            <button
              onClick={handleResetPasses}
              className="button small ghost"
              title="Reset passed candidates so they return to deck"
            >
              🔄 Reset Passes
            </button>
          </div>
        </div>

        {/* Campaign Brief Filter Selector */}
        <div
          className="surface"
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: "1.5px solid var(--line)",
            background: "#FFFFFF",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--muted)" }}>Campaign Brief:</span>
          <select
            value={selectedBriefId}
            onChange={(e) => {
              setSelectedBriefId(e.target.value);
              loadDeck(e.target.value);
            }}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--ink)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="">General Collaboration (All Campaigns)</option>
            {briefs.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.budget})
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Banner */}
        {swipeNotificationFeedback && (
          <div
            style={{
              padding: "10px 16px",
              background: "#E8F5E9",
              border: "1.5px solid #A5D6A7",
              color: "#2E7D32",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 13,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            ✓ {swipeNotificationFeedback}
          </div>
        )}

        {/* Swipe Card Deck Area */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
            Loading talent deck...
          </div>
        ) : !activeCard ? (
          <div
            className="surface"
            style={{
              textAlign: "center",
              padding: "60px 24px",
              borderRadius: 24,
              border: "2px dashed var(--line-strong)",
              background: "#FFFFFF",
            }}
          >
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>🎉</span>
            <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 900, color: "var(--ink)" }}>
              You've Reviewed All Candidates!
            </h3>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "var(--muted)", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
              Great job reviewing talent. You can reset your passes to reconsider candidates or review your confirmed matches.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={handleResetPasses} className="button">
                🔄 Reset Passes
              </button>
              <Link href="/brand/matches" className="button secondary">
                🤝 View Matches
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%", height: 560, userSelect: "none" }}>
            {/* Background card preview for 3D depth */}
            {deck[1] && (
              <div
                className="surface"
                style={{
                  position: "absolute",
                  top: 14,
                  left: 10,
                  right: 10,
                  bottom: -14,
                  borderRadius: 24,
                  background: "#F5F2EB",
                  border: "1.5px solid var(--line)",
                  zIndex: 1,
                  opacity: 0.6,
                }}
              />
            )}

            {/* Top Active Card */}
            <div
              className="surface"
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => isDragging && handleDragMove(e.clientX, e.clientY)}
              onMouseUp={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => isDragging && handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handleDragEnd}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 24,
                overflow: "hidden",
                border: "2px solid var(--line-strong)",
                boxShadow: "0 18px 45px rgba(50, 40, 70, 0.12)",
                background: "#FFFFFF",
                zIndex: 2,
                cursor: isDragging ? "grabbing" : "grab",
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.3}px, 0) rotate(${dragOffset.x * 0.07}deg)`,
                transition: isDragging ? "none" : "transform 0.25s ease",
              }}
            >
              {/* Swipe Overlays ("INTERESTED" / "PASS") */}
              {dragOffset.x > 40 && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    padding: "8px 16px",
                    borderRadius: 12,
                    border: "3px solid #00B894",
                    color: "#00B894",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "0.1em",
                    zIndex: 10,
                    transform: "rotate(12deg)",
                    background: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  INTERESTED
                </div>
              )}
              {dragOffset.x < -40 && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    left: 24,
                    padding: "8px 16px",
                    borderRadius: 12,
                    border: "3px solid #E74C3C",
                    color: "#E74C3C",
                    fontWeight: 900,
                    fontSize: 20,
                    letterSpacing: "0.1em",
                    zIndex: 10,
                    transform: "rotate(-12deg)",
                    background: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  PASS
                </div>
              )}

              {/* Creator Cover / Avatar Banner */}
              <div style={{ position: "relative", height: 260, background: "#EAE5DC", overflow: "hidden" }}>
                <img
                  src={activeCard.coverImage || activeCard.avatar}
                  alt={activeCard.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "rgba(255,255,255,0.92)",
                    borderRadius: 10,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--purple-primary)",
                    border: "1.5px solid var(--purple-line)",
                  }}
                >
                  Match: {activeCard.matchPercentage}% ({activeCard.tier})
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCreator(activeCard);
                  }}
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    background: "rgba(0,0,0,0.65)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 20,
                    padding: "6px 14px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Tap for Details ↗
                </button>
              </div>

              {/* Card Body Details */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <h3 style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 900, color: "var(--ink)" }}>
                      {activeCard.name}
                    </h3>
                    <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 700 }}>
                      {activeCard.handle} · {activeCard.roleTitle}
                    </span>
                  </div>
                  <strong style={{ fontSize: 17, color: "var(--purple-primary)" }}>
                    {activeCard.rate}
                  </strong>
                </div>

                <p style={{ margin: "8px 0 14px", fontSize: 13.5, lineHeight: 1.5, color: "var(--pencil)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {activeCard.bio}
                </p>

                {/* Badges */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {activeCard.genres?.slice(0, 3).map((g) => (
                    <span key={g} className="pill purple" style={{ fontSize: 11 }}>
                      {g}
                    </span>
                  ))}
                  {activeCard.tools?.slice(0, 3).map((t) => (
                    <span key={t} className="pill" style={{ fontSize: 11 }}>
                      ⚡ {t}
                    </span>
                  ))}
                </div>

                {/* Metrics Bar */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                    padding: "10px 0",
                    borderTop: "1.5px solid var(--line)",
                    textAlign: "center",
                    fontSize: 11.5,
                  }}
                >
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>Followers</span>
                    <strong style={{ fontSize: 15 }}>{activeCard.totalFollowers}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>Engagement</span>
                    <strong style={{ fontSize: 15, color: "var(--purple-primary)" }}>{activeCard.engagementRate}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>Availability</span>
                    <strong style={{ fontSize: 13, color: "#00B894" }}>{activeCard.commercialAvailability || "Immediate"}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls Toolbar */}
        {activeCard && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 24 }}>
            {/* UNDO BUTTON */}
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="button ghost"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                padding: 0,
                display: "grid",
                placeItems: "center",
                fontSize: 18,
                opacity: history.length > 0 ? 1 : 0.4,
              }}
              title="Undo last swipe"
            >
              ↺
            </button>

            {/* PASS BUTTON (X) */}
            <button
              onClick={() => handleSwipe("pass")}
              className="button secondary"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                padding: 0,
                display: "grid",
                placeItems: "center",
                fontSize: 26,
                color: "#E74C3C",
                borderColor: "#FFCDD2",
                boxShadow: "0 6px 18px rgba(231, 76, 60, 0.15)",
              }}
              title="Pass (Left Arrow)"
            >
              ✕
            </button>

            {/* CUSTOM INTRO / MESSAGE BEFORE RIGHT SWIPE */}
            <button
              onClick={() => {
                setShowIntroModal(activeCard);
                setIntroMsg(
                  `Hi ${activeCard.name}! We're loving your visual aesthetic and would love to collaborate${
                    selectedBrief ? ` on our '${selectedBrief.title}' campaign.` : "."
                  }`
                );
              }}
              className="button ghost"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                padding: 0,
                display: "grid",
                placeItems: "center",
                fontSize: 18,
              }}
              title="Add personalized intro message"
            >
              💬
            </button>

            {/* INTERESTED BUTTON (HEART) */}
            <button
              onClick={() => handleSwipe("interested")}
              className="button"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                padding: 0,
                display: "grid",
                placeItems: "center",
                fontSize: 26,
                background: "#00B894",
                borderColor: "#00B894",
                color: "#FFFFFF",
                boxShadow: "0 6px 18px rgba(0, 184, 148, 0.25)",
              }}
              title="Interested (Right Arrow)"
            >
              ♥
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
          Swipe gestures supported · Use <strong>← Left Arrow</strong> to pass, <strong>Right Arrow →</strong> to match
        </div>

        {/* FULL PROFILE MODAL EXPANSION */}
        {expandedCreator && (
          <div className="modal-backdrop" onClick={() => setExpandedCreator(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
                <img
                  src={expandedCreator.avatar}
                  alt={expandedCreator.name}
                  style={{ width: 64, height: 64, borderRadius: 18, objectFit: "cover" }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{expandedCreator.name}</h3>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{expandedCreator.handle} · {expandedCreator.roleTitle}</span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase" }}>Bio:</strong>
                <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>{expandedCreator.bio}</p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase" }}>Key Strengths:</strong>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                  {expandedCreator.strengths?.map((s) => (
                    <span key={s} className="pill" style={{ fontSize: 11 }}>★ {s}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 24 }}>
                <button onClick={() => setExpandedCreator(null)} className="button secondary" style={{ flex: 1 }}>
                  Close
                </button>
                <button
                  onClick={() => {
                    setExpandedCreator(null);
                    handleSwipe("interested");
                  }}
                  className="button"
                  style={{ flex: 1.5 }}
                >
                  ♥ Match with {expandedCreator.name}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM INTRO MESSAGE MODAL */}
        {showIntroModal && (
          <div className="modal-backdrop" onClick={() => setShowIntroModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>
                Send Custom Intro to {showIntroModal.name}
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--muted)" }}>
                This message will be delivered straight to their creator inbox.
              </p>

              <textarea
                rows={4}
                value={introMsg}
                onChange={(e) => setIntroMsg(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 12,
                  border: "1.5px solid var(--line)",
                  fontSize: 13,
                  fontFamily: "inherit",
                  outline: "none",
                  marginBottom: 16,
                }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={() => setShowIntroModal(null)} className="button secondary">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const c = showIntroModal;
                    setShowIntroModal(null);
                    handleSwipe("interested", introMsg);
                  }}
                  className="button"
                >
                  Send & Match ♥
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PublicLayout>
  );
}
