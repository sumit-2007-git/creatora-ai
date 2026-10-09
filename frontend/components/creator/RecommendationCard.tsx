"use client";

import Link from "next/link";
import { useState } from "react";
import { CreatorRecommendation } from "@/types/recommendation";

interface RecommendationCardProps {
  recommendation: CreatorRecommendation;
  onContactClick?: (creatorId: string) => void;
}

export function RecommendationCard({ recommendation, onContactClick }: RecommendationCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const score = recommendation.matchPercentage;
  const tier = recommendation.tier || (score >= 85 ? "Top Match" : score >= 65 ? "Relevant" : score >= 45 ? "Moderate" : "Weak");
  
  const getTierColor = (t: string) => {
    switch (t) {
      case "Top Match":
        return { bg: "#E3FAF2", text: "#0CA678", border: "#B2F2BB" };
      case "Relevant":
        return { bg: "var(--purple-soft)", text: "var(--purple-primary)", border: "var(--purple-line)" };
      case "Moderate":
        return { bg: "#FFF4E6", text: "#F76707", border: "#FFE8CC" };
      default:
        return { bg: "#F1F3F5", text: "#868E96", border: "#CED4DA" };
    }
  };

  const tierStyle = getTierColor(tier);
  const bd = recommendation.weightedBreakdown || {
    genreMatch: Math.round(score * 0.3),
    toolMatch: Math.round(score * 0.25),
    platformMatch: Math.round(score * 0.2),
    audienceMatch: Math.round(score * 0.15),
    budgetMatch: Math.round(score * 0.1),
  };

  return (
    <article
      className="surface surface-hover"
      style={{
        padding: "16px 18px",
        borderRadius: 20,
        border: "1.5px solid var(--line)",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Link href={`/creators/${recommendation.creatorId}`}>
          <img
            src={recommendation.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={recommendation.name}
            style={{ width: 62, height: 62, borderRadius: 16, objectFit: "cover", border: "2px solid #FAF7F2" }}
          />
        </Link>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Link href={`/creators/${recommendation.creatorId}`}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                  {recommendation.name}
                </h3>
              </Link>
              <p style={{ margin: "2px 0 6px", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                {recommendation.roleTitle}
              </p>
            </div>

            {/* Score Pill & Tier */}
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 900,
                  background: tierStyle.bg,
                  color: tierStyle.text,
                  border: `1.5px solid ${tierStyle.border}`,
                }}
              >
                {score}% Match
              </div>
              <span style={{ display: "block", fontSize: 9.5, fontWeight: 700, color: tierStyle.text, textTransform: "uppercase", marginTop: 2 }}>
                {tier}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
            <span>👥 {recommendation.totalFollowers} followers</span>
            <span>⚡ {recommendation.engagementRate} eng</span>
            {recommendation.rate && <span>💰 {recommendation.rate}</span>}
          </div>
        </div>
      </div>

      {/* "Why this creator matches" Gemini Explanation */}
      <div
        style={{
          background: "var(--surface-soft)",
          borderLeft: `3px solid ${tierStyle.text}`,
          padding: "9px 12px",
          borderRadius: "0 10px 10px 0",
          fontSize: 12,
          lineHeight: 1.45,
          color: "var(--ink)",
        }}
      >
        <span style={{ fontWeight: 800, color: tierStyle.text, display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
          ✧ Why this creator matches
        </span>
        {recommendation.matchRationale}
      </div>

      {/* Transparent Weighted Breakdown Toggle */}
      <div>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-link"
          style={{
            fontSize: 11,
            fontWeight: 700,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: "var(--purple-primary)",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          {showBreakdown ? "Hide weighted score breakdown ▲" : "View transparent score breakdown (100 pts) ▼"}
        </button>

        {showBreakdown && (
          <div
            style={{
              marginTop: 8,
              padding: 10,
              borderRadius: 12,
              background: "#FAF7F2",
              border: "1px dashed var(--line)",
              fontSize: 11,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Genre / Aesthetic (30%):</span>
                <strong>{bd.genreMatch} / 30</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Tools & Skills (25%):</span>
                <strong>{bd.toolMatch} / 25</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Format & Platform (20%):</span>
                <strong>{bd.platformMatch} / 20</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Audience / Eng (15%):</span>
                <strong>{bd.audienceMatch} / 15</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Budget & Availability (10%):</span>
                <strong>{bd.budgetMatch} / 10</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--purple-primary)" }}>
                <strong>Total Computed:</strong>
                <strong>{score} / 100</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Tags & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, borderTop: "1px solid var(--line)", marginTop: "auto" }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {recommendation.genres?.slice(0, 2).map((g) => (
            <span key={g} className="pill" style={{ fontSize: 9.5, padding: "2px 7px" }}>{g}</span>
          ))}
          {recommendation.tools?.slice(0, 2).map((t) => (
            <span key={t} style={{ fontSize: 9.5, padding: "2px 6px", background: "var(--surface-soft)", borderRadius: 6, color: "#524B66", fontWeight: 600 }}>⚡ {t}</span>
          ))}
        </div>

        <Link
          href={`/creators/${recommendation.creatorId}`}
          className="button secondary small"
          style={{ fontSize: 11, padding: "5px 12px" }}
        >
          View Profile →
        </Link>
      </div>
    </article>
  );
}
