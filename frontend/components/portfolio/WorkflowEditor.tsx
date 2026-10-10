"use client";

import { useState } from "react";
import { WorkflowData, WorkflowTool, WorkflowStep, WorkflowSuggestionResult } from "@/types/portfolio";
import { suggestPortfolioWorkflow } from "@/lib/api/portfolios";

const POPULAR_TOOLS: Array<{ name: string; kind: "model" | "app"; defaultVersion?: string }> = [
  { name: "Midjourney", kind: "model", defaultVersion: "v6" },
  { name: "Runway", kind: "model", defaultVersion: "Gen-3 Alpha" },
  { name: "Kling AI", kind: "model", defaultVersion: "v1.5" },
  { name: "Sora", kind: "model", defaultVersion: "v1" },
  { name: "Stable Diffusion", kind: "model", defaultVersion: "SDXL" },
  { name: "ComfyUI", kind: "app", defaultVersion: "v0.2" },
  { name: "Blender", kind: "app", defaultVersion: "4.2 LTS" },
  { name: "DaVinci Resolve", kind: "app", defaultVersion: "19 Studio" },
  { name: "ElevenLabs", kind: "model", defaultVersion: "v2" },
  { name: "Topaz Video AI", kind: "app", defaultVersion: "v4" },
  { name: "Photoshop", kind: "app", defaultVersion: "2024" },
  { name: "Magnific AI", kind: "model", defaultVersion: "v2" },
];

interface WorkflowEditorProps {
  value: WorkflowData;
  onChange: (data: WorkflowData) => void;
  pieceTitle: string;
  pieceDescription: string;
  genre?: string;
  contentType?: string;
  referenceFile: File | null;
  onReferenceFileChange: (file: File | null) => void;
}

