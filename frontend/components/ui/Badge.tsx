import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "violet" | "coral" }) { return <span className={`pill ${tone === "neutral" ? "" : tone}`}>{children}</span>; }
