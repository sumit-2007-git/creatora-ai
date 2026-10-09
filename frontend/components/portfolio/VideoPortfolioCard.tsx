"use client";

import { useState, useRef } from "react";
import { PortfolioItem } from "@/types/portfolio";

interface VideoPortfolioCardProps {
  item: PortfolioItem;
  onOpenPreview: (item: PortfolioItem) => void;
}

export function VideoPortfolioCard({ item, onOpenPreview }: VideoPortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay restrictions handle gracefully
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const hasVideo = Boolean(item.videoUrl && !videoError);

  return (
    <article
      onClick={() => onOpenPreview(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="surface surface-hover"
      style={{
        overflow: "hidden",
        borderRadius: 20,
        cursor: "pointer",
        border: "1.5px solid var(--line)",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Media Window */}
      <div
        style={{
          position: "relative",
          height: 210,
          background: "#161026",
          overflow: "hidden",
        }}
      >
        {/* Real Video Player on Hover / Preview */}
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={item.videoUrl}
              poster={item.thumbnailUrl || item.mediaUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "opacity 0.25s ease",
                opacity: isHovered ? 1 : 0.88,
              }}
            />
            {/* Live Playing Tag */}
            {isHovered && (
              <span
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  background: "rgba(124, 92, 252, 0.9)",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "3px 8px",
                  borderRadius: 6,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                ● Playing Preview
              </span>
            )}
          </>
        ) : (
          <img
            src={item.thumbnailUrl || item.mediaUrl}
            alt={item.title}
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
          className="pill"
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(255, 255, 255, 0.92)",
            fontSize: 10.5,
            fontWeight: 800,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        >
          {item.genre ? `${item.genre} · ` : ""}{item.contentType || "AI Video"}
        </span>

        {/* Central Play Button Overlay */}
        {!isHovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "rgba(0, 0, 0, 0.22)",
              transition: "opacity 0.2s ease",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: "rgba(255, 255, 255, 0.92)",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                color: "var(--purple-primary)",
                fontSize: 18,
                paddingLeft: 3,
                transition: "transform 0.2s ease",
              }}
            >
              ▶
            </div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <h3
            style={{
              margin: "0 0 6px",
              fontSize: 16,
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              margin: "0 0 14px",
              fontSize: 12.5,
              color: "var(--muted)",
              lineHeight: 1.5,
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
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {item.toolsUsed.slice(0, 2).map((tool) => (
                <span
                  key={tool}
                  className="pill"
                  style={{
                    fontSize: 9.5,
                    padding: "2px 6px",
                    background: "rgba(124, 92, 252, 0.06)",
                    color: "var(--purple-primary)",
                    border: "1px solid var(--purple-line)",
                  }}
                >
                  ⚡ {tool}
                </span>
              ))}
            </div>
          )}

          {/* Social Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
              color: "var(--muted)",
              borderTop: "1px solid var(--line)",
              paddingTop: 10,
            }}
          >
            <span>👁 {item.views}</span>
            <span>❤️ {item.likes}</span>
            <span style={{ color: "var(--purple-primary)", fontWeight: 700 }}>
              ▶ Watch Film →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