export function WorkflowEditor({
  value,
  onChange,
  pieceTitle,
  pieceDescription,
  genre = "Art",
  contentType = "AI Films",
  referenceFile,
  onReferenceFileChange,
}: WorkflowEditorProps) {
  const [toolSearch, setToolSearch] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [suggestedData, setSuggestedData] = useState<WorkflowSuggestionResult | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Tools management
  const handleAddTool = (tool: { name: string; kind: "model" | "app"; version?: string }) => {
    if (value.tools.some((t) => t.name.toLowerCase() === tool.name.toLowerCase())) return;
    onChange({
      ...value,
      tools: [...value.tools, { name: tool.name, kind: tool.kind, version: tool.version || "" }],
    });
    setToolSearch("");
  };

  const handleRemoveTool = (toolName: string) => {
    onChange({
      ...value,
      tools: value.tools.filter((t) => t.name !== toolName),
    });
  };

  const handleCustomToolAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && toolSearch.trim()) {
      e.preventDefault();
      handleAddTool({ name: toolSearch.trim(), kind: "model" });
    }
  };

  // Steps management
  const handleAddStep = () => {
    const nextOrder = value.steps.length + 1;
    const defaultTool = value.tools[0]?.name || "Midjourney";
    const newStep: WorkflowStep = {
      order: nextOrder,
      title: `Step ${nextOrder}: Production Stage`,
      tool: defaultTool,
      description: "",
      minutes: 30,
    };
    const updatedSteps = [...value.steps, newStep];
    const newHours = Number((updatedSteps.reduce((acc, s) => acc + (s.minutes || 0), 0) / 60).toFixed(1));
    onChange({
      ...value,
      steps: updatedSteps,
      totalHours: Math.max(0.5, newHours),
    });
  };

  const handleUpdateStep = (index: number, updates: Partial<WorkflowStep>) => {
    const updated = [...value.steps];
    updated[index] = { ...updated[index], ...updates };
    const newHours = Number((updated.reduce((acc, s) => acc + (s.minutes || 0), 0) / 60).toFixed(1));
    onChange({
      ...value,
      steps: updated,
      totalHours: Math.max(0.5, newHours),
    });
  };

  const handleRemoveStep = (index: number) => {
    const updated = value.steps
      .filter((_, i) => i !== index)
      .map((step, idx) => ({ ...step, order: idx + 1 }));
    const newHours = Number((updated.reduce((acc, s) => acc + (s.minutes || 0), 0) / 60).toFixed(1));
    onChange({
      ...value,
      steps: updated,
      totalHours: Math.max(0.5, newHours),
    });
  };

  const handleMoveStep = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === value.steps.length - 1)) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const copy = [...value.steps];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    const reordered = copy.map((step, idx) => ({ ...step, order: idx + 1 }));
    onChange({
      ...value,
      steps: reordered,
    });
  };

  // Gemini suggest trigger
  const handleAskGeminiSuggestions = async () => {
    if (!pieceTitle.trim()) {
      alert("Please provide a title for the piece first so Gemini can analyze the context.");
      return;
    }
    try {
      setSuggesting(true);
      const res = await suggestPortfolioWorkflow({
        title: pieceTitle,
        description: pieceDescription,
        genre,
        contentType,
      });
      setSuggestedData(res);
      setShowReviewModal(true);
    } catch (err: any) {
      alert("Could not load AI workflow suggestions: " + err.message);
    } finally {
      setSuggesting(false);
    }
  };

  const handleConfirmSuggestions = () => {
    if (!suggestedData) return;
    onChange({
      ...value,
      tools: suggestedData.tools,
      steps: suggestedData.steps,
      totalHours: suggestedData.totalHours || 2.0,
      promptText: suggestedData.suggestedPrompt || value.promptText,
    });
    setShowReviewModal(false);
    setSuggestedData(null);
  };

  const filteredPresetTools = POPULAR_TOOLS.filter((t) =>
    t.name.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header bar with AI Suggest button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp" style={{ fontSize: 10, padding: "2px 6px" }}>WORKFLOW</span>
            <strong style={{ fontSize: 15, color: "var(--ink)" }}>How Was This Piece Made?</strong>
          </div>
          <small style={{ color: "var(--muted)", fontSize: 12 }}>
            Disclose tools, steps, and prompt to earn higher Trust tiers and brand transparency.
          </small>
        </div>

        <button
          type="button"
          onClick={handleAskGeminiSuggestions}
          disabled={suggesting}
          className="button small secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}
        >
          <span>✨</span>
          {suggesting ? "Gemini analyzing..." : "Suggest from description"}
        </button>
      </div>

      {/* 1. TOOLS & PIPELINE PICKER */}
      <div style={{ padding: 18, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>
            Generative Models & Creative Apps
          </label>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{value.tools.length} tools added</span>
        </div>

        {/* Selected Tool Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {value.tools.length === 0 ? (
            <span style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
              No tools added yet. Search or select from below:
            </span>
          ) : (
            value.tools.map((t) => (
              <span
                key={t.name}
                className={`pill ${t.kind === "model" ? "purple" : ""}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <span>{t.kind === "model" ? "🤖" : "🎨"}</span>
                <span>{t.name}</span>
                {t.version && <small style={{ opacity: 0.7 }}>({t.version})</small>}
                <button
                  type="button"
                  onClick={() => handleRemoveTool(t.name)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    lineHeight: 1,
                    marginLeft: 2,
                    color: "inherit",
                    padding: 0,
                  }}
                  title="Remove tool"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>

        {/* Search & free-text input */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <input
            type="text"
            className="field"
            placeholder="Search tools or type custom tool name + press Enter..."
            value={toolSearch}
            onChange={(e) => setToolSearch(e.target.value)}
            onKeyDown={handleCustomToolAdd}
            style={{ fontSize: 12.5 }}
          />
        </div>

        {/* Quick Click Preset Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 110, overflowY: "auto" }}>
          {filteredPresetTools.map((pt) => {
            const isSelected = value.tools.some((t) => t.name.toLowerCase() === pt.name.toLowerCase());
            return (
              <button
                key={pt.name}
                type="button"
                onClick={() => handleAddTool({ name: pt.name, kind: pt.kind, version: pt.defaultVersion })}
                disabled={isSelected}
                style={{
                  padding: "4px 9px",
                  borderRadius: 10,
                  border: isSelected ? "1px solid var(--purple-line)" : "1px solid var(--line)",
                  background: isSelected ? "var(--purple-soft)" : "var(--surface-soft)",
                  color: isSelected ? "var(--purple-primary)" : "var(--pencil)",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: isSelected ? "default" : "pointer",
                  opacity: isSelected ? 0.6 : 1,
                }}
              >
                + {pt.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. REORDERABLE TIMELINE STEPS */}
      <div style={{ padding: 18, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", display: "block" }}>
              Sequential Production Timeline ({value.steps.length} Steps)
            </label>
            <small style={{ color: "var(--muted)", fontSize: 11 }}>
              Total Time: <strong>{value.totalHours} hrs</strong> ({Math.round(value.totalHours * 60)} min)
            </small>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            className="button small ghost"
            style={{ fontSize: 11.5, fontWeight: 700 }}
          >
            + Add Step
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {value.steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr 140px 90px 70px",
                gap: 8,
                alignItems: "center",
                padding: "10px 12px",
                background: "var(--surface-soft)",
                borderRadius: 12,
                border: "1px solid var(--line)",
              }}
            >
              {/* Step Number & Reorder */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "var(--purple-primary)" }}>#{step.order}</span>
                <div style={{ display: "flex", gap: 2 }}>
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, "up")}
                    disabled={idx === 0}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 9, padding: 0, opacity: idx === 0 ? 0.3 : 1 }}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, "down")}
                    disabled={idx === value.steps.length - 1}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 9, padding: 0, opacity: idx === value.steps.length - 1 ? 0.3 : 1 }}
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <input
                  type="text"
                  className="field"
                  value={step.title}
                  onChange={(e) => handleUpdateStep(idx, { title: e.target.value })}
                  placeholder="Step title, e.g. Motion Synthesis"
                  style={{ padding: "6px 10px", fontSize: 12, marginBottom: 4 }}
                />
                <input
                  type="text"
                  className="field"
                  value={step.description}
                  onChange={(e) => handleUpdateStep(idx, { description: e.target.value })}
                  placeholder="Notes, prompts, camera settings..."
                  style={{ padding: "4px 10px", fontSize: 11, background: "#FFFFFF" }}
                />
              </div>

              {/* Tool Selector */}
              <div>
                <select
                  value={step.tool}
                  onChange={(e) => handleUpdateStep(idx, { tool: e.target.value })}
                  className="select-field"
                  style={{ padding: "6px 8px", fontSize: 11 }}
                >
                  {value.tools.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                  {!value.tools.some((t) => t.name === step.tool) && (
                    <option value={step.tool}>{step.tool}</option>
                  )}
                </select>
              </div>

              {/* Duration in Minutes */}
              <div>
                <input
                  type="number"
                  min={5}
                  step={5}
                  className="field"
                  value={step.minutes}
                  onChange={(e) => handleUpdateStep(idx, { minutes: Number(e.target.value) || 10 })}
                  style={{ padding: "6px 8px", fontSize: 11, textAlign: "center" }}
                  title="Duration in minutes"
                />
                <span style={{ fontSize: 10, color: "var(--muted)", display: "block", textAlign: "center" }}>min</span>
              </div>

              {/* Delete Step */}
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FF4757",
                    cursor: "pointer",
                    fontSize: 14,
                    padding: 4,
                  }}
                  title="Delete step"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REFERENCE IMAGE & BEFORE-AFTER COMPARISON */}
      <div style={{ padding: 18, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--line)" }}>
        <label style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", display: "block", marginBottom: 4 }}>
          Optional: Starting Reference Image (For Before/After Comparison Slider)
        </label>
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--muted)" }}>
          Upload the original photo, sketch, or moodboard frame that was fed into the AI pipeline. Viewers can interactively slide between this reference and your final piece.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onReferenceFileChange(e.target.files?.[0] || null)}
            style={{ fontSize: 12 }}
          />
          {referenceFile && (
            <span className="pill" style={{ fontSize: 11, color: "#2E7D32" }}>
              ✓ Reference loaded: {referenceFile.name}
            </span>
          )}
        </div>
      </div>

      {/* 4. PROMPT TEXT & VISIBILITY TOGGLE */}
      <div style={{ padding: 18, background: "#FFFFFF", borderRadius: 16, border: "1.5px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>
            Generation Prompt
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)" }}>Visibility:</span>
            <button
              type="button"
              onClick={() => onChange({ ...value, promptVisibility: value.promptVisibility === "public" ? "private" : "public" })}
              className={`pill ${value.promptVisibility === "public" ? "purple" : ""}`}
              style={{ cursor: "pointer", fontSize: 11, padding: "3px 10px" }}
            >
              {value.promptVisibility === "public" ? "🌐 Public (Brands can view)" : "🔒 Private (Hidden)"}
            </button>
          </div>
        </div>

        <textarea
          className="textarea-field"
          rows={3}
          placeholder="e.g. /imagine Cinematic slow-motion macro shot of botanical serum droplets on wet emerald leaves, 8k..."
          value={value.promptText || ""}
          onChange={(e) => onChange({ ...value, promptText: e.target.value })}
          style={{ fontSize: 12.5 }}
        />
        <small style={{ color: "var(--muted)", fontSize: 11, display: "block", marginTop: 4 }}>
          {value.promptVisibility === "public"
            ? "Notice: Public prompts are shown directly inside the portfolio viewer to prove prompt craft."
            : "Private prompts remain confidential and will show a locked badge in the viewer."}
        </small>
      </div>

      {/* REVIEW & CONFIRM AI SUGGESTION MODAL */}
      {showReviewModal && suggestedData && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18, 12, 32, 0.75)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            className="surface"
            style={{
              width: "min(620px, 100%)",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: 28,
              borderRadius: 22,
              border: "2px solid var(--purple-line)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="kanji-stamp">AI REVIEW</span>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>Gemini Proposed Workflow</h3>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
              {suggestedData.rationale}
            </p>

            <div style={{ marginBottom: 14 }}>
              <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>
                Proposed Tools ({suggestedData.tools.length}):
              </strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {suggestedData.tools.map((t) => (
                  <span key={t.name} className="pill purple" style={{ fontSize: 11 }}>
                    {t.name} {t.version ? `(${t.version})` : ""}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>
                Proposed Steps ({suggestedData.steps.length}):
              </strong>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {suggestedData.steps.map((s) => (
                  <div key={s.order} style={{ padding: "8px 12px", background: "var(--surface-soft)", borderRadius: 10, fontSize: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                      <span>Step {s.order}: {s.title}</span>
                      <span style={{ color: "var(--purple-primary)" }}>{s.tool} · {s.minutes}m</span>
                    </div>
                    <p style={{ margin: "4px 0 0", color: "var(--pencil)", fontSize: 11.5 }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {suggestedData.suggestedPrompt && (
              <div style={{ marginBottom: 20 }}>
                <strong style={{ fontSize: 12, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>
                  Suggested Prompt:
                </strong>
                <code style={{ display: "block", padding: 10, background: "#FFFFFF", borderRadius: 8, border: "1px solid var(--line)", fontSize: 11, wordBreak: "break-all" }}>
                  {suggestedData.suggestedPrompt}
                </code>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="button ghost"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleConfirmSuggestions}
                className="button"
              >
                Apply to Workflow ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
