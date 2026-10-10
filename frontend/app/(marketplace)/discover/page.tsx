"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { fetchCreators } from "@/lib/api/creators";
import { demoCreators } from "@/lib/demo-data";
import { Creator } from "@/types/creator";
import { AISearchBar } from "@/components/discovery/AISearchBar";

const CONTENT_TYPES = ["Reels", "YouTube", "Shorts", "Product Ads", "AI Films"];
const GENRES = ["Fashion", "Tech", "Lifestyle", "Travel", "Food", "Art"];
const TOOLS = ["Runway", "Midjourney", "Adobe", "DaVinci Resolve", "Blender"];

export default function DiscoverPage() {
  const [creators, setCreators] = useState<Creator[]>(demoCreators);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [sortBy, setSortBy] = useState<"relevance" | "followers" | "engagement">("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchCreators({
        q: search || undefined,
        genre: selectedGenre || undefined,
        contentType: selectedContentType || undefined,
        tool: selectedTool || undefined,
        sortBy
      });
      if (data && data.length > 0) {
        setCreators(data);
      } else {
        // Fallback filter locally
        let filtered = [...demoCreators];
        if (selectedGenre) filtered = filtered.filter(c => c.genres.includes(selectedGenre));
        if (selectedContentType) filtered = filtered.filter(c => c.contentTypes.includes(selectedContentType));
        if (selectedTool) filtered = filtered.filter(c => c.tools.includes(selectedTool));
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q)));
        }
        setCreators(filtered);
      }
    } catch {
      // Offline fallback
      let filtered = [...demoCreators];
      if (selectedGenre) filtered = filtered.filter(c => c.genres.includes(selectedGenre));
      if (selectedContentType) filtered = filtered.filter(c => c.contentTypes.includes(selectedContentType));
      if (selectedTool) filtered = filtered.filter(c => c.tools.includes(selectedTool));
      setCreators(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedContentType, selectedGenre, selectedTool, sortBy]);

  const handleClearAll = () => {
    setSelectedContentType("");
    setSelectedGenre("");
    setSelectedTool("");
    setSearch("");
    setSortBy("relevance");
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        {/* Prominent AI Natural Language Search */}
        <AISearchBar />

        {/* Regular Filter Search bar as shown in design */}
        <div style={{ maxWidth: 840, margin: "0 auto 36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#FFFFFF",
              border: "1.5px solid var(--line-strong)",
              borderRadius: 16,
              padding: "6px 16px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: 18, color: "var(--muted)", marginRight: 12 }}>🔍</span>
            <input
              type="text"
              placeholder="Search creators by name, skills, or content type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadData()}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: 14.5,
                color: "var(--ink)",
                background: "transparent",
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); loadData(); }}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: 14 }}
              >
                ✕
              </button>
            )}
            <button
              onClick={loadData}
              className="button small"
              style={{ marginLeft: 12, padding: "0 18px" }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Section Title and Sort */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp">EXPLORE</span>
              <span className="pill purple">{creators.length} Creators Available</span>
            </div>
            <h1 style={{ margin: "6px 0 2px", fontSize: 32, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.04em" }}>
              Discover Amazing Creators
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Find the perfect AI creator for your next campaign
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="select-field"
              style={{ width: "auto", minHeight: 38, padding: "0 12px", borderRadius: 10, fontSize: 13 }}
            >
              <option value="relevance">Relevance</option>
              <option value="followers">Most Followers</option>
              <option value="engagement">Highest Engagement</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="button small secondary filter-toggle-mobile"
        >
          <span>{showMobileFilters ? "▲ Hide Filters" : "⚡ Filter Creators (Genre, Tools, Format)"}</span>
        </button>

        {/* Layout with Sidebar Filters and Cards Grid */}
        <div className="discover-layout">
          {/* Left Filters Panel */}
          <aside
            className={`surface ${showMobileFilters ? "filter-panel-open" : "filter-panel-desktop"}`}
            style={{
              padding: 22,
              borderRadius: 20,
              border: "1.5px solid var(--line)",
              position: "sticky",
              top: 96,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>Filters</h3>
              {(selectedContentType || selectedGenre || selectedTool) && (
                <button
                  onClick={handleClearAll}
                  style={{ background: "none", border: "none", color: "var(--purple-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Content Type Filter */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                Content Type
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {CONTENT_TYPES.map((ct) => (
                  <label key={ct} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--pencil)", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="contentType"
                      checked={selectedContentType === ct}
                      onChange={() => setSelectedContentType(selectedContentType === ct ? "" : ct)}
                      style={{ accentColor: "var(--purple-primary)", cursor: "pointer" }}
                    />
                    {ct}
                  </label>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                Genre
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {GENRES.map((g) => (
                  <label key={g} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--pencil)", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="genre"
                      checked={selectedGenre === g}
                      onChange={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                      style={{ accentColor: "var(--purple-primary)", cursor: "pointer" }}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Tools Filter */}
            <div>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                AI Tools
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {TOOLS.map((t) => (
                  <label key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--pencil)", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="tool"
                      checked={selectedTool === t}
                      onChange={() => setSelectedTool(selectedTool === t ? "" : t)}
                      style={{ accentColor: "var(--purple-primary)", cursor: "pointer" }}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Creator Cards Grid */}
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: 60, color: "var(--muted)" }}>
                Loading creators...
              </div>
            ) : creators.length === 0 ? (
              <div className="surface" style={{ padding: 48, textAlign: "center" }}>
                <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>🌸</span>
                <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "var(--ink)" }}>No creators match this filter</h3>
                <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 13 }}>
                  Try resetting the filter options or adjusting your search keywords.
                </p>
                <button onClick={handleClearAll} className="button small">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {creators.map((c) => (
                  <CreatorCard key={c.creatorId || c.uid} creator={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
