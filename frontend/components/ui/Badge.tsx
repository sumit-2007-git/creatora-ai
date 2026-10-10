import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "violet" | "coral" | "sakura" | "cyan" | "yellow" | "mint";
  className?: string;
}) {
  const toneClass =
    tone === "accent" || tone === "sakura"
      ? "sakura"
      : tone === "violet"
      ? "purple"
      : tone === "coral"
      ? "orange"
      : tone === "neutral"
      ? ""
      : tone;

  return (
    <span
      className={`pill ${toneClass} ${className}`}
      style={{
        border: "2px solid var(--ink)",
        boxShadow: "2px 2px 0 var(--ink)",
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}
