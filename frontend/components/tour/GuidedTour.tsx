"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface TourStep {
  step: number;
  title: string;
  badge: string;
  description: string;
  route: string;
  highlightSelector?: string;
  actionHint: string;
  innovationTag: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: "Conversational AI Search & Discovery",
    badge: "NATURAL LANGUAGE",
    description: "Type queries like 'ad for sneakers' or 'cinematic cyberpunk trailer'. FastAPI & Gemini parse intent into structured parameters with live facet counts and deterministic empty-state relaxations.",
    route: "/discover",
    actionHint: "Explore live facet counts, proof-backed filtering, or click a demo pill.",
    innovationTag: "Gemini Structured Intent + Relaxation Engine",
  },
  {
    step: 2,
    title: "Swipe & Match Tinder-Style Talent Deck",
    badge: "TINDER FOR CREATORS",
    description: "Browse curated AI creator candidates with instant 0-100% fit scores, transparent 5-factor breakdown (including 5% Trust Factor), and 1-click collaboration inquiries.",
    route: "/brand/swipe",
    actionHint: "Swipe Right (Like) or Left (Pass) using keyboard arrows or buttons.",
    innovationTag: "Transparent Match Engine + Weighted Synergy",
  },
  {
    step: 3,
    title: "Workflow-First AI Portfolios & Before/After Slider",
    badge: "HOW IT WAS MADE",
    description: "Move beyond static thumbnails. Inspect reconstructible AI production steps (Midjourney ➔ Magnific ➔ Runway Gen-3) with a full-screen interactive draggable comparison slider.",
    route: "/creators/creator-001",
    actionHint: "Click any portfolio card to slide between the raw reference and final 8K render.",
    innovationTag: "Reproducible AI Pipeline Verification",
  },
  {
    step: 4,
    title: "Gemini 1.5 Vision Proof Verification & Trust Tiers",
    badge: "TRUST SIGNALS",
    description: "Combat AI hallucinations and false claims. Creators submit ComfyUI/Runway workspace screenshots; Gemini Vision inspects interface controls to grant Proof-Backed certification.",
    route: "/creators/creator-001",
    actionHint: "Switch to the 'Trust & Verification 🛡️' tab to inspect the 5-point checklist.",
    innovationTag: "Gemini 1.5 Vision Proof Verification",
  },
  {
    step: 5,
    title: "1-Click AI Brief Enhancement & Synergy Dream Team",
    badge: "SQUAD DISCOVERY",
    description: "Turn a 1-sentence thought into a production-ready creative brief with deliverables, and assemble a complementary multi-creator Dream Team squad with collective reach.",
    route: "/briefs",
    actionHint: "Open any brief to view the Gemini AI explanation and complementary squad.",
    innovationTag: "AI Dream Team Orchestration",
  },
];

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuidedTour({ isOpen, onClose }: GuidedTourProps) {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const step = TOUR_STEPS[currentStepIdx];

  // Keyboard navigation: Escape to close, Arrow keys to traverse
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIdx]);

  if (!isOpen || !step) return null;

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      router.push(TOUR_STEPS[nextIdx].route);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      router.push(TOUR_STEPS[prevIdx].route);
    }
  };

  const handleJumpToStep = (idx: number) => {
    setCurrentStepIdx(idx);
    router.push(TOUR_STEPS[idx].route);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18, 12, 32, 0.75)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        zIndex: 100000,
        padding: 20,
      }}
    >
      <div
        className="surface"
        style={{
          width: "min(640px, 100%)",
          padding: "36px 32px 28px",
          borderRadius: 24,
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          border: "2px solid var(--purple-primary)",
          background: "#FFFFFF",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "var(--muted)",
          }}
          title="Exit Tour (Esc)"
        >
          ✕
        </button>

        {/* Header Progress & Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">TOUR</span>
            <span className="pill purple" style={{ fontSize: 11 }}>
              {step.badge}
            </span>
          </div>

          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--muted)" }}>
            Step {step.step} of {TOUR_STEPS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", height: 4, background: "var(--surface-soft)", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
          <div
            style={{
              width: `${((step.step) / TOUR_STEPS.length) * 100}%`,
              height: "100%",
              background: "var(--purple-primary)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Title & Innovation Tag */}
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
          {step.title}
        </h2>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--purple-primary)", marginBottom: 16 }}>
          ⚡ Key Innovation: {step.innovationTag}
        </div>

        {/* Description Body */}
        <p style={{ margin: "0 0 20px", fontSize: 14.5, lineHeight: 1.7, color: "var(--pencil)" }}>
          {step.description}
        </p>

        {/* Live Action Hint Box */}
        <div
          style={{
            padding: "14px 18px",
            background: "var(--purple-soft)",
            border: "1.5px solid var(--purple-line)",
            borderRadius: 14,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>💡</span>
          <div>
            <strong style={{ display: "block", fontSize: 12, color: "var(--ink)", textTransform: "uppercase" }}>
              What to try right now:
            </strong>
            <span style={{ fontSize: 13, color: "var(--pencil)" }}>
              {step.actionHint}
            </span>
          </div>
        </div>

        {/* Navigation Step Dots & Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          {/* Step Dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleJumpToStep(idx)}
                style={{
                  width: idx === currentStepIdx ? 24 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: idx === currentStepIdx ? "var(--purple-primary)" : "var(--line)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                title={`Jump to Step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="button ghost small"
              style={{ opacity: currentStepIdx === 0 ? 0.4 : 1 }}
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              className="button small"
            >
              {currentStepIdx < TOUR_STEPS.length - 1 ? "Next Step →" : "Finish Tour ✓"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
