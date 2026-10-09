"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { fetchPortfolios } from "@/lib/api/portfolios";
import { demoPortfolios } from "@/lib/demo-data";
import { PortfolioItem } from "@/types/portfolio";
import { getStoredUser } from "@/lib/firebase/auth";

export default function CreatorPortfolioDashboardPage() {
  const [items, setItems] = useState<PortfolioItem[]>(demoPortfolios);

  useEffect(() => {
    const user = getStoredUser();
    fetchPortfolios({ creatorId: user?.creatorId || "creator-001" })
      .then((data) => {
        if (data && data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <header className="workspace-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">PORTFOLIO</span>
            <span className="pill purple">Portfolio Manager</span>
          </div>
          <h1 style={{ margin: "4px 0", fontSize: 28, fontWeight: 900, color: "var(--ink)" }}>Your Portfolio Showcase</h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>Showcase your best generative video, 3D motion, and visual storytelling.</p>
        </div>
        <Link href="/dashboard/creator" className="button">
          + Upload New Piece
        </Link>
      </header>

      <div className="section-heading">
        <h2 style={{ fontSize: 18 }}>Published Works ({items.length})</h2>
        <span className="pill purple">Public on Marketplace</span>
      </div>

      <PortfolioGrid items={items} />
    </div>
  );
}
