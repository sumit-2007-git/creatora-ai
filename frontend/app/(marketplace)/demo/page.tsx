"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { loginDemoBrand, loginDemoCreator } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { DEMO_EVALUATION_STEPS } from "@/lib/demo-data";

export default function DemoScriptPage() {
  const router = useRouter();

  const handleEnterAsBrand = async () => {
    await loginDemoBrand();
    router.push("/discover");
  };

  const handleEnterAsCreator = async () => {
    await loginDemoCreator();
    router.push("/dashboard/creator");
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 90px", maxWidth: 940 }}>
        {/* Header Banner */}
        <header style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="kanji-stamp">DEMO SCRIPT</span>
            <span className="pill purple">Judge & Evaluator Guide</span>
            <span className="pill green">5 Production-Ready Features</span>
          </div>
          <h1 style={{ margin: "4px 0 8px", fontSize: 36, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
            Creatora AI Marketplace — Evaluation Guide
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--pencil)", lineHeight: 1.7, maxWidth: 820 }}>
            Welcome judges! This page walks through the core innovations of Creatora AI in 90 seconds. 
            Every button performs real backend computations validated by Pydantic schemas, Firebase Firestore rules, and Gemini 1.5.
          </p>

          {/* Quick Demo Impersonation Triggers */}
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <button onClick={handleEnterAsBrand} className="button" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>🏢 Enter as Demo Brand (Solace Studio)</span>
            </button>
            <button onClick={handleEnterAsCreator} className="button secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>🎨 Enter as Demo Creator (Aarav Sharma)</span>
            </button>
          </div>
        </header>

        {/* 6 Ordered Evaluation Scenarios from shared single source */}
        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {DEMO_EVALUATION_STEPS.map((s) => (
            <div
              key={s.scenario}
              className="surface"
              style={{
                padding: 28,
                borderRadius: 20,
                border: "1.5px solid var(--line-strong)",
                background: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>
                    Scenario 0{s.scenario}
                  </span>
                  <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                    {s.title}
                  </h2>
                </div>
                <span className="pill purple">{s.badge}</span>
              </div>

              <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
                {s.description}
              </p>

              <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
                <strong>What to test:</strong> {s.whatToLookFor}
              </div>

              <Link href={s.route} className="button small">
                Launch Scenario {s.scenario}: {s.title} ➔
              </Link>
            </div>
          ))}
        </section>

        {/* Technical Architecture Footer Note */}
        <footer
          style={{
            marginTop: 48,
            padding: 24,
            background: "var(--purple-soft)",
            border: "1.5px solid var(--purple-line)",
            borderRadius: 18,
            fontSize: 13,
            color: "var(--pencil)",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ display: "block", fontSize: 14, color: "var(--ink)", marginBottom: 6 }}>
            🏗️ Architecture & Deployment Notes:
          </strong>
          Creatora AI features a dual-layer architecture: a FastAPI backend with Pydantic JSON validation for local development and mirror Next.js serverless routes for instant, zero-dependency Vercel deployment. Security features include SSRF protection on link extraction and Firestore role enforcement.
        </footer>
      </main>
    </PublicLayout>
  );
}
