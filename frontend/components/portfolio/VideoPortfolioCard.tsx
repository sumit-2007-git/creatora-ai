"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { PortfolioItem } from "@/types/portfolio";

interface VideoPortfolioCardProps {
  item: PortfolioItem;
  onOpenPreview: (item: PortfolioItem) => void;
}

export function VideoPortfolioCard({ item, onOpenPreview }: VideoPortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenPreview(item);
    }
  };

  const hasVideo = Boolean(item.videoUrl && !videoError);
  const workflow = item.workflow;

  return (
    <article
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flip-card surface-hover ${isFlipped ? "is-flipped" : ""}`}
      style={{
        height: 380,
        borderRadius: "20px 24px 18px 22px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div className="flip-card-inner">
        {/* ================= FRONT FACE ================= */}
        <div
          className="flip-card-front surface"
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2.5px solid var(--ink)",
            borderRadius: "20px 24px 18px 22px",
            background: "var(--surface)",
            boxShadow: "var(--shadow-comic)",
            overflow: "hidden",
          }}
        >
          {/* Media Window */}
          <div
            onClick={() => onOpenPreview(item)}
            style={{
              position: "relative",
              height: 200,
              background: "#161026",
              overflow: "hidden",
            }}
          >
            {hasVideo ? (
              <video
                ref={videoRef}
                src={item.videoUrl}
                poster={item.thumbnailUrl || item.mediaUrl}
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                className="sketch-to-color"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <img
                src={item.thumbnailUrl || item.mediaUrl}
                alt={item.title}
                className="sketch-to-color"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}

            {/* Content Type Badge */}
            <span
              className="pill yellow"
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontSize: 10.5,
                fontWeight: 900,
                padding: "3px 8px",
              }}
            >
              {item.genre ? `${item.genre} · ` : ""}{item.contentType || "AI Video"}
            </span>

            {/* Tap to Flip button for mobile / keyboard */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
              className="pill"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 10,
                padding: "3px 7px",
                background: "var(--paper2)",
                color: "var(--ink)",
                cursor: "pointer",
                zIndex: 5,
              }}
              title="Flip to see how it was made"
              aria-label="Flip card for workflow details"
            >
              🔄 How it was made
            </button>

            {/* Play Button Overlay */}
            {!isHovered && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(0, 0, 0, 0.2)",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--paper2)",
                    border: "2px solid var(--ink)",
                    boxShadow: "2px 2px 0 var(--ink)",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--pink)",
                    fontSize: 16,
                    paddingLeft: 3,
                  }}
                >
                  ▶
                </div>
              </div>
            )}
          </div>

          {/* Card Info */}
          <div
            onClick={() => onOpenPreview(item)}
            style={{
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 16,
                  fontWeight: 900,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 12.5,
                  color: "var(--muted)",
                  lineHeight: 1.45,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>
            </div>

            <div>
              {/* Tool tags */}
              {item.toolsUsed && item.toolsUsed.length > 0 && (
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                  {item.toolsUsed.slice(0, 2).map((tool) => (
                    <span
                      key={tool}
                      className="pill purple"
                      style={{ fontSize: 9.5, padding: "2px 6px" }}
                    >
                      ⚡ {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Stats & Action */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 11,
                  color: "var(--muted)",
                  borderTop: "1.5px solid var(--ink)",
                  paddingTop: 8,
                }}
              >
                <span>👁 {item.views}</span>
                <span>❤️ {item.likes}</span>
                <span className="underline-draw" style={{ color: "var(--pink)", fontWeight: 900 }}>
                  Inspect Pipeline →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE: HOW IT WAS MADE ================= */}
        <div
          className="flip-card-back"
          style={{
            border: "2.5px solid var(--ink)",
            borderRadius: "20px 24px 18px 22px",
            background: "var(--paper2)",
            boxShadow: "var(--shadow-comic)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="kanji-stamp" style={{ fontSize: 9 }}>PIPELINE</span>
                <strong style={{ fontSize: 14, color: "var(--ink)", fontWeight: 900 }}>
                  How It Was Made
                </strong>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="pill"
                style={{ fontSize: 10, padding: "2px 6px", cursor: "pointer" }}
                aria-label="Flip back to front face"
              >
                ✕ Front
              </button>
            </div>

            {/* Total Time & Step Count */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <span className="pill yellow" style={{ fontSize: 10 }}>
                ⏱️ {workflow?.totalHours || 6}h Total
              </span>
              <span className="pill cyan" style={{ fontSize: 10 }}>
                📑 {workflow?.steps?.length || item.toolsUsed?.length || 3} Steps
              </span>
            </div>

            {/* Tools Disclosed */}
            <strong style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>
              Tools in Stack:
            </strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
              {(workflow?.tools || item.toolsUsed || []).map((t: any) => {
                const name = typeof t === "string" ? t : t.name;
                return (
                  <span
                    key={name}
                    className="pill"
                    style={{ fontSize: 10, padding: "2px 6px" }}
                  >
                    🤖 {name}
                  </span>
                );
              })}
            </div>

            {/* Prompt Transparency */}
            <div
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: "var(--surface-soft)",
                border: "1px dashed var(--ink)",
                fontSize: 11,
                color: "var(--ink)",
                lineHeight: 1.4,
              }}
            >
              <span style={{ fontWeight: 800, display: "block", marginBottom: 2 }}>
                Prompt Visibility:
              </span>
              {workflow?.promptVisibility === "public" ? "🌐 Public generation prompt available in full viewer." : "🔒 Private prompt (creator commercial IP)."}
            </div>
          </div>

          {/* Full Viewer Trigger Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPreview(item);
            }}
            className="button small"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Launch Full-Screen Viewer 🎬
          </button>
        </div>
      </div>
    </article>
  );
}
