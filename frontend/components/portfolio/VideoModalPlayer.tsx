"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio";

interface VideoModalPlayerProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function VideoModalPlayer({ item, onClose }: VideoModalPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const videoSrc = item.videoUrl || item.mediaUrl;
  const isVideo = item.mediaType?.toLowerCase() === "video" || Boolean(item.videoUrl);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18, 12, 32, 0.88)",
        backdropFilter: "blur(10px)",
        display: "grid",
        placeItems: "center",
        zIndex: 10000,
        padding: 20,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(880px, 100%)",
          maxHeight: "92vh",
          background: "#FAF7F2",
          borderRadius: 24,
          overflow: "hidden",
          border: "2px solid var(--purple-line)",
          boxShadow: "0 28px 72px rgba(18, 12, 32, 0.6)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video player"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "rgba(22, 16, 38, 0.75)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            fontSize: 16,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            zIndex: 20,
            backdropFilter: "blur(6px)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✕
        </button>

        {/* Video Player Frame */}
        <div
          style={{
            position: "relative",
            background: "#0A0612",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: 520,
          }}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={item.thumbnailUrl || item.mediaUrl}
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                maxHeight: 520,
                objectFit: "contain",
                background: "#000",
                display: "block",
              }}
            />
          ) : (
            <img
              src={item.mediaUrl}
              alt={item.title}
              style={{
                width: "100%",
                maxHeight: 520,
                objectFit: "contain",
                background: "#000",
                display: "block",
              }}
            />
          )}
        </div>

        {/* Video Info Section */}
        <div style={{ padding: "24px 30px", overflowY: "auto" }}>
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="kanji-stamp" style={{ fontSize: 10, padding: "2px 6px" }}>FILM</span>
                <span className="pill purple" style={{ fontSize: 11, fontWeight: 800 }}>
                  {item.genre ? `${item.genre} · ` : ""}{item.contentType || "AI Commercial"}
                </span>
                <span className="pill" style={{ fontSize: 11, color: "#00B894", borderColor: "#A5D6A7", background: "#E8F5E9", fontWeight: 700 }}>
                  ● 4K Master Rendered
                </span>
              </div>
              <h2 style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
                {item.title}
              </h2>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                href={`/creators/${item.creatorId}`}
                onClick={onClose}
                className="button secondary small"
                style={{ fontSize: 12.5 }}
              >
                👤 Creator Profile
              </Link>
              <Link
                href={`/briefs/create?title=${encodeURIComponent(item.title)}`}
                onClick={onClose}
                className="button small"
                style={{ fontSize: 12.5 }}
              >
                💼 Commission Similar Brief →
              </Link>
            </div>
          </div>

          <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--pencil)", lineHeight: 1.6 }}>
            {item.description}
          </p>

          {/* Metadata Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
              paddingTop: 14,
              borderTop: "1.5px solid var(--line)",
            }}
          >
            {/* Tools Stack */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                AI Models Used:
              </span>
              {item.toolsUsed?.map((t) => (
                <span key={t} className="pill" style={{ fontSize: 11, padding: "3px 8px", background: "rgba(124, 92, 252, 0.08)", color: "var(--purple-primary)" }}>
                  ✦ {t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: "var(--muted)", fontWeight: 600 }}>
              <span>👁 {item.views} Views</span>
              <span>❤️ {item.likes} Likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
