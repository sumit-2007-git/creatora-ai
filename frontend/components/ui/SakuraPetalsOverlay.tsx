"use client";

import { useEffect, useState } from "react";

export function SakuraPetalsOverlay({ maxPetals = 7 }: { maxPetals?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  // Petals with maximum count limit
  const allPetals = [
    { id: 1, left: "12%", delay: "0s", duration: "14s", size: 16 },
    { id: 2, left: "45%", delay: "2.5s", duration: "16s", size: 20 },
    { id: 3, left: "82%", delay: "5s", duration: "15s", size: 18 },
    { id: 4, left: "28%", delay: "1.2s", duration: "18s", size: 22 },
    { id: 5, left: "68%", delay: "3.8s", duration: "13s", size: 17 },
    { id: 6, left: "92%", delay: "6.2s", duration: "17s", size: 19 },
    { id: 7, left: "5%", delay: "4.1s", duration: "15.5s", size: 15 },
  ];
  const petals = allPetals.slice(0, Math.min(maxPetals, 7));

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: -30,
            left: p.left,
            animation: `petal-fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            display: "inline-block",
            transformOrigin: "center center",
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2 C22 8 28 14 26 22 C24 28 18 30 16 30 C14 30 8 28 6 22 C4 14 10 8 16 2 Z"
              fill="#ff7597"
              fillOpacity="0.75"
              stroke="#ff4f9a"
              strokeWidth="1.2"
            />
            <path
              d="M16 12 C16.5 18 16 24 16 26"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
