import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ToolMarquee } from "@/components/ui/ToolMarquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <PublicLayout>
      <main>
        {/* HERO SECTION */}
        <section className="container" style={{ padding: "56px 0 40px", textAlign: "center" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <span className="kanji-stamp">CREATORA</span>
              <span className="pill yellow">Where Creativity Meets Generative Intelligence</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5.5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: "var(--ink)",
                margin: "0 0 16px",
              }}
            >
              Creatora AI
            </h1>

            <p
              style={{
                fontSize: "clamp(18px, 2.2vw, 24px)",
                fontWeight: 700,
                color: "var(--purple-primary)",
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
              }}
            >
              The Next-Gen Matchmaking Marketplace for AI Creators & Visionary Brands
            </p>

            {/* 2-3 Sentence Objective Statement */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--pencil)",
                margin: "0 auto 36px",
                maxWidth: 720,
              }}
            >
              Traditional talent platforms rely on manual browsing and static keyword tags, leaving brands struggling to find specialized generative video, 3D, and prompt engineering artists. Creatora AI bridges this gap through multimodal Gemini intelligence—evaluating visual aesthetic nuance, tool expertise, and portfolio resonance to match brand campaigns with top creators in seconds. By pairing natural-language search with swipe matchmaking and multi-creator production squads, we enable transparent, fair, and lightning-fast creative partnerships for the generative era.
            </p>

            {/* PRIMARY ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <Link
                href="/register?role=CREATOR"
                className="button"
                style={{
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 800,
                  boxShadow: "0 8px 24px rgba(124, 92, 252, 0.25)",
                }}
              >
                🎨 Join as Creator
              </Link>
              <Link
                href="/register?role=BRAND"
                className="button secondary"
                style={{
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                🏢 Hire as Brand
              </Link>
            </div>

            {/* DEMO MODE DIRECT SHORTCUTS FOR JUDGES */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <Link
                href="/discover"
                className="button small"
                style={{
                  background: "#4C6EF5",
                  borderColor: "#4C6EF5",
                  fontSize: 13,
                  padding: "8px 18px",
                  fontWeight: 800,
                }}
              >
                🎮 Enter as Demo Brand (Solace Studio)
              </Link>
              <Link
                href="/dashboard/creator"
                className="button small secondary"
                style={{
                  fontSize: 13,
                  padding: "8px 18px",
                  fontWeight: 800,
                }}
              >
                🎨 Enter as Demo Creator (Aarav Sharma)
              </Link>
              <Link
                href="/demo"
                className="button small ghost"
                style={{
                  fontSize: 13,
                  padding: "8px 18px",
                  fontWeight: 800,
                  border: "1.5px solid var(--purple-line)",
                  background: "#FFFFFF",
                }}
              >
                📋 90s Judges Evaluation Guide
              </Link>
            </div>

            {/* Quick 1-Click Feature Exploration Strip */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", background: "rgba(255, 255, 255, 0.7)", borderRadius: 20, border: "1px solid var(--line)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Instant Exploration:
              </span>
              <Link href="/discover" className="pill purple" style={{ fontSize: 11 }}>
                🔍 AI Search & Discovery
              </Link>
              <Link href="/brand/swipe" className="pill sakura" style={{ fontSize: 11 }}>
                🔥 Tinder Swipe Deck
              </Link>
              <Link href="/briefs" className="pill" style={{ fontSize: 11 }}>
                ⚡ Dream Team Briefs
              </Link>
            </div>
          </div>
        </section>

        {/* TOOL MARQUEE TICKER */}
        <ToolMarquee />

        {/* 3-STEP WORKFLOW STRIP */}
        <ScrollReveal>
          <section
            style={{
              borderTop: "2.5px solid var(--ink)",
              borderBottom: "2.5px solid var(--ink)",
              background: "var(--surface)",
              padding: "48px 0",
            }}
          >
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <span className="kanji-stamp">WORKFLOW</span>
                <h2 style={{ margin: "6px 0 4px", fontSize: 26, fontWeight: 900, color: "var(--ink)" }}>
                  How Creatora AI Works
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
                  From initial campaign concept to commercial generative delivery in 3 seamless steps.
                </p>
              </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
              }}
            >
              {/* Step 1 */}
              <div
                className="surface"
                style={{
                  padding: 24,
                  borderRadius: 20,
                  border: "1.5px solid var(--line)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "var(--purple-soft)",
                    color: "var(--purple-primary)",
                    fontWeight: 900,
                    fontSize: 16,
                    marginBottom: 12,
                  }}
                >
                  1
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                  Post or Search
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
                  Draft an open campaign brief with aesthetic nuances, or use the natural-language AI Search Bar to describe your dream visual style in plain English.
                </p>
              </div>

              {/* Step 2 */}
              <div
                className="surface"
                style={{
                  padding: 24,
                  borderRadius: 20,
                  border: "1.5px solid var(--line)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "rgba(255, 107, 129, 0.15)",
                    color: "#FF4757",
                    fontWeight: 900,
                    fontSize: 16,
                    marginBottom: 12,
                  }}
                >
                  2
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                  AI Match & Swipe
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
                  Review multimodal synergy scores, explore live creator posts and portfolios, or swipe right on talent cards to send instant, deduplicated brand interest.
                </p>
              </div>

              {/* Step 3 */}
              <div
                className="surface"
                style={{
                  padding: 24,
                  borderRadius: 20,
                  border: "1.5px solid var(--line)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "rgba(46, 125, 50, 0.12)",
                    color: "#2E7D32",
                    fontWeight: 900,
                    fontSize: 16,
                    marginBottom: 12,
                  }}
                >
                  3
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                  Collaborate & Produce
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
                  Synthesize complementary 3-creator Dream Teams, agree on milestones in the Creator Inbox, and export polished client proposals with unified reach.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

        {/* 6 FEATURE CARDS SECTION */}
        <section className="section" style={{ padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 40px" }}>
              <span className="pill purple">Full-Stack Intelligence</span>
              <h2 style={{ margin: "8px 0 6px", fontSize: 32, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
                Built Specifically for the Generative Creative Era
              </h2>
              <p style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>
                Six dedicated capabilities connecting brands and AI artists with precision and speed.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 22,
              }}
            >
              {/* Card 1: AI Search */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>🔍</span>
                  <span className="pill purple" style={{ fontSize: 10 }}>Gemini NLP</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  AI Natural-Language Search
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Parse plain English queries like <em>"hyperrealistic sneaker ad with Midjourney and runway"</em> into structured filters with weighted creator ranking and 1-line Gemini rationales.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/discover" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    Try AI Search →
                  </Link>
                </div>
              </div>

              {/* Card 2: Smart Matching */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>🎯</span>
                  <span className="pill" style={{ fontSize: 10 }}>Multimodal AI</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Smart Aesthetic Matching
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Matches campaign moodboards and briefs against creator styles across Runway Gen-3, Midjourney v6, Kling, and Blender to deliver true aesthetic compatibility scores.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/creators" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    Browse Creators →
                  </Link>
                </div>
              </div>

              {/* Card 3: Tinder Swipe Matchmaking */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>🔥</span>
                  <span className="pill sakura" style={{ fontSize: 10 }}>Swipe Deck</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Tinder-Style Swipe Matchmaking
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Discover creators with drag gestures and keyboard shortcuts (← Pass / → Match). Swipe right to send an instant, duplicate-proof notification directly to the creator's inbox.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/brand/swipe" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    Open Swipe Deck →
                  </Link>
                </div>
              </div>

              {/* Card 4: Dream Team Builder */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>👥</span>
                  <span className="pill purple" style={{ fontSize: 10 }}>Production Squad</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Dream Team Builder
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Auto-assemble complementary 3-creator squads (e.g. Director, Prompt Engineer, Sound Designer) for any brief with synergy scoring, collective reach calculation, and proposal exports.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/briefs" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    View Campaign Briefs →
                  </Link>
                </div>
              </div>

              {/* Card 5: Creator Portfolios & Posts */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>📱</span>
                  <span className="pill" style={{ fontSize: 10 }}>SSRF Protected</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Creator Portfolios & Social Posts
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Rich social feed showcase with SSRF-safe URL previews, AI tag and tool suggestions, up to 3 pinned highlights, and transparent self-reported metric badges.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/portfolio" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    Explore Video Showcase →
                  </Link>
                </div>
              </div>

              {/* Card 6: Instant Talent Inbox */}
              <div
                className="surface surface-hover"
                style={{
                  padding: 28,
                  borderRadius: 22,
                  border: "1.5px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>📬</span>
                  <span className="pill" style={{ fontSize: 10 }}>Real-Time Hub</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                  Instant Talent Inbox
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.65 }}>
                  Real-time notification inbox for creators with unread badges, custom brand intro messages, and 1-click Accept / Decline actions that immediately establish mutual brand matches.
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Link href="/creator/inbox" className="button small ghost" style={{ padding: 0, color: "var(--purple-primary)", fontWeight: 700 }}>
                    Open Creator Inbox →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
