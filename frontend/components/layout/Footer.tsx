import Link from "next/link";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function Footer() {
  return (
    <footer style={{ borderTop: "1.5px solid var(--line)", background: "#FAF7F2", padding: "40px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <CreatoraLogo size={30} showSubtitle={false} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--muted)" }}>
          <span className="kanji-stamp" style={{ fontSize: 10, padding: "2px 6px" }}>CREATE</span>
          <span>Where Creativity Meets AI · © 2026 Creatora AI Marketplace</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--pencil)", fontWeight: 600, flexWrap: "wrap" }}>
          <Link href="/discover">Creators</Link>
          <Link href="/briefs">Briefs</Link>
          <Link href="/tools/moodboard">AI Moodboard</Link>
          <Link href="/tools/calculator">Rate Calculator</Link>
          <Link href="/tools/audit">Aura Audit</Link>
          <Link href="/briefs/create">Post Brief</Link>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
