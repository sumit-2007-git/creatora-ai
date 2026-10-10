"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUser, setStoredUser, loginDemoBrand, loginDemoCreator } from "@/lib/firebase/auth";

interface DemoBannerProps {
  onStartTour?: () => void;
}

export function DemoBanner({ onStartTour }: DemoBannerProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);

    const dismissed = sessionStorage.getItem("demo_banner_dismissed");
    if (dismissed === "true") setIsDismissed(true);
  }, []);

  const handleSwitchRole = async (targetRole: "BRAND" | "CREATOR") => {
    if (targetRole === "BRAND") {
      const u = await loginDemoBrand();
      setCurrentUser(u);
      router.push("/discover");
    } else {
      const u = await loginDemoCreator();
      setCurrentUser(u);
      router.push("/dashboard/creator");
    }
  };

  const handleResetDemoData = async () => {
    try {
      setIsResetting(true);
      await fetch("/api/demo/reset", { method: "POST" });
      setResetSuccessMsg("✓ Demo database and swipe deck reset to pristine baseline state!");
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccessMsg("");
        window.location.reload();
      }, 1400);
    } catch {
      setShowResetModal(false);
    } finally {
      setIsResetting(false);
    }
  };

  if (isDismissed) {
    return (
      <button
        onClick={() => {
          setIsDismissed(false);
          sessionStorage.removeItem("demo_banner_dismissed");
        }}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 9999,
          background: "var(--ink)",
          color: "#FFFFFF",
          border: "none",
          borderRadius: 20,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 750,
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>🎮 Demo Controls</span>
      </button>
    );
  }

  const isBrand = currentUser?.role === "BRAND";

  return (
    <>
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "2.5px solid var(--ink)",
          padding: "8px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          fontSize: 12.5,
          position: "sticky",
          top: 0,
          zIndex: 999,
          boxShadow: "0 2px 6px rgba(42, 29, 58, 0.08)",
        }}
      >
        {/* Left: Demo state badge & Role Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>🎮</span>
            <strong style={{ color: "var(--ink)", fontWeight: 900 }}>DEMO MODE:</strong>
            <span className={`pill ${isBrand ? "purple" : "yellow"}`} style={{ fontSize: 11, padding: "2px 8px" }}>
              {isBrand ? "🏢 Brand (Solace Studio)" : "🎨 Creator (Aarav Sharma)"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => handleSwitchRole(isBrand ? "CREATOR" : "BRAND")}
              className="button ghost small"
              style={{
                fontSize: 11,
                padding: "3px 10px",
                border: "1px solid var(--line-strong)",
                background: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Switch to {isBrand ? "Creator View 🎨" : "Brand View 🏢"}
            </button>
          </div>
        </div>

        {/* Right: Quick actions (Tour, Judges Script, Reset, Dismiss) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="button small"
              style={{
                fontSize: 11.5,
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>🎬 90s Guided Tour</span>
            </button>
          )}

          <Link
            href="/demo"
            className="button small secondary"
            style={{
              fontSize: 11.5,
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span>📋 Judges Script</span>
          </Link>

          <button
            onClick={() => setShowResetModal(true)}
            className="button ghost small"
            style={{
              fontSize: 11.5,
              padding: "4px 10px",
              color: "var(--muted)",
              cursor: "pointer",
            }}
            title="Reset marketplace demo data"
          >
            🔄 Reset Demo Data
          </button>

          <button
            onClick={() => {
              setIsDismissed(true);
              sessionStorage.setItem("demo_banner_dismissed", "true");
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: 14,
              cursor: "pointer",
              padding: "2px 6px",
            }}
            title="Minimize demo banner"
          >
            ✕
          </button>
        </div>
      </div>

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(31, 27, 44, 0.6)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            zIndex: 10000,
            padding: 20,
          }}
        >
          <div className="surface" style={{ width: "min(460px, 100%)", padding: 28, borderRadius: 22, textAlign: "center" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>🔄</span>
            <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 800 }}>Reset Demo Dataset?</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--pencil)", lineHeight: 1.5 }}>
              This will restore all 30+ creators, reset swipe history, restore verified proof claims, and refresh sample briefs back to the judge baseline.
            </p>

            {resetSuccessMsg ? (
              <div style={{ padding: 14, background: "#E8F5E9", color: "#2E7D32", borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
                {resetSuccessMsg}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="button ghost"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isResetting}
                  onClick={handleResetDemoData}
                  className="button"
                >
                  {isResetting ? "Resetting..." : "Confirm Reset 🚀"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
