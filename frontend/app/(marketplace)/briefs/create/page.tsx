"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { createBrief } from "@/lib/api/briefs";
import { enhanceBriefWithAI } from "@/lib/api/recommendations";
import { getStoredUser } from "@/lib/firebase/auth";

const CONTENT_TYPES = ["Reels", "YouTube", "Shorts", "Product Ads", "AI Films"];
const GENRES = ["Fashion", "Sneakers", "Beauty", "Tech", "Gaming", "Automotive", "Travel", "Food", "Art"];
const TOOLS = ["Runway", "Midjourney", "Adobe", "DaVinci Resolve", "Blender", "Stable Diffusion", "Unreal Engine"];
const PLATFORMS = ["Instagram & TikTok", "Instagram Reels", "YouTube", "TikTok", "Omnichannel"];
const ASPECT_RATIOS = ["9:16 (Vertical)", "16:9 (Cinematic)", "4:5 (Feed)", "1:1 (Square)"];
const LICENSING_OPTIONS = [
  "Commercial Digital Rights (12 Months)",
  "Full Worldwide Buyout",
  "Organic Social Only (6 Months)",
  "Perpetual Commercial Gaming License"
];

export default function CreateBriefPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // One-line idea state
  const [oneLineIdea, setOneLineIdea] = useState("");
  const [ideaCategory, setIdeaCategory] = useState("Fashion");

  // Step 1: Basics
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(["Reels", "Product Ads"]);
  const [platform, setPlatform] = useState("Instagram & TikTok");
  const [aspectRatio, setAspectRatio] = useState("9:16 (Vertical)");

  // Step 2: Requirements
  const [targetAudience, setTargetAudience] = useState("Gen Z & Millennial lifestyle and tech enthusiasts");
  const [deliverablesCount, setDeliverablesCount] = useState<number>(3);
  const [budget, setBudget] = useState("$4,000–$8,000");
  const [licensing, setLicensing] = useState("Commercial Digital Rights (12 Months)");
  const [deadline, setDeadline] = useState("30 Days");

  // Step 3: Preferences
  const [style, setStyle] = useState("Cinematic Anime Watercolor with Studio Lighting");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Fashion", "Tech"]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Prompt Engineering", "Color Grading"]);
  const [selectedTools, setSelectedTools] = useState<string[]>(["Midjourney", "Runway"]);
  const [visualAesthetic, setVisualAesthetic] = useState("Warm cream paper texture, deep ink lines, screentone dots, watercolor gradients");

  // AI Assistant state
  const [aiEnhancing, setAiEnhancing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusAction, setStatusAction] = useState<"open" | "draft">("open");

  const toggleContentType = (item: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGenre = (item: string) => {
    setSelectedGenres((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleTool = (item: string) => {
    setSelectedTools((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleGenerateFromIdea = async () => {
    const seed = oneLineIdea.trim() || title || "Cinematic sneaker launch with neon reflections";
    try {
      setAiEnhancing(true);
      const enhanced = await enhanceBriefWithAI({
        idea: seed,
        title: title || seed,
        description: description || seed,
        category: ideaCategory || selectedGenres[0] || "Fashion",
      });

      if (enhanced) {
        if (enhanced.title) setTitle(enhanced.title);
        if (enhanced.description) setDescription(enhanced.description);
        if (enhanced.budget) setBudget(enhanced.budget);
        if (enhanced.deadline) setDeadline(enhanced.deadline);
        if (enhanced.targetAudience) setTargetAudience(enhanced.targetAudience);
        if (enhanced.platform) setPlatform(enhanced.platform);
        if (enhanced.style) setStyle(enhanced.style);
        if (enhanced.aspectRatio) setAspectRatio(enhanced.aspectRatio);
        if (enhanced.licensing) setLicensing(enhanced.licensing);
        if (enhanced.visualAesthetic) setVisualAesthetic(enhanced.visualAesthetic);
        if (enhanced.deliverablesCount) setDeliverablesCount(enhanced.deliverablesCount);
        if (enhanced.contentTypes?.length) setSelectedContentTypes(enhanced.contentTypes);
        if (enhanced.genres?.length) setSelectedGenres(enhanced.genres);
        if (enhanced.preferredTools?.length) setSelectedTools(enhanced.preferredTools);
        if (enhanced.skills?.length) setSelectedSkills(enhanced.skills);
      }
    } catch {
      // Offline fallback
      setTitle(`${seed.slice(0, 35)} Campaign`);
      setDescription(`Comprehensive campaign exploring '${seed}' with cinematic anime lighting.`);
      setBudget("$5,000–$9,000");
    } finally {
      setAiEnhancing(false);
    }
  };

  const handleSubmit = async (status: "open" | "draft" = "open") => {
    try {
      setIsSubmitting(true);
      setStatusAction(status);
      const newBrief = await createBrief({
        title: title || "New Campaign Brief",
        description: description || "AI Visual Campaign",
        contentTypes: selectedContentTypes,
        platform,
        aspectRatio,
        style,
        genres: selectedGenres,
        skills: selectedSkills,
        budget,
        licensing,
        deliverablesCount,
        deadline,
        targetAudience,
        preferredTools: selectedTools,
        visualAesthetic,
      });

      router.push(`/briefs/${newBrief.id}`);
    } catch {
      router.push("/dashboard/brand/briefs");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="kanji-stamp">IDEAS</span>
              <span className="pill purple">Brief Generator</span>
            </div>
            <h1 style={{ margin: "4px 0", fontSize: 34, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em" }}>
              AI Campaign Brief Generator
            </h1>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)" }}>
              Transform a one-line concept into a structured, editable production brief, then publish or save as draft.
            </p>
          </div>

          {/* ONE-LINE IDEA GENERATOR BOX */}
          <div
            className="surface"
            style={{
              padding: "20px 24px",
              borderRadius: 20,
              border: "2px solid var(--purple-line)",
              background: "#FFFFFF",
              marginBottom: 32,
              boxShadow: "0 6px 20px rgba(108, 92, 231, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <strong style={{ fontSize: 15, color: "var(--ink)" }}>One-Line Idea Generator (Powered by Gemini)</strong>
              <span className="pill purple" style={{ fontSize: 10, marginLeft: "auto" }}>Instant Structuring</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 200px auto", gap: 12, alignItems: "center" }}>
              <input
                type="text"
                className="field"
                placeholder="e.g. Futuristic cyberpunk sneakers with liquid sole effects and rain reflections"
                value={oneLineIdea}
                onChange={(e) => setOneLineIdea(e.target.value)}
              />
              <select
                className="field"
                value={ideaCategory}
                onChange={(e) => setIdeaCategory(e.target.value)}
                style={{ padding: "10px 12px" }}
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleGenerateFromIdea}
                disabled={aiEnhancing}
                className="button"
                style={{ whiteSpace: "nowrap", padding: "10px 20px" }}
              >
                {aiEnhancing ? "Structuring with AI..." : "✨ Generate Brief"}
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "14px 24px",
              background: "#FFFFFF",
              borderRadius: 18,
              border: "1.5px solid var(--line)",
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            {[
              { num: 1, label: "Basics & Formats" },
              { num: 2, label: "Scope & Budget" },
              { num: 3, label: "Aesthetic & Tools" },
              { num: 4, label: "Review & Publish" },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => setStep(s.num as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  color: step === s.num ? "var(--purple-primary)" : "var(--muted)",
                  fontWeight: step === s.num ? 800 : 500,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    background: step === s.num ? "var(--purple-primary)" : "var(--surface-soft)",
                    color: step === s.num ? "#FFFFFF" : "var(--muted)",
                    border: step === s.num ? "none" : "1px solid var(--line)",
                  }}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
                {s.num < 4 && <span style={{ color: "var(--line-strong)", marginLeft: 6 }}>—</span>}
              </div>
            ))}
          </div>

          {/* Form Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr", gap: 32, alignItems: "start" }}>
            <div className="surface" style={{ padding: 32, borderRadius: 24, border: "1.5px solid var(--line)" }}>
              {/* STEP 1: BASICS */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      className="field"
                      placeholder="e.g. Cinematic Sneaker Launch: Quantum-X"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Creative Brief Description
                    </label>
                    <textarea
                      className="textarea-field"
                      placeholder="Describe the campaign narrative, emotional hook, product focus, and aesthetic vision..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                        Primary Platform
                      </label>
                      <select
                        className="field"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                      >
                        {PLATFORMS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                        Aspect Ratio
                      </label>
                      <select
                        className="field"
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                      >
                        {ASPECT_RATIOS.map((ar) => (
                          <option key={ar} value={ar}>{ar}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 10 }}>
                      Content Types
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {CONTENT_TYPES.map((ct) => (
                        <button
                          key={ct}
                          type="button"
                          onClick={() => toggleContentType(ct)}
                          className={`pill ${selectedContentTypes.includes(ct) ? "purple" : ""}`}
                          style={{ padding: "8px 16px", cursor: "pointer", fontSize: 12.5, fontWeight: 700 }}
                        >
                          {selectedContentTypes.includes(ct) ? "✓ " : "+ "}
                          {ct}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                    <button type="button" onClick={() => setStep(2)} className="button">
                      Next: Scope & Budget →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: REQUIREMENTS & BUDGET */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Target Audience
                    </label>
                    <input
                      type="text"
                      className="field"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                        Commercial Budget
                      </label>
                      <input
                        type="text"
                        className="field"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                        Campaign Deadline
                      </label>
                      <input
                        type="text"
                        className="field"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Licensing & Usage Rights
                    </label>
                    <select
                      className="field"
                      value={licensing}
                      onChange={(e) => setLicensing(e.target.value)}
                    >
                      {LICENSING_OPTIONS.map((lic) => (
                        <option key={lic} value={lic}>{lic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Number of Deliverables: {deliverablesCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={deliverablesCount}
                      onChange={(e) => setDeliverablesCount(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--purple-primary)" }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button type="button" onClick={() => setStep(1)} className="button secondary">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="button">
                      Next: Aesthetic & Tools →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PREFERENCES */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Visual Style Direction
                    </label>
                    <input
                      type="text"
                      className="field"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 10 }}>
                      Campaign Genres
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {GENRES.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGenre(g)}
                          className={`pill ${selectedGenres.includes(g) ? "purple" : ""}`}
                          style={{ padding: "8px 14px", cursor: "pointer", fontSize: 12 }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 10 }}>
                      Preferred AI Tools
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {TOOLS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleTool(t)}
                          className={`pill ${selectedTools.includes(t) ? "purple" : ""}`}
                          style={{ padding: "8px 14px", cursor: "pointer", fontSize: 12 }}
                        >
                          ⚡ {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 750, color: "var(--ink)", marginBottom: 8 }}>
                      Visual Aesthetic & Color Grading
                    </label>
                    <textarea
                      className="textarea-field"
                      value={visualAesthetic}
                      onChange={(e) => setVisualAesthetic(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <button type="button" onClick={() => setStep(2)} className="button secondary">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setStep(4)} className="button">
                      Next: Review & Save →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW, SAVE & PUBLISH */}
              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ padding: 22, background: "var(--purple-soft)", borderRadius: 18, border: "1.5px solid var(--purple-line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span className="pill purple" style={{ fontSize: 10 }}>Brief Overview</span>
                      <span className="pill" style={{ fontSize: 10 }}>{platform}</span>
                    </div>
                    <h3 style={{ margin: "4px 0 8px", fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>
                      {title || "Untitled Campaign"}
                    </h3>
                    <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--pencil)", lineHeight: 1.6 }}>
                      {description || "No description provided."}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, borderTop: "1px solid var(--purple-line)", paddingTop: 12 }}>
                      <div>Budget: <strong>{budget}</strong></div>
                      <div>Deadline: <strong>{deadline}</strong></div>
                      <div>Deliverables: <strong>{deliverablesCount} items ({aspectRatio})</strong></div>
                      <div>Licensing: <strong>{licensing}</strong></div>
                      <div>Style: <strong>{style}</strong></div>
                      <div>Tools: <strong>{selectedTools.join(", ")}</strong></div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <button type="button" onClick={() => setStep(3)} className="button secondary">
                      ← Back
                    </button>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        type="button"
                        onClick={() => handleSubmit("draft")}
                        disabled={isSubmitting}
                        className="button secondary"
                      >
                        {isSubmitting && statusAction === "draft" ? "Saving..." : "Save as Draft 💾"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSubmit("open")}
                        disabled={isSubmitting}
                        className="button"
                      >
                        {isSubmitting && statusAction === "open" ? "Publishing..." : "Publish Campaign Brief 🚀"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Guide Column */}
            <div
              className="surface"
              style={{
                borderRadius: 24,
                overflow: "hidden",
                border: "1.5px solid var(--line-strong)",
                background: "#FFFFFF",
              }}
            >
              <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80"
                  alt="Notebook and camera"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: 14, right: 14 }}>
                  <span className="kanji-stamp" style={{ background: "#FFFFFF" }}>CREATE</span>
                </div>
              </div>
              <div style={{ padding: 22 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                  Structured Brief Checklist
                </h4>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.8 }}>
                  <li><strong>Platform & Aspect:</strong> e.g. 9:16 vertical for Reels/Shorts.</li>
                  <li><strong>Licensing:</strong> Define whether rights are digital or full buyout.</li>
                  <li><strong>Tools:</strong> List preferred models like Runway or Midjourney.</li>
                  <li><strong>AI Matchmaking:</strong> Published briefs immediately query and rank creators on Firestore.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
