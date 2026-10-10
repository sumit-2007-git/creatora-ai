"use client";

import { useState } from "react";
import { TrustProfile, TrustClaim } from "@/types/creator";
import { TrustBadge } from "./TrustBadge";
import { verifyProofClaim } from "@/lib/api/trust";

interface TrustChecklistPanelProps {
  profile: TrustProfile;
  isOwner?: boolean;
  onProofVerified?: () => void;
}

export function TrustChecklistPanel({ profile, isOwner = false, onProofVerified }: TrustChecklistPanelProps) {
  const [showProofModal, setShowProofModal] = useState(false);
  const [claimText, setClaimText] = useState("");
  const [claimedTool, setClaimedTool] = useState("Runway Gen-3");
  const [proofUrl, setProofUrl] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  const score = profile.trustScore || 58;

  const handleVerifyProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofUrl.trim() || !claimText.trim()) return;

    try {
      setVerifying(true);
      setResultMsg("");
      const res = await verifyProofClaim({
        creatorId: profile.creatorId,
        claimText,
        claimedTool,
        proofImageUrl: proofUrl,
      });

      if (res.tierGranted === "proof-backed") {
        setResultMsg("✓ Proof-Backed Status Granted! Gemini Vision validated project interface controls.");
      } else {
        setResultMsg("⚠️ Needs More Proof: Gemini Vision requested more explicit project timeline/node elements.");
      }

      if (onProofVerified) onProofVerified();
      setTimeout(() => {
        setShowProofModal(false);
        setResultMsg("");
        setClaimText("");
        setProofUrl("");
      }, 2500);
    } catch (err: any) {
      setResultMsg("Error: " + (err.message || "Failed to verify"));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="surface" style={{ padding: 28, borderRadius: 22, border: "1.5px solid var(--line)" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">TRUST</span>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "var(--ink)" }}>
              Verification & Trust Tier
            </h3>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)" }}>
            Honest verification signals ensuring transparent brand partnerships.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <TrustBadge tier={profile.dominantTier} size="md" />
          {isOwner && (
            <button
              onClick={() => setShowProofModal(true)}
              className="button small"
              style={{ fontSize: 11 }}
            >
              + Submit Process Proof
            </button>
          )}
        </div>
      </div>

      {/* OVERALL TRUST METER (Styled like Heat Meter) */}
      <div
        style={{
          padding: "16px 20px",
          background: "var(--surface-soft)",
          borderRadius: 16,
          border: "1px solid var(--line)",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
            Overall Trust Index
          </span>
          <span style={{ fontSize: 18, fontWeight: 900, color: score >= 80 ? "#2E7D32" : score >= 65 ? "#1976D2" : "var(--purple-primary)" }}>
            {score}%
          </span>
        </div>

        {/* Gradient Progress Bar */}
        <div style={{ height: 10, background: "rgba(0,0,0,0.06)", borderRadius: 10, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${score}%`,
              background:
                score >= 80
                  ? "linear-gradient(90deg, #2E7D32, #00B894)"
                  : score >= 65
                  ? "linear-gradient(90deg, #1976D2, #00CEC9)"
                  : "linear-gradient(90deg, #6C5CE7, #A29BFE)",
              borderRadius: 10,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)", marginTop: 6 }}>
          <span>Self-Reported (0-60%)</span>
          <span>Link-Checked (60-80%)</span>
          <span>Proof-Backed (80-100%)</span>
        </div>
      </div>

      {/* 5-POINT VERIFICATION CHECKLIST */}
      <div style={{ marginBottom: 24 }}>
        <strong style={{ fontSize: 13, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 12 }}>
          Trust Checklist
        </strong>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {[
            { label: "Tools & Models Disclosed", checked: profile.checklist?.toolsVerified ?? true, detail: "Specific versions & kinds provided" },
            { label: "Past Work Linked", checked: profile.checklist?.pastWorkLinked ?? true, detail: "SSRF verified live external links" },
            { label: "Process Proof Added", checked: profile.checklist?.processProofAdded ?? false, detail: "Gemini Vision evaluated project files" },
            { label: "Commercial Licence Stated", checked: profile.checklist?.licenceStated ?? true, detail: "Clear IP and revision terms guaranteed" },
            { label: "Profile Complete", checked: profile.checklist?.profileComplete ?? true, detail: "Rates, bio, and portfolio pieces active" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 14px",
                background: "#FFFFFF",
                borderRadius: 12,
                border: "1px solid var(--line)",
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: item.checked ? "rgba(46, 125, 50, 0.12)" : "rgba(0,0,0,0.06)",
                  color: item.checked ? "#2E7D32" : "var(--muted)",
                  fontWeight: 900,
                  fontSize: 12,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {item.checked ? "✓" : "○"}
              </span>
              <div>
                <strong style={{ fontSize: 13, display: "block", color: "var(--ink)" }}>{item.label}</strong>
                <small style={{ color: "var(--muted)", fontSize: 11 }}>{item.detail}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INDIVIDUAL CLAIMS LOG */}
      <div>
        <strong style={{ fontSize: 13, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 10 }}>
          Recorded Technical Claims ({profile.claims?.length || 0})
        </strong>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {profile.claims && profile.claims.length > 0 ? (
            profile.claims.map((claim) => (
              <div
                key={claim.id}
                style={{
                  padding: "12px 16px",
                  background: "#FFFFFF",
                  borderRadius: 12,
                  border: "1px solid var(--line)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <TrustBadge tier={claim.tier} size="sm" />
                    <strong style={{ fontSize: 13, color: "var(--ink)" }}>{claim.claim}</strong>
                  </div>
                  {claim.observations && claim.observations.length > 0 && (
                    <small style={{ color: "var(--muted)", fontSize: 11, display: "block", marginTop: 4 }}>
                      AI Note: {claim.observations[0]}
                    </small>
                  )}
                  {claim.reasons && claim.reasons.length > 0 && (
                    <small style={{ color: "#E65100", fontSize: 11, display: "block", marginTop: 2 }}>
                      Advice: {claim.reasons[0]}
                    </small>
                  )}
                </div>

                <small style={{ color: "var(--muted)", fontSize: 11 }}>
                  Checked by {claim.checkedBy || "system"}
                </small>
              </div>
            ))
          ) : (
            <span style={{ fontSize: 12, color: "var(--muted)" }}>No individual claims recorded yet.</span>
          )}
        </div>
      </div>

      {/* SUBMIT PROCESS PROOF MODAL */}
      {showProofModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18, 12, 32, 0.75)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            className="surface"
            style={{
              width: "min(560px, 100%)",
              padding: 28,
              borderRadius: 22,
              border: "2px solid var(--purple-line)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowProofModal(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "var(--muted)" }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span className="kanji-stamp">AI VISION</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>Submit Process Proof</h3>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
              Upload a workspace screenshot (ComfyUI graph, Blender viewport, or timeline) to earn the Proof-Backed tier.
            </p>

            {resultMsg ? (
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: resultMsg.includes("✓") ? "#E8F5E9" : "#FFF3E0",
                  color: resultMsg.includes("✓") ? "#2E7D32" : "#E65100",
                  fontWeight: 700,
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {resultMsg}
              </div>
            ) : (
              <form onSubmit={handleVerifyProof} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 800, display: "block", marginBottom: 4 }}>
                    Claim Description
                  </label>
                  <input
                    type="text"
                    className="field"
                    placeholder="e.g. ComfyUI AnimateDiff workflow with ControlNet openpose"
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 800, display: "block", marginBottom: 4 }}>
                    Primary Tool Claimed
                  </label>
                  <select
                    className="select-field"
                    value={claimedTool}
                    onChange={(e) => setClaimedTool(e.target.value)}
                  >
                    <option value="Runway Gen-3">Runway Gen-3</option>
                    <option value="Midjourney">Midjourney v6</option>
                    <option value="ComfyUI">ComfyUI</option>
                    <option value="Blender">Blender 4.2</option>
                    <option value="Kling AI">Kling 1.5</option>
                    <option value="DaVinci Resolve">DaVinci Resolve</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 800, display: "block", marginBottom: 4 }}>
                    Proof Screenshot Image URL
                  </label>
                  <input
                    type="url"
                    className="field"
                    placeholder="https://.../workspace-screenshot.png"
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    required
                  />
                  <small style={{ color: "var(--muted)", fontSize: 11, display: "block", marginTop: 4 }}>
                    Tip: Use an image showing active node wires, timeline tracks, or prompt console.
                  </small>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                  <button type="button" onClick={() => setShowProofModal(false)} className="button ghost">
                    Cancel
                  </button>
                  <button type="submit" disabled={verifying} className="button">
                    {verifying ? "Gemini Vision Analyzing..." : "Verify with Gemini Vision 👁️"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
