"use client";

import Link from "next/link";
import { useState } from "react";
import { Creator } from "@/types/creator";
import { toggleSaveCreator } from "@/lib/api/creators";

interface CreatorCardProps {
  creator: Creator;
  onContactClick?: (creator: Creator) => void;
}

export function CreatorCard({ creator, onContactClick }: CreatorCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [saving, setSaving] = useState(false);

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num.toString();
  };

  const formatViews = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num.toString();
  };

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSaving(true);
    const newStatus = !bookmarked;
    setBookmarked(newStatus);
    try {
      await toggleSaveCreator(creator.creatorId || creator.uid);
    } catch {
      // Local optimistic fallback
    } finally {
      setSaving(false);
    }
  };

  return (
    <article
      className="surface surface-hover"
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1.5px solid var(--line)",
        borderRadius: 22,
        background: "#FFFFFF",
      }}
    >
      {/* Cover / Scenery banner */}
      <div style={{ position: "relative", height: 140, overflow: "hidden", background: "var(--surface-soft)" }}>
        <img
          src={creator.coverImage || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"}
          alt={creator.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <button
            onClick={handleBookmarkToggle}
            disabled={saving}
            className="pill"
            style={{
              padding: "6px 8px",
              cursor: "pointer",
              background: bookmarked ? "var(--purple-soft)" : "rgba(255,255,255,0.9)",
              color: bookmarked ? "var(--purple-primary)" : "var(--muted)",
              borderColor: bookmarked ? "var(--purple-line)" : "var(--line)"
            }}
            title={bookmarked ? "Saved in bookmarks" : "Save Creator"}
          >
            {bookmarked ? "★" : "☆"}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "0 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Avatar with verified badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: -28, marginBottom: 10 }}>
          <div style={{ position: "relative" }}>
            <img
              src={creator.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={creator.name}
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                border: "3px solid #FFFFFF",
                objectFit: "cover",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                background: "#FAF7F2"
              }}
            />
            {creator.verified && (
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 18,
                  height: 18,
                  background: "#4C6EF5",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 10,
                  fontWeight: 900,
                  border: "2px solid #FFFFFF"
                }}
                title="Verified AI Creator"
              >
                ✓
              </span>
            )}
          </div>

          {/* Categories tag */}
          <div style={{ display: "flex", gap: 5 }}>
            {creator.genres?.slice(0, 2).map((g) => (
              <span key={g} className="pill purple" style={{ fontSize: 10, padding: "3px 8px" }}>
                {g}
              </span>
            ))}
            {creator.genres && creator.genres.length > 2 && (
              <span className="pill" style={{ fontSize: 10, padding: "3px 6px" }}>
                +{creator.genres.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Creator Name & Title */}
        <Link href={`/creators/${creator.creatorId || creator.uid}`}>
          <h3
            style={{
              margin: "4px 0 2px",
              fontSize: 17,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em"
            }}
          >
            {creator.name}
          </h3>
        </Link>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, marginBottom: 12 }}>
          {creator.roleTitle || "AI Visual Creator"}
        </span>

        {/* Stats Row with Self-Reported label */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            padding: "8px 0 6px",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            margin: "4px 0 6px",
            textAlign: "center",
          }}
        >
          <div>
            <strong style={{ display: "block", fontSize: 14, fontWeight: 800, color: "var(--ink)" }}>
              {formatFollowers(creator.totalFollowers)}
            </strong>
            <span style={{ display: "block", fontSize: 9.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>
              Followers
            </span>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: 14, fontWeight: 800, color: "var(--ink)" }}>
              {formatViews(creator.monthlyViews)}
            </strong>
            <span style={{ display: "block", fontSize: 9.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>
              Monthly Views
            </span>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: 14, fontWeight: 800, color: "var(--purple-primary)" }}>
              {creator.engagementRate}%
            </strong>
            <span style={{ display: "block", fontSize: 9.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>
              Engagement
            </span>
          </div>
        </div>

        {/* Self-reported indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            {creator.isSelfReported !== false ? "✎ Self-Reported Metrics" : "✓ Verified Metrics"}
          </span>
          {creator.commercialAvailability && (
            <span style={{ fontSize: 9.5, color: "#00B894", fontWeight: 700 }}>
              ● {creator.commercialAvailability}
            </span>
          )}
        </div>

        {/* Tools badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto", paddingTop: 4 }}>
          {creator.tools?.slice(0, 4).map((tool) => (
            <span
              key={tool}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#524B66",
                background: "var(--surface-soft)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "2px 7px"
              }}
            >
              ⚡ {tool}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Rate: <strong style={{ color: "var(--ink)" }}>{creator.rate || "$1,200"}</strong></span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link
              href={`/creators/${creator.creatorId || creator.uid}`}
              className="text-link"
              style={{ fontSize: 12, fontWeight: 700, color: "var(--purple-primary)" }}
            >
              Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
