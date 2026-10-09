"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser, loginDemoCreator, loginDemoBrand, logOut } from "@/lib/firebase/auth";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Creative Tools" | "Creators" | "Briefs" | "Actions";
  badge?: string;
  icon: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const commands: CommandItem[] = [
    // Creative Tools (New)
    {
      id: "tool-moodboard",
      title: "Creative Moodboard & Style DNA",
      subtitle: "Generate color palettes, camera specs & AI prompt recipes",
      category: "Creative Tools",
      badge: "AI TOOL",
      icon: "🎨",
      action: () => navigate("/tools/moodboard"),
    },
    {
      id: "tool-calculator",
      title: "AI Campaign Budget & Rate Calculator",
      subtitle: "Fair-market pricing estimates calibrated for generative deliverables",
      category: "Creative Tools",
      badge: "RATES",
      icon: "⚡",
      action: () => navigate("/tools/calculator"),
    },
    {
      id: "tool-audit",
      title: "Creator Aura Audit & Profile Benchmark",
      subtitle: "Commercial readiness assessment powered by Gemini",
      category: "Creative Tools",
      badge: "AUDIT",
      icon: "✨",
      action: () => navigate("/tools/audit"),
    },

    // Navigation
    {
      id: "nav-discover",
      title: "Discover Creators",
      subtitle: "Search and filter AI filmmakers, 3D artists, and prompt designers",
      category: "Navigation",
      icon: "🔍",
      action: () => navigate("/discover"),
    },
    {
      id: "nav-briefs",
      title: "Explore Campaign Briefs",
      subtitle: "Browse open briefs with budgets, deliverables, and requirements",
      category: "Navigation",
      icon: "📋",
      action: () => navigate("/briefs"),
    },
    {
      id: "nav-post-brief",
      title: "Post a New Campaign Brief",
      subtitle: "Create a structured brief with one-line AI generation",
      category: "Navigation",
      badge: "POST",
      icon: "✍️",
      action: () => navigate("/briefs/create"),
    },
    {
      id: "nav-portfolio",
      title: "Curated AI Portfolio Gallery",
      subtitle: "Explore cinematic generative reels and artwork",
      category: "Navigation",
      icon: "🖼️",
      action: () => navigate("/portfolio"),
    },
    {
      id: "nav-dashboard",
      title: "Workspace Dashboard",
      subtitle: "Manage your active briefs, proposals, and project milestones",
      category: "Navigation",
      icon: "📊",
      action: () => navigate("/dashboard"),
    },

    // Creators Shortcuts
    {
      id: "creator-aarav",
      title: "Aarav Chen — AI Filmmaker",
      subtitle: "Midjourney, Runway Gen-3, DaVinci Resolve (Top Match)",
      category: "Creators",
      badge: "98% MATCH",
      icon: "🎬",
      action: () => navigate("/creators/creator-aarav"),
    },
    {
      id: "creator-elena",
      title: "Elena Rostova — 3D & Virtual Fashion",
      subtitle: "Midjourney, Stable Diffusion, Blender, Marvelous Designer",
      category: "Creators",
      icon: "👗",
      action: () => navigate("/creators/creator-elena"),
    },
    {
      id: "creator-kaito",
      title: "Kaito Tanaka — Anime & Character Stylist",
      subtitle: "NijiJourney, ComfyUI, AnimateDiff, After Effects",
      category: "Creators",
      icon: "🌸",
      action: () => navigate("/creators/creator-kaito"),
    },

    // Quick Actions
    {
      id: "action-switch-creator",
      title: "Switch Role: Creator Mode (Aarav)",
      subtitle: "Instant demo login as verified AI filmmaker",
      category: "Actions",
      badge: "ROLE",
      icon: "🎨",
      action: async () => {
        setOpen(false);
        await loginDemoCreator();
        window.location.href = "/dashboard";
      },
    },
    {
      id: "action-switch-brand",
      title: "Switch Role: Brand Mode (Solace)",
      subtitle: "Instant demo login as creative agency commissioning briefs",
      category: "Actions",
      badge: "ROLE",
      icon: "🏢",
      action: async () => {
        setOpen(false);
        await loginDemoBrand();
        window.location.href = "/dashboard";
      },
    },
  ];

  // Filter items
  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Key navigation in modal
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating Spotlight Launcher Button (Bottom Right) */}
      <button
        onClick={() => setOpen(true)}
        className="spotlight-trigger-btn"
        aria-label="Open Creatora Spotlight Command Palette"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#161026",
          color: "#FFFFFF",
          border: "1.5px solid rgba(168, 85, 247, 0.4)",
          borderRadius: 999,
          boxShadow: "0 8px 24px rgba(108, 92, 231, 0.35)",
          cursor: "pointer",
          fontSize: 12.5,
          fontWeight: 700,
          backdropFilter: "blur(12px)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(108, 92, 231, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(108, 92, 231, 0.35)";
        }}
      >
        <span style={{ fontSize: 14 }}>✦</span>
        <span>Spotlight</span>
        <kbd
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            padding: "2px 6px",
            borderRadius: 6,
            fontSize: 10,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          Ctrl K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(22, 16, 38, 0.65)",
            backdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: 20,
            animation: "fadeIn 0.15s ease",
          }}
        >
          {/* Palette Dialog */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(620px, 100%)",
              maxHeight: "80vh",
              background: "#FAF7F2",
              borderRadius: 22,
              border: "2px solid var(--purple-line)",
              boxShadow: "0 24px 64px rgba(22, 16, 38, 0.4)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 22px",
                borderBottom: "1.5px solid var(--line)",
                background: "#FFFFFF",
              }}
            >
              <span style={{ fontSize: 18, color: "var(--purple-primary)" }}>✦</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search tools, creators, briefs, or actions..."
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "transparent",
                }}
              />
              <kbd
                onClick={() => setOpen(false)}
                style={{
                  background: "var(--paper-dark)",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontFamily: "monospace",
                  cursor: "pointer",
                  color: "var(--muted)",
                  border: "1px solid var(--line)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div
              style={{
                overflowY: "auto",
                padding: "10px 12px",
                maxHeight: 420,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {filtered.length === 0 ? (
                <div style={{ padding: "36px 20px", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
                  No matching results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: isSelected ? "rgba(124, 92, 252, 0.08)" : "transparent",
                        border: isSelected ? "1px solid var(--purple-line)" : "1px solid transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.1s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: isSelected ? "var(--purple-soft)" : "var(--paper-dark)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 16,
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </span>
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {item.badge && (
                          <span className="pill purple" style={{ fontSize: 10, padding: "2px 6px" }}>
                            {item.badge}
                          </span>
                        )}
                        <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div
              style={{
                padding: "10px 18px",
                borderTop: "1px solid var(--line)",
                background: "rgba(250, 247, 242, 0.9)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <span>Creatora AI Spotlight</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
