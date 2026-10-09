"use client";

import { useEffect, useMemo, useState } from "react";
import { demoCreators } from "@/lib/demo-data";
import { fetchCreators } from "@/lib/api/creators";
import { Creator } from "@/types/creator";
import { CreatorCard } from "@/components/creator/CreatorCard";
import { FilterPanel } from "@/components/discovery/FilterPanel";
import { SearchBar } from "@/components/discovery/SearchBar";

export function CreatorResults() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All creators");
  const [creatorsList, setCreatorsList] = useState<Creator[]>(demoCreators);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCreators()
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setCreatorsList(data);
        }
      })
      .catch((err) => {
        console.warn("Backend not available, using demo dataset:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCreators = useMemo(() => {
    return creatorsList.filter((creator) => {
      const genresStr = creator.genres ? creator.genres.join(" ") : "";
      const toolsStr = creator.tools ? creator.tools.join(" ") : "";
      const text = `${creator.name || ""} ${creator.roleTitle || ""} ${creator.bio || ""} ${genresStr} ${toolsStr}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      const matchesCategory =
        category === "All creators" || (creator.genres && creator.genres.includes(category));
      return matchesQuery && matchesCategory;
    });
  }, [creatorsList, query, category]);

  return (
    <>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <span className="pill">
          ⌘ K <span style={{ color: "#737884" }}>quick search</span>
        </span>
      </div>

      <FilterPanel active={category} onChange={setCategory} />

      <div className="section-heading" style={{ marginTop: 27 }}>
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Curated for you
          </span>
          <h2>{filteredCreators.length} standout creators</h2>
        </div>
        <span className="pill purple">✧ AI-ranked discovery</span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
          <p>Loading curated creators…</p>
        </div>
      ) : filteredCreators.length > 0 ? (
        <div className="grid-3">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.creatorId || creator.uid} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="surface empty-state">
          <div className="empty-icon">⌕</div>
          <h3>No creators found</h3>
          <p>Try a different name, skill, or category to widen your search.</p>
          <button
            className="button secondary small"
            onClick={() => {
              setQuery("");
              setCategory("All creators");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
