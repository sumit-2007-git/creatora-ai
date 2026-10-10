"use client";

import { useState } from "react";
import { TrustTier } from "@/types/creator";

interface TrustBadgeProps {
  tier?: TrustTier | string;
  size?: "sm" | "md";
  showTooltip?: boolean;
}

const TIER_CONFIG: Record<
  string,
  { label: string; icon: string; bg: string; color: string; border: string; tooltip: string }
> = {
  "proof-backed": {
    label: "Proof-Backed",
    icon: "🛡️",
    bg: "var(--mint)",
    color: "var(--ink)",
    border: "var(--ink)",
    tooltip:
      "Proof-Backed: The creator uploaded verifiable workspace project files, node trees, or timelapses verified by Gemini Vision (confidence ≥ 70%).",
  },
  "link-checked": {
    label: "Link-Checked",
    icon: "🔗",
    bg: "var(--cyan)",
    color: "var(--ink)",
    border: "var(--ink)",
    tooltip:
      "Link-Checked: The post URL was fetched by our SSRF-safe backend gateway, confirming title, platform, and published media match the claim.",
  },
  "self-reported": {
    label: "Self-Reported",
    icon: "✎",
    bg: "var(--yellow)",
    color: "var(--ink)",
    border: "var(--ink)",
    tooltip:
      "Self-Reported: Creator-stated technical claim and metrics. Not yet verified via external proof screenshot or live link check.",
  },
  "needs-proof": {
    label: "Needs Proof",
    icon: "⚠️",
    bg: "var(--orange)",
    color: "var(--ink)",
    border: "var(--ink)",
    tooltip:
      "Needs More Proof: The uploaded proof was evaluated by Gemini Vision but did not show sufficient interface controls or working project files.",
  },
};

export function TrustBadge({ tier = "self-reported", size = "sm", showTooltip = true }: TrustBadgeProps) {
  const [hovered, setHovered] = useState(false);
  const normalized = (tier || "self-reported").toLowerCase();
  const cfg = TIER_CONFIG[normalized] || TIER_CONFIG["self-reported"];

  const isSmall = size === "sm";

  return (
    <div
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="pill"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: isSmall ? 4 : 6,
          padding: isSmall ? "3px 8px" : "5px 12px",
          borderRadius: 999,
          fontSize: isSmall ? 10.5 : 12,
          fontWeight: 900,
          background: cfg.bg,
          color: cfg.color,
          border: `2px solid ${cfg.border}`,
          boxShadow: "2px 2px 0 var(--ink)",
          letterSpacing: "0.02em",
          cursor: "help",
          userSelect: "none",
        }}
      >
        <span>{cfg.icon}</span>
        <span>{cfg.label}</span>
      </span>

      {/* Honest verification tooltip */}
      {showTooltip && hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--paper2)",
            color: "var(--ink)",
            border: "2px solid var(--ink)",
            boxShadow: "4px 4px 0 var(--ink)",
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 11,
            lineHeight: 1.45,
            width: "max-content",
            maxWidth: 260,
            zIndex: 1000,
            pointerEvents: "none",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {cfg.tooltip}
        </div>
      )}
    </div>
  );
}
