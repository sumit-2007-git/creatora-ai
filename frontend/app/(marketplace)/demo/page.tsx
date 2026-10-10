"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { loginDemoBrand, loginDemoCreator } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

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

        {/* 6 Ordered Evaluation Scenarios */}
        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* SCENARIO 1 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 01</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  Conversational AI Search & Live Facets
                </h2>
              </div>
              <span className="pill purple">FastAPI + Gemini Pydantic JSON</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Brands rarely know exact filter checkboxes. Natural queries like <em>"ad for sneakers"</em> or <em>"cinematic cyberpunk trailer"</em> are deconstructed by Gemini into structured constraints with transparent rationale, live facet counts, and deterministic empty-state relaxations.
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> Try typing queries in the prominent search bar, toggle the "Proof-Backed Only" checkbox, or trigger 0 results to observe deterministic relaxation chips.
            </div>

            <Link href="/discover" className="button small">
              Launch Scenario 1: Search & Discover ➔
            </Link>
          </div>

          {/* SCENARIO 2 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 02</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  Tinder-Style Swipe Deck & 5% Trust Factor
                </h2>
              </div>
              <span className="pill purple">Transparent Match Scoring</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Browse candidate creators tailored to your brand brief. Unlike black-box algorithms, each card shows the full transparent weighted breakdown: Genre (30%), Tools (25%), Content Type (20%), Audience (10%), Budget (10%), and Trust Tier (5%).
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> Use keyboard arrows (<kbd>←</kbd> Pass, <kbd>→</kbd> Like) or buttons to swipe candidates. Notice the 5% Trust Factor breakdown row.
            </div>

            <Link href="/brand/swipe" className="button small">
              Launch Scenario 2: Swipe & Match Deck ➔
            </Link>
          </div>

          {/* SCENARIO 3 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 03</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  Workflow-First AI Portfolios with Draggable Split Slider
                </h2>
              </div>
              <span className="pill purple">Reproducible AI Workflows</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              AI portfolios must show <em>how</em> pieces were crafted. Every piece features tools used, step durations, public/private prompt controls, and an interactive draggable comparison split slider between the raw input reference and final output render.
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> Open the creator profile, click any piece in the Portfolio or "Tools & Workflows" tab, and drag the center slider divider left/right. Press <kbd>Esc</kbd> to exit.
            </div>

            <Link href="/creators/creator-001" className="button small">
              Launch Scenario 3: Inspect Workflow & Slider ➔
            </Link>
          </div>

          {/* SCENARIO 4 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 04</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  Gemini 1.5 Vision Proof Verifier & Trust Tiers
                </h2>
              </div>
              <span className="pill green">Gemini Vision OCR + SSRF Guard</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Creatora separates truth from hype with 4 strict Trust Tiers: <code>self-reported</code>, <code>link-checked</code>, <code>proof-backed</code>, and <code>needs-proof</code>. Creators submit screenshot proof of ComfyUI node graphs, Blender setups, or DaVinci timelines, which Gemini 1.5 Vision analyzes for authentic controls.
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> Click the "Trust & Verification 🛡️" tab on creator profiles to view the 5-point checklist and Heat-style Trust Meter.
            </div>

            <Link href="/creators/creator-001" className="button small">
              Launch Scenario 4: Trust & Verification Panel ➔
            </Link>
          </div>

          {/* SCENARIO 5 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 05</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  Visual Look-Alike & Aesthetic Similarity Search
                </h2>
              </div>
              <span className="pill purple">Style Embeddings + Jaccard</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Brands often have a moodboard image rather than keywords. The Look-Alike search analyzes color palette, lighting, framing, and generative models from a reference image to find creators with matching visual aesthetic signatures.
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> Click the Look-Alike button on the discovery page or click the link below to load a pre-configured Tokyo Cyberpunk reference match.
            </div>

            <Link
              href="/discover?lookalike=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1509198397868-475647b2a1e5%3Fauto%3Dformat%26fit%3Dcrop%26w%3D800%26q%3D80"
              className="button small"
            >
              Launch Scenario 5: Visual Look-Alike Search ➔
            </Link>
          </div>

          {/* SCENARIO 6 */}
          <div
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
                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--purple-primary)", textTransform: "uppercase" }}>Scenario 06</span>
                <h2 style={{ margin: "4px 0", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                  1-Click AI Brief Enhancement & Synergy Dream Team
                </h2>
              </div>
              <span className="pill purple">Multi-Creator Squad Builder</span>
            </div>

            <p style={{ fontSize: 14, color: "var(--pencil)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Single creators often can't handle entire 3D + Video + Audio campaigns. Gemini analyzes campaigns to formulate complementary squads: a Visual Prompt Director, Generative Motion Synthesizer, 3D Asset Artist, and Audio/Foley Specialist with combined reach.
            </p>

            <div style={{ padding: "14px 18px", background: "var(--surface-soft)", borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
              <strong>What to test:</strong> View the published campaign briefs to see the multi-creator Dream Team breakdown and collective metrics.
            </div>

            <Link href="/briefs" className="button small">
              Launch Scenario 6: Briefs & Dream Team Squads ➔
            </Link>
          </div>
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
