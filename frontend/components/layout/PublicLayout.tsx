"use client";

import { ReactNode, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DemoBanner } from "@/components/tour/DemoBanner";
import { GuidedTour } from "@/components/tour/GuidedTour";

export function PublicLayout({ children }: { children: ReactNode }) {
  const [showTour, setShowTour] = useState(false);

  return (
    <div className="site-shell">
      <DemoBanner onStartTour={() => setShowTour(true)} />
      <Navbar onStartTour={() => setShowTour(true)} />
      {children}
      <Footer />
      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </div>
  );
}
