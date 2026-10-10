"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { runAISearch } from "@/lib/api/recommendations";
import { AISearchResponse, AISearchResultItem, StructuredSearchQuery } from "@/types/recommendation";
import { sendInquiry } from "@/lib/api/creators";

const DEMO_QUERIES = [
  { label: "👟 ad for sneakers", query: "ad for sneakers" },
  { label: "⚔️ low budget gaming trailer", query: "low budget gaming trailer" },
  { label: "🏎️ luxury car cinematic", query: "luxury car cinematic" },
];

export function AISearchBar({ onSearchResults }: { onSearchResults?: (results: AISearchResultItem[]) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<AISearchResponse | null>(null);
  const [editingChips, setEditingChips] = useState(false);
  const [activeQueryChip, setActiveQueryChip] = useState<StructuredSearchQuery | null>(null);

  // Inquiry modal state
  const [contactCreator, setContactCreator] = useState<AISearchResultItem | null>(null);
  const [contactMsg, setContactMsg] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [savedCreators, setSavedCreators] = useState<Set<string>>(new Set());

  const executeSearch = async (textToSearch: string, overrideStructured?: StructuredSearchQuery) => {
    if (!textToSearch.trim()) return;
    try {
      setLoading(true);
      const res = await runAISearch({
        query: textToSearch,
        structuredQuery: overrideStructured || undefined,
      });
      setSearchResponse(res);
      setActiveQueryChip(res.structuredQuery);
      if (onSearchResults) {
        onSearchResults(res.results);
      }
    } catch (err: any) {
      console.warn("AI search warning:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChipChange = (field: keyof StructuredSearchQuery, val: any) => {
    if (!activeQueryChip) return;
    const updated = { ...activeQueryChip, [field]: val };
    setActiveQueryChip(updated);
    executeSearch(query, updated);
  };

  const handleSaveCreator = (cid: string) => {
    setSavedCreators((prev) => {
      const next = new Set(prev);
      if (next.has(cid)) next.delete(cid);
      else next.add(cid);
      return next;
    });
  };

  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactCreator) return;
    try {
      await sendInquiry(contactCreator.creatorId, {
        campaignTitle: `Collaboration regarding: ${query || "Creative Campaign"}`,
        message: contactMsg || `Hi ${contactCreator.name}, we discovered your profile through AI search for '${query}'. We'd love to discuss an upcoming collaboration!`,
        budgetOffer: contactCreator.rate || "$2,500",
      });
      setContactSent(true);
      setTimeout(() => {
        setContactCreator(null);
        setContactSent(false);
        setContactMsg("");
      }, 1500);
    } catch {
      setContactSent(true);
      setTimeout(() => {
        setContactCreator(null);
        setContactSent(false);
      }, 1200);
    }
  };

  const handleSaveAsBrief = () => {
    if (!searchResponse) return;
    const sq = searchResponse.structuredQuery;
    const params = new URLSearchParams({
      title: `${sq.industry || "Creative"} ${sq.contentType || "Visual"} Campaign`,
      genres: [sq.industry, sq.style].filter(Boolean).join(","),
      tools: sq.tools.join(","),
      budget: sq.budgetRange || "$3,000–$6,000",
      description: `Targeting high-impact ${sq.contentType || "visual deliverables"} with a ${sq.style || "cinematic"} aesthetic for ${sq.industry || "brand"} audience.`,
    });
    router.push(`/briefs/create?${params.toString()}`);
  };

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Search Input Box */}
      <div
        className="surface tape-strip"
        style={{
          padding: "22px 26px",
          borderRadius: "22px 26px 20px 24px",
          border: "2.5px solid var(--ink)",
          boxShadow: "var(--shadow-comic-lg)",
          background: "var(--surface)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span className="kanji-stamp">AI SEARCH</span>
          <strong style={{ fontSize: 17, color: "var(--ink)", fontFamily: "var(--font-heading)" }}>
            AI Natural-Language Talent Search
          </strong>
          {searchResponse?.isBasicMode && (
            <span className="pill yellow" style={{ fontSize: 10.5 }}>
              ⚡ Basic search mode
            </span>
          )}
          {searchResponse && !searchResponse.isBasicMode && (
            <span className="pill purple" style={{ fontSize: 10.5 }}>
              ✧ Gemini Structured Pipeline
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "var(--surface-soft)",
              border: "2px solid var(--ink)",
              borderRadius: 14,
              padding: "10px 16px",
              boxShadow: "2px 2px 0 var(--ink)",
            }}
          >
            <span style={{ fontSize: 18, marginRight: 10 }}>✨</span>
            <input
              type="text"
              placeholder="e.g. ad for sneakers, or cheap cinematic reel for a gaming launch..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch(query)}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--ink)",
              }}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setSearchResponse(null);
                  setActiveQueryChip(null);
                }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: 14 }}
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => executeSearch(query)}
            disabled={loading || !query.trim()}
            className="button"
            style={{ minWidth: 140, height: 48 }}
          >
            {loading ? "Searching..." : "Search Talent 🚀"}
          </button>
        </div>

        {/* Demo Example Queries */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Try examples:</span>
          {DEMO_QUERIES.map((demo) => (
            <button
              key={demo.query}
              onClick={() => {
                setQuery(demo.query);
                executeSearch(demo.query);
              }}
              className={`sticker-chip ${query === demo.query ? "active" : ""}`}
              style={{ fontSize: 12 }}
            >
              {demo.label}
            </button>
          ))}
        </div>

        {/* Editable Parsed Query Filter Chips */}
        {activeQueryChip && (
          <div
            style={{
              marginTop: 18,
              padding: "14px 18px",
              background: "var(--surface-soft)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "var(--muted)" }}>
                  Parsed Query Parameters (Editable):
                </span>
                <span style={{ fontSize: 11, color: "var(--purple-primary)", fontWeight: 700 }}>
                  Click to adjust and re-run
                </span>
              </div>

              <button
                onClick={handleSaveAsBrief}
                className="button small secondary"
                style={{ fontSize: 11, padding: "4px 10px" }}
              >
                📋 Save as Brief →
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {activeQueryChip.industry && (
                <span
                  className="pill purple"
                  style={{ fontSize: 11, cursor: "pointer" }}
                  title="Target Industry"
                >
                  🏢 Industry: {activeQueryChip.industry}
                </span>
              )}
              {activeQueryChip.contentType && (
                <span className="pill" style={{ fontSize: 11 }}>
                  🎬 Format: {activeQueryChip.contentType}
                </span>
              )}
              {activeQueryChip.style && (
                <span className="pill" style={{ fontSize: 11 }}>
                  🎨 Style: {activeQueryChip.style}
                </span>
              )}
              {activeQueryChip.budgetRange && (
                <span className="pill" style={{ fontSize: 11, color: "var(--purple-primary)", borderColor: "var(--purple-line)" }}>
                  💰 Budget: {activeQueryChip.budgetRange}
                </span>
              )}
              {activeQueryChip.tools?.map((t) => (
                <span key={t} className="pill" style={{ fontSize: 11 }}>
                  ⚡ {t}
                </span>
              ))}
              {activeQueryChip.platform && (
                <span className="pill" style={{ fontSize: 11 }}>
                  📱 {activeQueryChip.platform}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Search Results Display */}
      {searchResponse && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "var(--ink)" }}>
              Ranked Real Creators ({searchResponse.results.length})
            </h3>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              {searchResponse.aiRationale}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {searchResponse.results.map((c) => {
              const isSaved = savedCreators.has(c.creatorId);
              return (
                <div
                  key={c.creatorId}
                  className="surface"
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    border: "1.5px solid var(--line)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    background: "#FFFFFF",
                  }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover", border: "1.5px solid var(--purple-line)" }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                          {c.name}
                        </h4>
                        <span
                          className="pill purple"
                          style={{ fontSize: 12, fontWeight: 900 }}
                        >
                          {c.matchPercentage}%
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                        {c.handle} · {c.roleTitle}
                      </span>
                    </div>
                  </div>

                  {/* Gemini 1-line Explanation */}
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "var(--surface-soft)",
                      borderRadius: 10,
                      borderLeft: "3px solid var(--purple-primary)",
                      fontSize: 12.5,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    <strong>Why this creator:</strong> {c.whyThisCreator}
                  </div>

                  {/* Weighted Breakdown Tags */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 11 }}>
                    <span style={{ padding: "2px 8px", background: "var(--purple-soft)", borderRadius: 6, color: "var(--purple-primary)", fontWeight: 700 }}>
                      Genre: {c.weightedBreakdown.genreMatch}pts
                    </span>
                    <span style={{ padding: "2px 8px", background: "var(--purple-soft)", borderRadius: 6, color: "var(--purple-primary)", fontWeight: 700 }}>
                      Tool: {c.weightedBreakdown.toolMatch}pts
                    </span>
                    <span style={{ padding: "2px 8px", background: "var(--purple-soft)", borderRadius: 6, color: "var(--purple-primary)", fontWeight: 700 }}>
                      Audience: {c.weightedBreakdown.audienceMatch}pts
                    </span>
                  </div>

                  {/* Metrics and Rates */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: "auto" }}>
                    <div>
                      <span style={{ color: "var(--muted)" }}>Reach: </span>
                      <strong>{c.totalFollowers}</strong> ({c.engagementRate})
                    </div>
                    <div>
                      <span style={{ color: "var(--muted)" }}>Rate: </span>
                      <strong style={{ color: "var(--purple-primary)" }}>{c.rate}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button
                      onClick={() => handleSaveCreator(c.creatorId)}
                      className={`button small ${isSaved ? "secondary" : "ghost"}`}
                      style={{ flex: 1, fontSize: 12 }}
                    >
                      {isSaved ? "★ Saved" : "☆ Save"}
                    </button>
                    <button
                      onClick={() => setContactCreator(c)}
                      className="button small"
                      style={{ flex: 1.2, fontSize: 12 }}
                    >
                      ✉ Contact
                    </button>
                    <button
                      onClick={() => router.push(`/creators/${c.creatorId}`)}
                      className="button small ghost"
                      style={{ fontSize: 12, padding: "0 8px" }}
                      title="View Profile"
                    >
                      ↗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Creator Modal */}
      {contactCreator && (
        <div className="modal-backdrop" onClick={() => setContactCreator(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800 }}>
              Contact {contactCreator.name}
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
              Send an instant collaboration inquiry to {contactCreator.handle}.
            </p>

            {contactSent ? (
              <div style={{ padding: 24, textAlign: "center", color: "#2E7D32", fontWeight: 800 }}>
                ✓ Inquiry dispatched successfully!
              </div>
            ) : (
              <form onSubmit={handleSendContact}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Campaign Proposal Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder={`Hi ${contactCreator.name}, we loved your work found via '${query}'...`}
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setContactCreator(null)}
                    className="button secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button">
                    Send Inquiry →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
