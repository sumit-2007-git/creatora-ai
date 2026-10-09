"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { fetchPortfolios } from "@/lib/api/portfolios";
import { demoPortfolios } from "@/lib/demo-data";
import { PortfolioItem } from "@/types/portfolio";
import { VideoPortfolioCard } from "@/components/portfolio/VideoPortfolioCard";
import { VideoModalPlayer } from "@/components/portfolio/VideoModalPlayer";

export default function PortfolioShowcasePage() {
  const [items, setItems] = useState<PortfolioItem[]>(demoPortfolios);
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState<PortfolioItem | null>(null);

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

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">PORTFOLIO</span>
            <span className="pill purple">Gallery</span>
          </div>
          <h1 style={{ margin: "6px 0", fontSize: 32, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
            Curated AI Portfolio Showcase
          </h1>
          <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>
            Explore groundbreaking generative films, anime scenes, and brand ads crafted by Creatora AI creators.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {["All", "AI Films", "Product Ads", "Reels", "Shorts"].map((pill) => (
            <button
              key={pill}
              onClick={() => setFilter(pill)}
              className={`pill ${filter === pill ? "purple" : ""}`}
              style={{ padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}
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
              onOpenPreview={(i) => setPreview(i)}
            />
          ))}
        </div>

        {/* Video Player Modal */}
        <VideoModalPlayer
          item={preview}
          onClose={() => setPreview(null)}
        />
      </main>
    </PublicLayout>
  );
}
