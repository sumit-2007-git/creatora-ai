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
    bg: "rgba(46, 125, 50, 0.12)",
    color: "#2E7D32",
    border: "#A5D6A7",
    tooltip:
      "Proof-Backed: The creator uploaded verifiable workspace project files, node trees, or timelapses verified by Gemini Vision (confidence ≥ 70%).",
  },
  "link-checked": {
    label: "Link-Checked",
    icon: "🔗",
    bg: "rgba(33, 150, 243, 0.12)",
    color: "#1976D2",
    border: "#90CAF9",
    tooltip:
      "Link-Checked: The post URL was fetched by our SSRF-safe backend gateway, confirming title, platform, and published media match the claim.",
  },
  "self-reported": {
    label: "Self-Reported",
    icon: "✎",
    bg: "rgba(116, 111, 130, 0.1)",
    color: "var(--pencil)",
    border: "var(--line)",
    tooltip:
      "Self-Reported: Creator-stated technical claim and metrics. Not yet verified via external proof screenshot or live link check.",
  },
  "needs-proof": {
    label: "Needs Proof",
    icon: "⚠️",
    bg: "rgba(255, 179, 0, 0.14)",
    color: "#E65100",
    border: "#FFE082",
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
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: isSmall ? 4 : 6,
          padding: isSmall ? "2px 7px" : "4px 10px",
          borderRadius: 8,
          fontSize: isSmall ? 10.5 : 12,
          fontWeight: 800,
          background: cfg.bg,
          color: cfg.color,
          border: `1px solid ${cfg.border}`,
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
            background: "#1F1B2C",
            color: "#FFFFFF",
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 11,
            lineHeight: 1.45,
            width: "max-content",
            maxWidth: 260,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 1000,
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          {cfg.tooltip}
        </div>
      )}
    </div>
  );
}
