"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "small";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  onClick,
  ...props
}: Props) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Generate 3 ephemeral sparkles on click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId = Date.now();
    setSparkles((prev) => [...prev.slice(-3), { id: newId, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newId));
    }, 450);

    onClick?.(e);
  };

  const variantClass = variant === "secondary" ? "secondary" : variant === "ghost" ? "ghost" : "";
  const sizeClass = size === "small" ? "small" : "";

  return (
    <button
      className={`button ${variantClass} ${sizeClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      {/* Sparkle Burst particles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--yellow)",
            border: "1px solid var(--ink)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%) scale(0)",
            animation: "btn-sparkle 0.45s ease-out forwards",
            zIndex: 10,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes btn-sparkle {
          0% {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -14px) scale(1.4);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -24px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
