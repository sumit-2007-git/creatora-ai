"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { fetchCreators } from "@/lib/api/creators";
import { demoCreators } from "@/lib/demo-data";
import { Creator } from "@/types/creator";
import { AISearchBar } from "@/components/discovery/AISearchBar";
import { fetchFilterRelaxations, fetchLookAlikeMatches, fetchSavedSearches, saveSearchQuery, deleteSavedSearch } from "@/lib/api/search";
import { RelaxationResponse, LookAlikeResponse, SavedSearch } from "@/types/search";
import { TrustBadge } from "@/components/trust/TrustBadge";

const CONTENT_TYPES = ["Reels", "YouTube", "Shorts", "Product Ads", "AI Films"];
const GENRES = ["Fashion", "Tech", "Lifestyle", "Travel", "Food", "Art"];
const TOOLS = ["Runway", "Midjourney", "Adobe", "DaVinci Resolve", "Blender", "Kling AI", "ComfyUI", "Magnific AI"];

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lookalikeUrlParam = searchParams.get("lookalike");

  const [allCreators, setAllCreators] = useState<Creator[]>(demoCreators);
  const [creators, setCreators] = useState<Creator[]>(demoCreators);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [proofBackedOnly, setProofBackedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"relevance" | "followers" | "engagement" | "heat" | "price">("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Relaxation & nearest matches state
  const [relaxationData, setRelaxationData] = useState<RelaxationResponse | null>(null);
  const [loadingRelaxation, setLoadingRelaxation] = useState(false);

  // Look-alike search state
  const [lookalikeImageUrl, setLookalikeImageUrl] = useState<string>(lookalikeUrlParam || "");
  const [lookalikeData, setLookalikeData] = useState<LookAlikeResponse | null>(null);
  const [analyzingLookalike, setAnalyzingLookalike] = useState(false);
  const [showLookalikeModal, setShowLookalikeModal] = useState(false);
  const [customLookalikeInput, setCustomLookalikeInput] = useState("");

  // Saved searches state
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Load saved searches
  useEffect(() => {
    fetchSavedSearches("brand-001")
      .then((data) => {
        if (data && data.length > 0) setSavedSearches(data);
      })
      .catch(() => {});
  }, []);

  // Handle URL lookalike param
  useEffect(() => {
    if (lookalikeUrlParam) {
      setLookalikeImageUrl(lookalikeUrlParam);
      runLookAlikeSearch(lookalikeUrlParam);
    }
  }, [lookalikeUrlParam]);

  const runLookAlikeSearch = async (imgUrl: string, promptHint?: string) => {
    try {
      setAnalyzingLookalike(true);
      const res = await fetchLookAlikeMatches({ imageUrl: imgUrl, promptHint });
      setLookalikeData(res);
    } catch (err) {
      console.warn("Lookalike fetch fallback:", err);
    } finally {
      setAnalyzingLookalike(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchCreators({
        q: search || undefined,
        genre: selectedGenre || undefined,
        contentType: selectedContentType || undefined,
        tool: selectedTool || undefined,
        proofBackedOnly: proofBackedOnly || undefined,
        sortBy,
      });

      let results = (data && data.length > 0) ? data : [...demoCreators];

      // Client-side filtering check
      if (selectedGenre) results = results.filter((c) => c.genres?.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));
      if (selectedContentType) results = results.filter((c) => c.contentTypes?.some(ct => ct.toLowerCase() === selectedContentType.toLowerCase()));
      if (selectedTool) results = results.filter((c) => c.tools?.some(t => t.toLowerCase().includes(selectedTool.toLowerCase())));
      if (proofBackedOnly) results = results.filter((c) => c.trustTier === "proof-backed");
      if (search) {
        const q = search.toLowerCase();
        results = results.filter((c) =>
          c.name.toLowerCase().includes(q) ||
          c.skills?.some((s) => s.toLowerCase().includes(q)) ||
          c.tools?.some((t) => t.toLowerCase().includes(q))
        );
      }

      // Sort
      if (sortBy === "followers") {
        results.sort((a, b) => (b.totalFollowers || 0) - (a.totalFollowers || 0));
      } else if (sortBy === "engagement") {
        results.sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0));
      } else if (sortBy === "heat") {
        results.sort((a, b) => (b.trustScore || 80) - (a.trustScore || 80));
      }

      setCreators(results);

      // If zero or few results, calculate deterministic relaxations
      if (results.length < 3 && (selectedGenre || selectedTool || selectedContentType || proofBackedOnly)) {
        setLoadingRelaxation(true);
        fetchFilterRelaxations({
          genre: selectedGenre,
          tool: selectedTool,
          contentType: selectedContentType,
          proofBackedOnly,
        })
          .then(setRelaxationData)
          .catch(() => {})
          .finally(() => setLoadingRelaxation(false));
      } else {
        setRelaxationData(null);
      }
    } catch {
      setCreators(demoCreators);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedContentType, selectedGenre, selectedTool, proofBackedOnly, sortBy]);

  const handleClearAll = () => {
    setSelectedContentType("");
    setSelectedGenre("");
    setSelectedTool("");
    setProofBackedOnly(false);
    setSearch("");
    setSortBy("relevance");
    setLookalikeImageUrl("");
    setLookalikeData(null);
    setRelaxationData(null);
  };

  // Live facet counts given currently active filters
  const getFacetCount = (key: "genre" | "contentType" | "tool" | "proofBackedOnly", val: string | boolean) => {
    return allCreators.filter((c) => {
      if (key !== "genre" && selectedGenre && !c.genres?.some(g => g.toLowerCase() === selectedGenre.toLowerCase())) return false;
      if (key !== "contentType" && selectedContentType && !c.contentTypes?.some(ct => ct.toLowerCase() === selectedContentType.toLowerCase())) return false;
      if (key !== "tool" && selectedTool && !c.tools?.some(t => t.toLowerCase().includes(selectedTool.toLowerCase()))) return false;
      if (key !== "proofBackedOnly" && proofBackedOnly && c.trustTier !== "proof-backed") return false;

      if (key === "genre") return c.genres?.some(g => g.toLowerCase() === String(val).toLowerCase());
      if (key === "contentType") return c.contentTypes?.some(ct => ct.toLowerCase() === String(val).toLowerCase());
      if (key === "tool") return c.tools?.some(t => t.toLowerCase().includes(String(val).toLowerCase()));
      if (key === "proofBackedOnly") return c.trustTier === "proof-backed";
      return true;
    }).length;
  };

  const handleApplySavedSearch = (saved: SavedSearch) => {
    setSelectedGenre(saved.filters.genre || "");
    setSelectedTool(saved.filters.tool || "");
    setSelectedContentType(saved.filters.contentType || "");
    setProofBackedOnly(Boolean(saved.filters.proofBackedOnly));
  };

  const handleSaveCurrentSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveTitle.trim()) return;
    try {
      const saved = await saveSearchQuery({
        brandId: "brand-001",
        title: saveTitle.trim(),
        filters: {
          genre: selectedGenre,
          tool: selectedTool,
          contentType: selectedContentType,
          proofBackedOnly,
        },
      });
      setSavedSearches((prev) => [saved, ...prev]);
      setSaveSuccessMsg("✓ Search saved to your brand workspace!");
      setTimeout(() => {
        setShowSaveModal(false);
        setSaveSuccessMsg("");
        setSaveTitle("");
      }, 1500);
    } catch {
      setShowSaveModal(false);
    }
  };

  const handleApplyRelaxation = (filterKey: string) => {
    if (filterKey === "tool") setSelectedTool("");
    else if (filterKey === "genre") setSelectedGenre("");
    else if (filterKey === "contentType") setSelectedContentType("");
    else if (filterKey === "proofBackedOnly") setProofBackedOnly(false);
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        {/* Prominent AI Natural Language Search */}
        <AISearchBar />

        {/* Regular Filter Search bar */}
        <div style={{ maxWidth: 880, margin: "0 auto 28px" }}>
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
              placeholder="Search creators by name, skills, tools, or style aesthetics..."
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
              onClick={() => setShowLookalikeModal(true)}
              className="button ghost small"
              style={{ whiteSpace: "nowrap", border: "1px dashed var(--purple-line)", marginRight: 8, fontSize: 12 }}
              title="Look-Alike visual style search"
            >
              🎨 Look-Alike
            </button>
            <button
              onClick={loadData}
              className="button small"
              style={{ padding: "0 18px" }}
            >
              Search
            </button>
          </div>
        </div>

        {/* LOOK-ALIKE BANNER (If active) */}
        {lookalikeData && (
          <div
            className="surface"
            style={{
              padding: 22,
              borderRadius: 18,
              border: "2px solid var(--purple-primary)",
              background: "linear-gradient(135deg, #FAF7F2 0%, #F5EFEB 100%)",
              marginBottom: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {lookalikeImageUrl && (
                  <img
                    src={lookalikeImageUrl}
                    alt="Reference style"
                    style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover", border: "2px solid var(--purple-line)" }}
                  />
                )}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span className="kanji-stamp">LOOK-ALIKE</span>
                    <strong style={{ fontSize: 17, color: "var(--ink)" }}>
                      Visual Style & Technique Match Active
                    </strong>
                    <span className="pill purple" style={{ fontSize: 11 }}>
                      {lookalikeData.referenceStyle.dominant_mood}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--pencil)", maxWidth: 720 }}>
                    {lookalikeData.referenceStyle.style_description}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {lookalikeData.referenceStyle.aesthetic_keywords.map((kw) => (
                      <span key={kw} className="pill" style={{ fontSize: 10, background: "#FFFFFF" }}>
                        ✨ {kw}
                      </span>
                    ))}
                    {lookalikeData.referenceStyle.detected_tools.map((t) => (
                      <span key={t} className="pill purple" style={{ fontSize: 10 }}>
                        ⚡ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setLookalikeData(null);
                  setLookalikeImageUrl("");
                }}
                className="button ghost small"
                style={{ fontSize: 12 }}
              >
                ✕ Clear Look-Alike
              </button>
            </div>
          </div>
        )}

        {/* Section Header, Saved Searches & Sort Options */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp">EXPLORE</span>
              <span className="pill purple">
                {lookalikeData ? `${lookalikeData.matches.length} Look-Alike Matches` : `${creators.length} Creators Available`}
              </span>
              {proofBackedOnly && (
                <span className="pill green" style={{ fontSize: 11 }}>
                  🛡️ Proof-Backed Only
                </span>
              )}
            </div>
            <h1 style={{ margin: "6px 0 2px", fontSize: 32, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.04em" }}>
              Discover Amazing Creators
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Find the perfect AI creator with verified pipelines, trust signals, and style alignment
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {/* Saved Searches Dropdown */}
            {savedSearches.length > 0 && (
              <select
                onChange={(e) => {
                  const s = savedSearches.find((item) => item.id === e.target.value);
                  if (s) handleApplySavedSearch(s);
                }}
                defaultValue=""
                className="select-field"
                style={{ width: "auto", minHeight: 38, padding: "0 12px", borderRadius: 10, fontSize: 12 }}
              >
                <option value="" disabled>🔖 Saved Searches ({savedSearches.length})</option>
                {savedSearches.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            )}

            {/* Save Current Search Button */}
            {(selectedGenre || selectedTool || selectedContentType || proofBackedOnly) && (
              <button
                onClick={() => setShowSaveModal(true)}
                className="button small secondary"
                style={{ fontSize: 12, minHeight: 38 }}
              >
                💾 Save Search
              </button>
            )}

            {/* Sort Options */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="select-field"
                style={{ width: "auto", minHeight: 38, padding: "0 12px", borderRadius: 10, fontSize: 13 }}
              >
                <option value="relevance">Relevance</option>
                <option value="heat">Trust & Heat Meter</option>
                <option value="followers">Most Followers</option>
                <option value="engagement">Highest Engagement</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="button small secondary filter-toggle-mobile"
        >
          <span>{showMobileFilters ? "▲ Hide Filters" : "⚡ Filter Creators (Genre, Tools, Format, Trust)"}</span>
        </button>

        {/* Layout with Sidebar Filters and Cards Grid */}
        <div className="discover-layout">
          {/* Left Filters Panel with Live Facet Counts */}
          <aside
            className={`surface tape-strip ${showMobileFilters ? "filter-panel-open" : "filter-panel-desktop"}`}
            style={{
              padding: 24,
              borderRadius: "20px 24px 18px 22px",
              border: "2.5px solid var(--ink)",
              boxShadow: "var(--shadow-comic)",
              background: "var(--surface)",
              position: "sticky",
              top: 96,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>Filters</h3>
              {(selectedContentType || selectedGenre || selectedTool || proofBackedOnly) && (
                <button
                  onClick={handleClearAll}
                  style={{ background: "none", border: "none", color: "var(--purple-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Verification & Trust Tier Filter */}
            <div style={{ marginBottom: 22, padding: "12px 14px", background: "var(--purple-soft)", borderRadius: 12, border: "1px solid var(--purple-line)" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink)", fontWeight: 750, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={proofBackedOnly}
                  onChange={(e) => setProofBackedOnly(e.target.checked)}
                  style={{ accentColor: "var(--purple-primary)", cursor: "pointer", width: 16, height: 16 }}
                />
                <span>🛡️ Proof-Backed Only</span>
              </label>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <small style={{ fontSize: 11, color: "var(--muted)" }}>
                  Verified workspace proof
                </small>
                <span className="pill green" style={{ fontSize: 10, padding: "1px 6px" }}>
                  {getFacetCount("proofBackedOnly", true)}
                </span>
              </div>
            </div>

            {/* Content Type Filter with Live Facet Counts */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                Content Type
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {CONTENT_TYPES.map((ct) => {
                  const count = getFacetCount("contentType", ct);
                  const isDimmed = count === 0;
                  return (
                    <label
                      key={ct}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                        color: isDimmed ? "var(--muted)" : "var(--pencil)",
                        opacity: isDimmed ? 0.45 : 1,
                        cursor: isDimmed ? "not-allowed" : "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="radio"
                          name="contentType"
                          disabled={isDimmed}
                          checked={selectedContentType === ct}
                          onChange={() => setSelectedContentType(selectedContentType === ct ? "" : ct)}
                          style={{ accentColor: "var(--purple-primary)", cursor: isDimmed ? "not-allowed" : "pointer" }}
                        />
                        <span>{ct}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Genre Filter with Live Facet Counts */}
            <div style={{ marginBottom: 22 }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                Genre
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {GENRES.map((g) => {
                  const count = getFacetCount("genre", g);
                  const isDimmed = count === 0;
                  return (
                    <label
                      key={g}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                        color: isDimmed ? "var(--muted)" : "var(--pencil)",
                        opacity: isDimmed ? 0.45 : 1,
                        cursor: isDimmed ? "not-allowed" : "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="radio"
                          name="genre"
                          disabled={isDimmed}
                          checked={selectedGenre === g}
                          onChange={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                          style={{ accentColor: "var(--purple-primary)", cursor: isDimmed ? "not-allowed" : "pointer" }}
                        />
                        <span>{g}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tools Filter with Live Facet Counts */}
            <div>
              <span style={{ display: "block", fontSize: 12, fontWeight: 750, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                AI Tools
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {TOOLS.map((t) => {
                  const count = getFacetCount("tool", t);
                  const isDimmed = count === 0;
                  return (
                    <label
                      key={t}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                        color: isDimmed ? "var(--muted)" : "var(--pencil)",
                        opacity: isDimmed ? 0.45 : 1,
                        cursor: isDimmed ? "not-allowed" : "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="radio"
                          name="tool"
                          disabled={isDimmed}
                          checked={selectedTool === t}
                          onChange={() => setSelectedTool(selectedTool === t ? "" : t)}
                          style={{ accentColor: "var(--purple-primary)", cursor: isDimmed ? "not-allowed" : "pointer" }}
                        />
                        <span>{t}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Creator Cards Grid or Empty State with Relaxations */}
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: 60, color: "var(--muted)" }}>
                Finding matching AI creators...
              </div>
            ) : creators.length === 0 ? (
              /* SMART EMPTY STATE & DETERMINISTIC RELAXATIONS */
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div
                  className="surface"
                  style={{
                    padding: 40,
                    textAlign: "center",
                    borderRadius: 20,
                    border: "1.5px solid var(--line-strong)",
                    background: "#FFFFFF",
                  }}
                >
                  <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🌸</span>
                  <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                    No exact match for this filter combination
                  </h3>
                  <p style={{ margin: "0 0 20px", color: "var(--pencil)", fontSize: 14, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
                    Your current criteria is very specific. Click any of the deterministic filter relaxations below to expand results.
                  </p>

                  {/* Filter Relaxation Chips sorted by Gain */}
                  {relaxationData && relaxationData.suggestions.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>
                        Suggested Relaxations (Sorted by Creators Unlocked):
                      </span>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                        {relaxationData.suggestions.map((s) => (
                          <button
                            key={s.filterKey}
                            onClick={() => handleApplyRelaxation(s.filterKey)}
                            className="button secondary small"
                            style={{
                              fontSize: 12,
                              padding: "6px 14px",
                              borderColor: "var(--purple-line)",
                              background: "var(--purple-soft)",
                            }}
                          >
                            <span>{s.label}</span>
                            <strong style={{ color: "var(--purple-primary)", marginLeft: 6 }}>
                              (+{s.gain} creators)
                            </strong>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button onClick={handleClearAll} className="button small ghost">
                    Reset All Filters
                  </button>
                </div>

                {/* Nearest Matches (Missed 1 requirement) */}
                {relaxationData && relaxationData.nearestMatches.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <span className="kanji-stamp">NEAR MATCH</span>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>
                        Nearest Matches (Missed only 1 requirement)
                      </h3>
                    </div>

                    <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                      {relaxationData.nearestMatches.map(({ creator, unmetCriteria }) => (
                        <div key={creator.creatorId || creator.uid} style={{ position: "relative" }}>
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              zIndex: 10,
                              background: "rgba(255, 237, 213, 0.96)",
                              border: "1px solid #FDBA74",
                              color: "#C2410C",
                              padding: "4px 8px",
                              borderRadius: 8,
                              fontSize: 10.5,
                              fontWeight: 800,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                            }}
                          >
                            ⚠️ {unmetCriteria[0]}
                          </div>
                          <CreatorCard creator={creator} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* RESULTS GRID */
              <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {creators.map((c) => (
                  <CreatorCard key={c.creatorId || c.uid} creator={c} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LOOK-ALIKE SEARCH MODAL */}
        {showLookalikeModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(31, 27, 44, 0.65)",
              backdropFilter: "blur(5px)",
              display: "grid",
              placeItems: "center",
              zIndex: 200,
              padding: 20,
            }}
          >
            <div className="surface" style={{ width: "min(520px, 100%)", padding: 32, borderRadius: 24, position: "relative" }}>
              <button
                onClick={() => setShowLookalikeModal(false)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="kanji-stamp">LOOK-ALIKE</span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Visual Style Look-Alike Search</h3>
              </div>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                Paste a reference creative image URL or style description. Gemini Vision analyzes lighting, framing, and tools to match identical aesthetics.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customLookalikeInput.trim()) return;
                  setShowLookalikeModal(false);
                  setLookalikeImageUrl(customLookalikeInput);
                  runLookAlikeSearch(customLookalikeInput);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    Reference Image URL or Style Prompt
                  </label>
                  <input
                    type="text"
                    className="field"
                    placeholder="https://images.unsplash.com/... or 'Cyberpunk Tokyo neon rain in 4K'"
                    value={customLookalikeInput}
                    onChange={(e) => setCustomLookalikeInput(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}>
                  <small style={{ color: "var(--muted)", fontSize: 11, width: "100%", display: "block" }}>Try sample reference pieces:</small>
                  {[
                    { label: "Tokyo Cyberpunk", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
                    { label: "Futuristic Fashion", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
                    { label: "Minimalist Product", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" },
                  ].map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => setCustomLookalikeInput(sample.url)}
                      className="pill purple"
                      style={{ fontSize: 11, cursor: "pointer" }}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                  <button type="button" onClick={() => setShowLookalikeModal(false)} className="button ghost">
                    Cancel
                  </button>
                  <button type="submit" disabled={analyzingLookalike} className="button">
                    {analyzingLookalike ? "Analyzing with Gemini..." : "Search Look-Alikes 🎨"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SAVE SEARCH MODAL */}
        {showSaveModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(31, 27, 44, 0.6)",
              backdropFilter: "blur(4px)",
              display: "grid",
              placeItems: "center",
              zIndex: 200,
              padding: 20,
            }}
          >
            <div className="surface" style={{ width: "min(460px, 100%)", padding: 28, borderRadius: 22, position: "relative" }}>
              <button
                onClick={() => setShowSaveModal(false)}
                style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)" }}
              >
                ✕
              </button>

              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>Save Search Criteria</h3>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
                Save this filter preset to quickly recall it from your brand dashboard.
              </p>

              {saveSuccessMsg ? (
                <div style={{ padding: 18, background: "#E8F5E9", color: "#2E7D32", borderRadius: 12, textAlign: "center", fontWeight: 700 }}>
                  {saveSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleSaveCurrentSearch} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Preset Name</label>
                    <input
                      type="text"
                      className="field"
                      placeholder="e.g. Q4 Runway Gen-3 Fashion Campaign"
                      value={saveTitle}
                      onChange={(e) => setSaveTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ padding: "10px 14px", background: "var(--surface-soft)", borderRadius: 10, fontSize: 12, color: "var(--pencil)" }}>
                    <strong>Active filters:</strong> {[selectedGenre, selectedTool, selectedContentType, proofBackedOnly ? "Proof-Backed" : ""].filter(Boolean).join(", ") || "All Creators"}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                    <button type="button" onClick={() => setShowSaveModal(false)} className="button ghost">
                      Cancel
                    </button>
                    <button type="submit" className="button">
                      Save Preset 💾
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </PublicLayout>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>Loading discover page...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
