import Link from "next/link";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "2.5px solid var(--ink)",
        background: "var(--surface)",
        padding: "44px 0",
        boxShadow: "0 -4px 12px rgba(42, 29, 58, 0.04)",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <CreatoraLogo size={32} showSubtitle={false} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
          <span className="kanji-stamp" style={{ fontSize: 10, padding: "2px 8px" }}>INKSPARK</span>
          <span>Where Creativity Meets AI · © 2026 Creatora AI Marketplace</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13.5, color: "var(--pencil)", fontWeight: 700, flexWrap: "wrap" }}>
          <Link href="/discover" className="underline-draw">Creators</Link>
          <Link href="/briefs" className="underline-draw">Briefs</Link>
          <Link href="/tools/moodboard" className="underline-draw">AI Moodboard</Link>
          <Link href="/tools/calculator" className="underline-draw">Rate Calculator</Link>
          <Link href="/tools/audit" className="underline-draw">Aura Audit</Link>
          <Link href="/briefs/create" className="underline-draw">Post Brief</Link>
          <Link href="/login" className="underline-draw">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
