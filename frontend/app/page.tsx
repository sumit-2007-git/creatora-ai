"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { TOUR_STEPS } from "@/components/tour/GuidedTour";
import { DEMO_EVALUATION_STEPS } from "@/lib/demo-data";
import { loginDemoBrand, loginDemoCreator } from "@/lib/firebase/auth";

export default function HomePage() {
  const router = useRouter();
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingCreator, setLoadingCreator] = useState(false);

  const handleEnterAsBrand = async () => {
    setLoadingBrand(true);
    try {
      await loginDemoBrand();
      router.push("/dashboard/brand");
    } catch (err) {
      console.error("Demo brand login failed:", err);
      setLoadingBrand(false);
    }
  };

  const handleEnterAsCreator = async () => {
    setLoadingCreator(true);
    try {
      await loginDemoCreator();
      router.push("/dashboard/creator");
    } catch (err) {
      console.error("Demo creator login failed:", err);
      setLoadingCreator(false);
    }
  };

  // Derive role-specific lists dynamically from real TOUR_STEPS
  const brandTourSteps = TOUR_STEPS.filter((s) => [1, 2, 5].includes(s.step));
  const creatorTourSteps = TOUR_STEPS.filter((s) => [3, 4].includes(s.step));

  return (
    <PublicLayout minimal={true}>
      <main className="container" style={{ padding: "48px 20px 64px", maxWidth: 1100 }}>
        {/* CALM CENTERED HERO */}
        <section style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 48px" }}>
          {/* One Tasteful Illustration */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--yellow)",
              border: "2.5px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)",
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 28 }} role="img" aria-label="sparkle">
              ✨
            </span>
          </div>

          <div style={{ marginBottom: 10 }}>
            <span className="kanji-stamp" style={{ fontSize: 12, padding: "2px 8px" }}>
              CREATORA AI
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 900,
              color: "var(--ink)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            Creatora AI Marketplace
          </h1>

          {/* One short line of tagline */}
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 700,
              color: "var(--purple-primary)",
              margin: "0 0 32px",
              lineHeight: 1.4,
            }}
          >
            Where visionary brands match with elite generative AI creators in seconds.
          </p>

          {/* EXACTLY TWO DEMO ACTIONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleEnterAsBrand}
              disabled={loadingBrand || loadingCreator}
              className="button"
              style={{
                minWidth: 240,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 800,
                cursor: loadingBrand ? "wait" : "pointer",
              }}
            >
              {loadingBrand ? "Entering..." : "🏢 Enter as demo brand"}
            </button>

            <button
              onClick={handleEnterAsCreator}
              disabled={loadingBrand || loadingCreator}
              className="button secondary"
              style={{
                minWidth: 240,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 800,
                cursor: loadingCreator ? "wait" : "pointer",
              }}
            >
              {loadingCreator ? "Entering..." : "🎨 Enter as demo creator"}
            </button>
          </div>

          {/* Option for regular user login/signup */}
          <div style={{ marginTop: 18, fontSize: 13.5, color: "var(--pencil)", fontWeight: 700 }}>
            Have a personal or company account?{" "}
            <a href="/login" style={{ color: "var(--purple-primary)", fontWeight: 800, textDecoration: "underline" }}>
              Sign in with email
            </a>
            {" "}or{" "}
            <a href="/register" style={{ color: "var(--purple-primary)", fontWeight: 800, textDecoration: "underline" }}>
              Create an account
            </a>
          </div>
        </section>

        {/* TWO EQUAL PANELS IN THE MIDDLE OF THE PAGE */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          {/* PANEL 1: GUIDED TOUR PANEL */}
          <div
            className="manga-panel"
            style={{
              background: "var(--surface)",
              border: "2.5px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              borderRadius: 20,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="kanji-stamp" style={{ background: "var(--cyan)", color: "var(--ink)" }}>
                TOUR
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--ink)",
                }}
              >
                Guided Tour (90 Seconds)
              </h2>
            </div>

            <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
              A fast walkthrough demonstrating multimodal intelligence and verified creator partnerships:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
              {/* Brand Tour Section */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1.5px solid var(--line-strong)",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="pill purple" style={{ fontSize: 10, fontWeight: 800 }}>
                    BRAND TOUR
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>
                    Discovery & Matchmaking
                  </span>
                </div>
                <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {brandTourSteps.map((s) => (
                    <li key={s.step} style={{ fontSize: 13, lineHeight: 1.55 }}>
                      <strong style={{ color: "var(--ink)" }}>{s.title}</strong>
                      <span style={{ display: "block", color: "var(--pencil)", fontSize: 12, marginTop: 2 }}>
                        {s.innovationTag}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Creator Tour Section */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1.5px solid var(--line-strong)",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="pill sakura" style={{ fontSize: 10, fontWeight: 800 }}>
                    CREATOR TOUR
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>
                    Workflows & Trust Verification
                  </span>
                </div>
                <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {creatorTourSteps.map((s) => (
                    <li key={s.step} style={{ fontSize: 13, lineHeight: 1.55 }}>
                      <strong style={{ color: "var(--ink)" }}>{s.title}</strong>
                      <span style={{ display: "block", color: "var(--pencil)", fontSize: 12, marginTop: 2 }}>
                        {s.innovationTag}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* PANEL 2: EVALUATION GUIDE PANEL */}
          <div
            className="manga-panel"
            style={{
              background: "var(--surface)",
              border: "2.5px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              borderRadius: 20,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="kanji-stamp" style={{ background: "var(--pink)", color: "#FFFFFF" }}>
                GUIDE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--ink)",
                }}
              >
                Evaluation Guide
              </h2>
            </div>

            <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
              Core reviewer checkpoints in order, with technical validation details:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
              }}
            >
              {DEMO_EVALUATION_STEPS.map((s) => (
                <div
                  key={s.scenario}
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "1.5px solid var(--line-strong)",
                    borderRadius: 12,
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: "var(--purple-soft)",
                          color: "var(--purple-primary)",
                          fontSize: 11,
                          fontWeight: 900,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--purple-line)",
                        }}
                      >
                        {s.scenario}
                      </span>
                      <strong style={{ fontSize: 13.5, color: "var(--ink)" }}>{s.title}</strong>
                    </div>
                    <span className="pill" style={{ fontSize: 9.5, padding: "1px 6px" }}>
                      {s.badge}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "4px 0 0 30px",
                      fontSize: 12,
                      color: "var(--pencil)",
                      lineHeight: 1.5,
                    }}
                  >
                    👉 <em>What to look for:</em> {s.whatToLookFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
