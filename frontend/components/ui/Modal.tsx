"use client";

import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      style={{
        position: "fixed",
        zIndex: 1000,
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: 20,
        background: "rgba(42, 29, 58, 0.72)",
        backdropFilter: "blur(8px)",
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="surface"
        style={{
          width: "min(540px, 100%)",
          padding: 26,
          border: "3px solid var(--ink)",
          boxShadow: "8px 8px 0 var(--ink)",
          borderRadius: "22px 26px 20px 24px",
          background: "var(--paper2)",
          animation: "modal-pop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
            paddingBottom: 12,
            borderBottom: "2px solid var(--ink)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp" style={{ fontSize: 10 }}>PANEL</span>
            <h2 style={{ margin: 0, fontSize: 20, color: "var(--ink)", fontFamily: "var(--font-heading)" }}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="button secondary small"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ minHeight: 32, padding: "0 10px", fontSize: 14, fontWeight: 900 }}
          >
            ✕
          </button>
        </header>
        {children}
      </section>
      <style jsx>{`
        @keyframes modal-pop {
          0% {
            opacity: 0;
            transform: scale(0.92) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
