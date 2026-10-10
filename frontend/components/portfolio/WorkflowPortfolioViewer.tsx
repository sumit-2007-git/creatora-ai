"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio";

interface WorkflowPortfolioViewerProps {
  items: PortfolioItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onTriggerLookAlike?: (item: PortfolioItem) => void;
}

export function WorkflowPortfolioViewer({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onTriggerLookAlike,
}: WorkflowPortfolioViewerProps) {
  const currentItem = items[currentIndex] || items[0];

  // Draggable comparison slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation: Left, Right, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) onNavigate(currentIndex - 1);
        else onNavigate(items.length - 1);
      } else if (e.key === "ArrowRight") {
        if (currentIndex < items.length - 1) onNavigate(currentIndex + 1);
        else onNavigate(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  // Handle draggable slider mouse & touch events
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDraggingSlider(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider) handleSliderMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider && e.touches[0]) handleSliderMove(e.touches[0].clientX);
    };

    if (isDraggingSlider) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDraggingSlider]);

  if (!isOpen || !currentItem) return null;

  const isVideo = currentItem.mediaType?.toLowerCase() === "video" || Boolean(currentItem.videoUrl);
  const mediaSrc = currentItem.videoUrl || currentItem.mediaUrl;
  const workflow = currentItem.workflow;
  const hasReference = Boolean(workflow?.referenceImageUrl);
  const showPrompt = workflow?.promptVisibility === "public" && workflow?.promptText;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18, 12, 32, 0.94)",
        backdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        zIndex: 10000,
        animation: "fadeIn 0.2s ease",
        color: "var(--text)",
        overflow: "hidden",
      }}
    >
      {/* TOP HEADER CONTROLS */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "rgba(250, 247, 242, 0.96)",
          borderBottom: "1.5px solid var(--line-strong)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="kanji-stamp">PORTFOLIO</span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "var(--ink)" }}>
            {currentItem.title}
          </h2>
          <span className="pill purple" style={{ fontSize: 11 }}>
            {currentItem.contentType}
          </span>
          {currentItem.trustTier && (
            <span
              className="pill"
              style={{
                fontSize: 10.5,
                background:
                  currentItem.trustTier === "proof-backed"
                    ? "rgba(46, 125, 50, 0.12)"
                    : currentItem.trustTier === "link-checked"
                    ? "rgba(33, 150, 243, 0.12)"
                    : "rgba(0,0,0,0.05)",
                color:
                  currentItem.trustTier === "proof-backed"
                    ? "#2E7D32"
                    : currentItem.trustTier === "link-checked"
                    ? "#1976D2"
                    : "var(--pencil)",
                fontWeight: 800,
              }}
            >
              🛡️ {currentItem.trustTier.toUpperCase()}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Item index counter */}
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>
            {currentIndex + 1} of {items.length}
          </span>

          {/* Look-Alike Search Button */}
          <button
            type="button"
            onClick={() => onTriggerLookAlike && onTriggerLookAlike(currentItem)}
            className="button small"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}
            title="Search creators with a look like this piece"
          >
            <span>🎯</span> More Like This
          </button>

          {/* Navigation Arrows */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
              className="button small ghost"
              aria-label="Previous piece (Left arrow)"
              title="Previous (←)"
            >
              ← Prev
            </button>
            <button
              onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
              className="button small ghost"
              aria-label="Next piece (Right arrow)"
              title="Next (→)"
            >
              Next →
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close viewer (Esc)"
            className="button small ghost"
            style={{ fontWeight: 900, fontSize: 14 }}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </header>

      {/* MAIN TWO-PANEL CONTENT */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* LEFT PANEL: ASPECT-RATIO AWARE MEDIA DISPLAY */}
        <div
          style={{
            flex: "1 1 65%",
            background: "#0E0A18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Draggable Reference-to-Output Comparison Slider */}
          {hasReference ? (
            <div
              ref={sliderContainerRef}
              style={{
                position: "relative",
                width: "min(960px, 100%)",
                maxHeight: "82vh",
                aspectRatio: "16 / 9",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                cursor: isDraggingSlider ? "col-resize" : "default",
                userSelect: "none",
              }}
            >
              {/* Output layer (full width background) */}
              <div style={{ position: "absolute", inset: 0 }}>
                {isVideo ? (
                  <video
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    alt={currentItem.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
                  />
                )}
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(0,0,0,0.75)",
                    color: "#FFFFFF",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  FINAL OUTPUT
                </span>
              </div>

              {/* Reference layer (clipped by slider width) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${sliderPos}%`,
                  overflow: "hidden",
                  borderRight: "2px solid #FFFFFF",
                  boxShadow: "2px 0 14px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={workflow?.referenceImageUrl}
                  alt="Reference input"
                  style={{
                    width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : "100%",
                    height: "100%",
                    maxWidth: "none",
                    objectFit: "contain",
                    background: "#000",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(108, 92, 231, 0.9)",
                    color: "#FFFFFF",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  STARTING REFERENCE
                </span>
              </div>

              {/* Draggable Divider Handle */}
              <div
                onMouseDown={() => setIsDraggingSlider(true)}
                onTouchStart={() => setIsDraggingSlider(true)}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `calc(${sliderPos}% - 16px)`,
                  width: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "col-resize",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    color: "var(--ink)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    fontSize: 12,
                    fontWeight: 900,
                    userSelect: "none",
                  }}
                >
                  ◀▶
                </div>
              </div>
            </div>
          ) : (
            /* Standard single media view */
            <div
              style={{
                maxWidth: "100%",
                maxHeight: "82vh",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              }}
            >
              {isVideo ? (
                <video
                  src={mediaSrc}
                  controls
                  autoPlay
                  loop
                  playsInline
                  style={{ maxWidth: "100%", maxHeight: "82vh", objectFit: "contain" }}
                />
              ) : (
                <img
                  src={mediaSrc}
                  alt={currentItem.title}
                  style={{ maxWidth: "100%", maxHeight: "82vh", objectFit: "contain" }}
                />
              )}
            </div>
          )}

          {/* Keyboard hint banner at bottom of stage */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.7)",
              padding: "4px 14px",
              borderRadius: 20,
              fontSize: 11,
              pointerEvents: "none",
            }}
          >
            Use <strong>←</strong> / <strong>→</strong> arrow keys to browse pieces · <strong>Esc</strong> to close
            {hasReference && " · Drag slider to compare reference"}
          </div>
        </div>

        {/* RIGHT PANEL: "HOW IT WAS MADE" WORKFLOW BREAKDOWN */}
        <aside
          style={{
            flex: "0 0 380px",
            background: "#FAF7F2",
            borderLeft: "2px solid var(--line-strong)",
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Creator Attribution */}
          <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, letterSpacing: "0.05em" }}>
              Created By
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <strong style={{ fontSize: 16, color: "var(--ink)" }}>{currentItem.creatorId}</strong>
              <Link
                href={`/creators/${currentItem.creatorId}`}
                className="button small ghost"
                style={{ fontSize: 11, padding: "2px 8px" }}
              >
                View Profile ↗
              </Link>
            </div>
            {currentItem.description && (
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--pencil)", lineHeight: 1.5 }}>
                {currentItem.description}
              </p>
            )}
          </div>

          {/* Workflow Header & Total Time */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="kanji-stamp" style={{ fontSize: 9 }}>PIPELINE</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "var(--ink)" }}>
                  How It Was Made
                </h3>
              </div>
              {workflow?.totalHours && (
                <span className="pill" style={{ fontSize: 11, fontWeight: 800 }}>
                  ⏱️ {workflow.totalHours} hrs total
                </span>
              )}
            </div>
            <small style={{ color: "var(--muted)", fontSize: 12 }}>
              Creator disclosed tools, generation pipeline, and sequential timing.
            </small>
          </div>

          {/* 1. Tools Used */}
          <div>
            <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>
              Models & Creative Apps ({workflow?.tools?.length || currentItem.toolsUsed?.length || 0}):
            </strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {workflow?.tools && workflow.tools.length > 0 ? (
                workflow.tools.map((t) => (
                  <span key={t.name} className={`pill ${t.kind === "model" ? "purple" : ""}`} style={{ fontSize: 11 }}>
                    {t.kind === "model" ? "🤖" : "🎨"} {t.name} {t.version ? `(${t.version})` : ""}
                  </span>
                ))
              ) : (
                currentItem.toolsUsed?.map((t) => (
                  <span key={t} className="pill purple" style={{ fontSize: 11 }}>
                    ⚡ {t}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* 2. Vertical Step Timeline */}
          <div>
            <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 10 }}>
              Vertical Production Timeline:
            </strong>
            {workflow?.steps && workflow.steps.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", paddingLeft: 12 }}>
                {/* Timeline vertical line */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    bottom: 10,
                    left: 20,
                    width: 2,
                    background: "var(--purple-line)",
                    zIndex: 0,
                  }}
                />

                {workflow.steps.map((step) => (
                  <div
                    key={step.order}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: "10px 14px",
                      background: "#FFFFFF",
                      borderRadius: 12,
                      border: "1.5px solid var(--line)",
                      marginLeft: 16,
                    }}
                  >
                    {/* Node circle on the vertical line */}
                    <div
                      style={{
                        position: "absolute",
                        left: -24,
                        top: 14,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "var(--purple-primary)",
                        color: "#FFFFFF",
                        fontSize: 9,
                        fontWeight: 900,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {step.order}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                      <strong style={{ fontSize: 13, color: "var(--ink)" }}>{step.title}</strong>
                      <span style={{ fontSize: 11, color: "var(--purple-primary)", fontWeight: 700 }}>
                        {step.minutes}m
                      </span>
                    </div>

                    <span style={{ display: "inline-block", fontSize: 10.5, color: "var(--muted)", fontWeight: 700, marginBottom: 4 }}>
                      Tool: {step.tool}
                    </span>

                    {step.description && (
                      <p style={{ margin: 0, fontSize: 12, color: "var(--pencil)", lineHeight: 1.45 }}>
                        {step.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 14, background: "#FFFFFF", borderRadius: 12, border: "1px solid var(--line)", fontSize: 12, color: "var(--muted)" }}>
                Sequential workflow steps not recorded for this legacy piece.
              </div>
            )}
          </div>

          {/* 3. Prompt Disclosure */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)" }}>
                Generation Prompt:
              </strong>
              <span
                className="pill"
                style={{
                  fontSize: 10,
                  background: showPrompt ? "rgba(108, 92, 231, 0.12)" : "rgba(0,0,0,0.05)",
                  color: showPrompt ? "var(--purple-primary)" : "var(--muted)",
                  fontWeight: 700,
                }}
              >
                {showPrompt ? "🌐 Public" : "🔒 Private"}
              </span>
            </div>

            {showPrompt ? (
              <div
                style={{
                  padding: 12,
                  background: "#FFFFFF",
                  borderRadius: 10,
                  border: "1.5px solid var(--purple-line)",
                  fontSize: 12,
                  fontFamily: "monospace",
                  lineHeight: 1.5,
                  wordBreak: "break-all",
                  color: "var(--ink)",
                }}
              >
                {workflow?.promptText}
              </div>
            ) : (
              <div
                style={{
                  padding: 12,
                  background: "#FFFFFF",
                  borderRadius: 10,
                  border: "1px dashed var(--line-strong)",
                  fontSize: 12,
                  color: "var(--muted)",
                  fontStyle: "italic",
                }}
              >
                🔒 Prompt kept private by the creator for commercial intellectual property.
              </div>
            )}
          </div>

          {/* Quick Stats Footer */}
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
            <span>Views: <strong>{currentItem.views}</strong></span>
            <span>Likes: <strong>{currentItem.likes}</strong></span>
            <span>Genre: <strong>{currentItem.genre}</strong></span>
          </div>
        </aside>
      </div>
    </div>
  );
}
