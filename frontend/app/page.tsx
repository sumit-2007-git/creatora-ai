import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { demoCreators, demoBriefs } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <PublicLayout>
      <main>
        {/* HERO SECTION */}
        <section className="container" style={{ padding: "48px 0 44px" }}>
          <div className="hero-grid">
            {/* Left Copy */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span className="kanji-stamp">CREATE</span>
                <span className="pill purple">Where Art Meets Intelligence</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(42px, 5.2vw, 68px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                }}
              >
                Where Creativity <br />
                <span style={{ color: "var(--purple-primary)", textDecoration: "underline", textDecorationColor: "var(--purple-line)", textUnderlineOffset: 8 }}>
                  Meets AI
                </span>
              </h1>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  maxWidth: 520,
                  margin: "0 0 32px",
                }}
              >
                Discover elite AI filmmakers, 3D artists, and visual storytellers.
                Explore unique portfolios and launch impactful campaigns with the power of generative intelligence.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link href="/discover" className="button">
                  Explore Creators →
                </Link>
                <Link href="/briefs/create" className="button secondary">
                  Post a Brief
                </Link>
              </div>

              {/* Creator Stack */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
                <div style={{ display: "flex", paddingLeft: 6 }}>
                  {demoCreators.map((c, i) => (
                    <img
                      key={c.creatorId}
                      src={c.avatar}
                      alt={c.name}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "2.5px solid #FFFFFF",
                        objectFit: "cover",
                        marginLeft: i === 0 ? 0 : -10,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  ))}
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>
                    10K+ <span style={{ fontWeight: 500, color: "var(--muted)" }}>Amazing creators</span>
                  </span>
                  <span style={{ fontSize: 11, color: "var(--purple-primary)", fontWeight: 600 }}>
                    🌸 96% AI matchmaking compatibility
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Art - Hand-drawn Japanese anime sketchbook aesthetic */}
            <div style={{ position: "relative" }}>
              <div
                className="surface"
                style={{
                  position: "relative",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "2px solid var(--line-strong)",
                  boxShadow: "0 20px 50px rgba(108, 92, 231, 0.12)",
                  background: "#FFFFFF",
                }}
              >
                {/* Hero Illustration */}
                <div className="hero-image-frame">
                  <img
                    src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85"
                    alt="Japanese anime watercolor art"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Watercolor soft overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(250, 247, 242, 0.1) 0%, rgba(31, 27, 44, 0.75) 100%)",
                    }}
                  />

                  {/* Overlaid caption card */}
                  <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, color: "#FFFFFF" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span className="kanji-stamp" style={{ borderColor: "#FFFFFF", color: "#FFFFFF", background: "rgba(255,255,255,0.15)" }}>
                        IDEAS
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        People · Ideas · AI · Creativity Together
                      </span>
                    </div>
                    <h3 style={{ margin: "4px 0", fontSize: 22, fontWeight: 800 }}>
                      Cinematic Stories Crafted with AI
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
                      Connect with artists leading the generative frontier across Runway, Midjourney, and Blender.
                    </p>
                  </div>
                </div>

                {/* Floating pill badge on illustration */}
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    background: "rgba(255, 255, 255, 0.95)",
                    padding: "8px 14px",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    border: "1.5px solid var(--purple-line)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>✨</span>
                  <div>
                    <strong style={{ display: "block", fontSize: 12, color: "var(--ink)" }}>Perfect-fit Creator Found</strong>
                    <small style={{ fontSize: 10, color: "var(--purple-primary)", fontWeight: 700 }}>97% Aesthetic & Tool Match</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CREATORS SECTION */}
        <section className="section" style={{ borderTop: "1.5px solid var(--line)" }}>
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="pill purple">Curated Talent</span>
                <h2>Discover Amazing Creators</h2>
                <p>Top generative directors, prompt engineers, and visualists ready to craft your next campaign.</p>
              </div>
              <Link href="/discover" className="button secondary">
                View All Creators →
              </Link>
            </div>

            <div className="grid-3">
              {demoCreators.map((creator) => (
                <CreatorCard key={creator.creatorId} creator={creator} />
              ))}
            </div>
          </div>
        </section>

        {/* CAMPAIGN BRIEFS PREVIEW SECTION */}
        <section className="section" style={{ background: "rgba(244, 239, 230, 0.5)", borderTop: "1.5px solid var(--line)" }}>
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="pill sakura">Active Campaigns</span>
                <h2>Open Brand Briefs</h2>
                <p>Browse high-impact creative opportunities with established global brands.</p>
              </div>
              <Link href="/briefs/create" className="button">
                + Post a Brief
              </Link>
            </div>

            <div className="grid-2">
              {demoBriefs.map((brief) => (
                <div
                  key={brief.id}
                  className="surface surface-hover"
                  style={{ padding: 26, display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className="pill purple" style={{ fontSize: 10, marginBottom: 8 }}>
                        {brief.brandName}
                      </span>
                      <h3 style={{ margin: "4px 0", fontSize: 19, fontWeight: 800, color: "var(--ink)" }}>
                        {brief.title}
                      </h3>
                    </div>
                    <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9" }}>
                      ● Accepting Creators
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
                    {brief.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderTop: "1px solid var(--line)",
                      borderBottom: "1px solid var(--line)",
                      fontSize: 12,
                    }}
                  >
                    <span>Budget: <strong style={{ color: "var(--purple-primary)" }}>{brief.budget}</strong></span>
                    <span>Timeline: <strong>{brief.deadline}</strong></span>
                    <span>Applicants: <strong>{brief.applicantCount} creators</strong></span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {brief.contentTypes.map((ct) => (
                        <span key={ct} className="pill" style={{ fontSize: 10 }}>{ct}</span>
                      ))}
                    </div>
                    <Link href={`/briefs/${brief.id}`} className="button small">
                      View Details & Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW BANNER */}
        <section className="section" id="about" style={{ borderTop: "1.5px solid var(--line)" }}>
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <span className="kanji-stamp">INSPIRE</span>
              <h2 style={{ textAlign: "center" }}>From First Concept to Final Render</h2>
              <p style={{ textAlign: "center" }}>An intelligent marketplace built specifically for the workflows of generative AI creators.</p>
            </div>

            <div className="grid-3" style={{ marginTop: 24 }}>
              <div className="surface" style={{ padding: 26 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>Multimodal AI Matching</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
                  Our Gemini engine analyzes brand briefs and creator visual styles to calculate true aesthetic synergy.
                </p>
              </div>

              <div className="surface" style={{ padding: 26 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>Zero-Friction Social Import</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
                  Creators import metrics, tools, and content styles automatically using manual input or multimodal vision OCR.
                </p>
              </div>

              <div className="surface" style={{ padding: 26 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🛡️</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>Verified Collaboration</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
                  Direct contact requests, structured milestone briefs, and clear delivery guidelines for reliable campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
