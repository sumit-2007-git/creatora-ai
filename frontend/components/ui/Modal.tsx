"use client";

import type { ReactNode } from "react";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} style={{ position: "fixed", zIndex: 50, inset: 0, display: "grid", placeItems: "center", padding: 20, background: "#000b", backdropFilter: "blur(8px)" }}><section role="dialog" aria-modal="true" aria-label={title} className="surface" style={{ width: "min(520px, 100%)", padding: 22 }}><header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}><h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2><button type="button" className="button secondary small" onClick={onClose} aria-label="Close dialog">✕</button></header>{children}</section></div>;
}
