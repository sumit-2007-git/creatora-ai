"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchPortfolios } from "@/lib/api/portfolios";
import { demoPortfolios } from "@/lib/demo-data";
import { PortfolioItem } from "@/types/portfolio";
import { VideoPortfolioCard } from "@/components/portfolio/VideoPortfolioCard";
import { WorkflowPortfolioViewer } from "@/components/portfolio/WorkflowPortfolioViewer";

export default function PortfolioShowcasePage() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>(demoPortfolios);
  const [filter, setFilter] = useState("All");
  const [activeViewerIdx, setActiveViewerIdx] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPortfolios({ contentType: filter === "All" ? undefined : filter });
        if (data && data.length > 0) setItems(data);
        else setItems(demoPortfolios);
      } catch {
        setItems(demoPortfolios);
      }
    };
    load();
  }, [filter]);

  const handleOpenViewer = (item: PortfolioItem) => {
    const idx = items.findIndex((i) => i.id === item.id);
    setActiveViewerIdx(idx >= 0 ? idx : 0);
  };

  const handleTriggerLookAlike = (item: PortfolioItem) => {
    setActiveViewerIdx(null);
    router.push(`/discover?refImage=${encodeURIComponent(item.thumbnailUrl || item.mediaUrl)}&refTitle=${encodeURIComponent(item.title)}`);
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">PORTFOLIO</span>
            <span className="pill purple">Workflow Showcase</span>
          </div>
          <h1 style={{ margin: "6px 0", fontSize: 32, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
            Curated AI Portfolio Showcase
          </h1>
          <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>
            Explore groundbreaking generative films, anime scenes, and brand ads crafted by Creatora creators with step-by-step production pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {["All", "AI Films", "Product Ads", "Reels", "Shorts"].map((pill) => (
            <button
              key={pill}
              onClick={() => setFilter(pill)}
              className={`sticker-chip ${filter === pill ? "active" : ""}`}
              style={{ fontSize: 13 }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {items.map((item) => (
            <VideoPortfolioCard
              key={item.id}
              item={item}
              onOpenPreview={handleOpenViewer}
            />
          ))}
        </div>

        {/* Full-screen Workflow Portfolio Viewer with Before/After Slider & Steps */}
        {activeViewerIdx !== null && (
          <WorkflowPortfolioViewer
            items={items}
            currentIndex={activeViewerIdx}
            isOpen={activeViewerIdx !== null}
            onClose={() => setActiveViewerIdx(null)}
            onNavigate={(newIdx) => setActiveViewerIdx(newIdx)}
            onTriggerLookAlike={handleTriggerLookAlike}
          />
        )}
      </main>
    </PublicLayout>
  );
}
