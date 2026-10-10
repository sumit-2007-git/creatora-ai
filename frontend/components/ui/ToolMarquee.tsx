"use client";

const TOOLS = [
  { name: "Runway Gen-3", icon: "🎬", color: "var(--violet)" },
  { name: "Midjourney v6", icon: "🎨", color: "var(--pink)" },
  { name: "ComfyUI Nodes", icon: "⚡", color: "var(--cyan)" },
  { name: "Kling 1.5", icon: "🔥", color: "var(--orange)" },
  { name: "Blender 4.2", icon: "🧊", color: "var(--yellow)" },
  { name: "DaVinci Resolve", icon: "🎞️", color: "var(--mint)" },
  { name: "Magnific AI", icon: "✨", color: "var(--violet)" },
  { name: "Flux.1 Dev", icon: "⚡", color: "var(--pink)" },
];

export function ToolMarquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
        background: "var(--surface-soft)",
        userSelect: "none",
        position: "relative",
      }}
    >
      <div className="marquee-track" style={{ display: "flex", gap: 16 }}>
        {/* Render twice for seamless loop */}
        {[...TOOLS, ...TOOLS].map((tool, idx) => (
          <div
            key={`${tool.name}-${idx}`}
            className="pill"
            style={{
              padding: "7px 16px",
              fontSize: 12.5,
              fontWeight: 800,
              gap: 8,
              background: "var(--paper2)",
              borderColor: "var(--ink)",
              boxShadow: "2px 2px 0 var(--ink)",
            }}
          >
            <span>{tool.icon}</span>
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
