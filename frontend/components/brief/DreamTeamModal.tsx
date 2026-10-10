"use client";

import { useState } from "react";
import { buildDreamTeam } from "@/lib/api/recommendations";
import { DreamTeamResponse } from "@/types/recommendation";
import { Brief } from "@/types/brief";

export function DreamTeamModal({
  brief,
  isOpen,
  onClose,
}: {
  brief?: Brief | any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [squad, setSquad] = useState<DreamTeamResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await buildDreamTeam({
        briefId: brief?.id,
        title: brief?.title || "Cinematic Campaign",
        description: brief?.description || "High-energy commercial launch",
        genres: brief?.genres || ["Fashion", "Tech"],
        budget: brief?.budget || "$6,000–$12,000",
      });
      setSquad(res);
    } catch (e) {
      console.warn("Dream team build error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleExportProposal = () => {
    if (!squad) return;
    const proposalText = `
CREATORA AI - DREAM TEAM PROPOSAL
Campaign: ${squad.campaignTitle}
Squad Name: ${squad.teamName}
Synergy Score: ${squad.synergyScore}%
Collective Reach: ${squad.collectiveReach}
Estimated Budget: ${squad.estimatedBudget}
Turnaround: ${squad.turnaroundTime}

PRODUCTION SQUAD:
${squad.members.map((m) => `- ${m.assignedRole}: ${m.name} (${m.handle}) | Tool: ${m.primaryTool} | Rate: ${m.rate} | Strength: ${m.keyStrength}`).join("\n")}

STRATEGY:
${squad.squadStrategy}
    `.trim();

    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 680, maxHeight: "90vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>SQUAD</span>
              <span className="pill purple">AI Dream Team Builder</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "var(--ink)" }}>
              {brief?.title ? `Dream Team for '${brief.title}'` : "Build Production Dream Team"}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>
            ✕
          </button>
        </div>

        {!squad && !loading && (
          <div style={{ textAlign: "center", padding: "40px 16px" }}>
            <span style={{ fontSize: 44, display: "block", marginBottom: 12 }}>⚡</span>
            <p style={{ margin: "0 0 20px", fontSize: 14.5, color: "var(--pencil)", lineHeight: 1.6 }}>
              Instead of hiring a single creator, our AI Production Director assembles a complementary 3-creator squad tailored to your campaign formats, tools, and budget.
            </p>
            <button onClick={handleGenerate} className="button" style={{ minWidth: 200 }}>
              ⚡ Assemble Dream Team Now
            </button>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 16px", color: "var(--muted)" }}>
            <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>⚙️</span>
            Evaluating candidate synergy and cross-tool workflows with Gemini...
          </div>
        )}

        {squad && (
          <div>
            {/* Squad Header Stats */}
            <div
              className="surface"
              style={{
                padding: "16px 20px",
                borderRadius: 16,
                background: "var(--purple-soft)",
                border: "1.5px solid var(--purple-line)",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <strong style={{ fontSize: 16, color: "var(--ink)" }}>{squad.teamName}</strong>
                <span className="pill purple" style={{ fontWeight: 900, fontSize: 13 }}>
                  ★ {squad.synergyScore}% Synergy Score
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, fontSize: 12 }}>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Collective Reach</span>
                  <strong>{squad.collectiveReach}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Est. Budget</span>
                  <strong style={{ color: "var(--purple-primary)" }}>{squad.estimatedBudget}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block" }}>Turnaround</span>
                  <strong>{squad.turnaroundTime}</strong>
                </div>
              </div>
            </div>

            {/* 3 Squad Members */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {squad.members.map((m, idx) => (
                <div
                  key={m.creatorId}
                  className="surface"
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    style={{ width: 50, height: 50, borderRadius: 14, objectFit: "cover" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="pill purple" style={{ fontSize: 10, padding: "2px 8px" }}>
                        Role {idx + 1}: {m.assignedRole}
                      </span>
                      <strong style={{ fontSize: 13, color: "var(--purple-primary)" }}>{m.rate}</strong>
                    </div>
                    <h4 style={{ margin: "4px 0 2px", fontSize: 15, fontWeight: 800 }}>{m.name}</h4>
                    <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                      {m.handle} · Primary Tool: <strong>{m.primaryTool}</strong> · {m.followers}
                    </span>
                    <div style={{ fontSize: 11.5, color: "var(--pencil)", marginTop: 4 }}>
                      ★ {m.keyStrength}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Squad Strategy */}
            <div
              style={{
                padding: "12px 16px",
                background: "var(--surface-soft)",
                borderRadius: 12,
                fontSize: 12.5,
                lineHeight: 1.5,
                color: "var(--pencil)",
                marginBottom: 20,
              }}
            >
              <strong>Director's Strategy:</strong> {squad.squadStrategy}
            </div>

            {/* Export and Action Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <button
                onClick={handleExportProposal}
                className="button secondary"
                style={{ flex: 1 }}
              >
                {copied ? "✓ Copied to Clipboard!" : "📋 Export Team Proposal"}
              </button>
              <button onClick={onClose} className="button" style={{ flex: 1 }}>
                Lock In Squad
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
