"use client";

import { ReactNode, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DemoBanner } from "@/components/tour/DemoBanner";
import { GuidedTour } from "@/components/tour/GuidedTour";
import { SakuraPetalsOverlay } from "@/components/ui/SakuraPetalsOverlay";
import { BackArrowButton } from "@/components/ui/BackArrowButton";

import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function PublicLayout({
  children,
  minimal = false,
}: {
  children: ReactNode;
  minimal?: boolean;
}) {
  const [showTour, setShowTour] = useState(false);

  if (minimal) {
    return (
      <div className="site-shell">
        <SakuraPetalsOverlay maxPetals={3} />
        <header
          className="public-nav"
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid var(--ink)",
            background: "rgba(251, 240, 217, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CreatoraLogo size={36} showSubtitle={false} />
          </div>
        </header>
        {children}
        <footer
          style={{
            borderTop: "2px solid var(--ink)",
            background: "var(--surface)",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          <div className="container" style={{ fontSize: 13, color: "var(--pencil)", fontWeight: 700 }}>
            Creatora AI Marketplace · 2026
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <SakuraPetalsOverlay maxPetals={7} />
      <BackArrowButton />
      <DemoBanner onStartTour={() => setShowTour(true)} />
      <Navbar onStartTour={() => setShowTour(true)} />
      {children}
      <Footer />
      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </div>
  );
}
