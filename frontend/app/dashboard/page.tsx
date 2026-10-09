import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <div>
      <header className="workspace-heading" style={{ marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="kanji-stamp">SELECT</span>
            <span className="pill purple">Workspace Selector</span>
          </div>
          <h1 style={{ margin: "4px 0", fontSize: 32, fontWeight: 900, color: "var(--ink)" }}>
            Choose Your Side of the Story
          </h1>
          <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>
            Jump into your Creator Studio to manage portfolios and proposals, or open the Brand Campaign Hub to launch briefs.
          </p>
        </div>
      </header>

      <div className="grid-2">
        {/* Creator Card */}
        <Link
          href="/dashboard/creator"
          className="surface surface-hover"
          style={{
            padding: 36,
            borderRadius: 24,
            border: "1.5px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "linear-gradient(145deg, #FFFFFF, #FAF7F2)",
          }}
        >
          <span className="pill purple" style={{ width: "fit-content" }}>
            🎨 For AI Creators
          </span>
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "var(--ink)" }}>
            Creator Studio & Performance
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: "var(--pencil)", lineHeight: 1.7 }}>
            Track your views and follower trajectory, upload generative video to your portfolio, sync Instagram metrics with Gemini Vision OCR, and respond to brand inquiries.
          </p>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, color: "var(--purple-primary)", fontWeight: 700, fontSize: 14 }}>
            <span>Open Creator Studio</span>
            <span>→</span>
          </div>
        </Link>

        {/* Brand Card */}
        <Link
          href="/dashboard/brand"
          className="surface surface-hover"
          style={{
            padding: 36,
            borderRadius: 24,
            border: "1.5px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "linear-gradient(145deg, #FFFFFF, #FAF7F2)",
          }}
        >
          <span className="pill sakura" style={{ width: "fit-content" }}>
            🏢 For Brands & Agencies
          </span>
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "var(--ink)" }}>
            Brand Campaign & Matchmaking
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: "var(--pencil)", lineHeight: 1.7 }}>
            Draft campaign briefs with Gemini AI assistance, receive applications, review talent with AI compatibility scores (95%+ match), and send direct proposals.
          </p>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, color: "var(--purple-primary)", fontWeight: 700, fontSize: 14 }}>
            <span>Open Brand Campaign Hub</span>
            <span>→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
