"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Point {
  x: number;
  y: number;
  alpha: number;
  radius: number;
}

interface Splash {
  id: number;
  x: number;
  y: number;
}

export function ContextCursorProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check touch and reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReducedMotion) {
      return;
    }

    setEnabled(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement handler throttled
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        lastX = e.clientX;
        lastY = e.clientY;
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.6,
          radius: Math.random() * 2 + 1.5,
        });
        if (pointsRef.current.length > 25) {
          pointsRef.current.shift();
        }
      }
    };

    // Click splash handler
    const handleClick = (e: MouseEvent) => {
      const newSplash: Splash = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setSplashes((prev) => [...prev.slice(-4), newSplash]);
      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handleClick, { passive: true });

    // Animation loop for ink trail
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pointsRef.current.length; i++) {
        const pt = pointsRef.current[i];
        pt.alpha -= 0.025;
        if (pt.alpha > 0) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42, 29, 58, ${pt.alpha * 0.4})`;
          ctx.fill();
        }
      }

      pointsRef.current = pointsRef.current.filter((pt) => pt.alpha > 0);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {children}
      {enabled && (
        <>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
          {/* Click Splash Elements */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 10000,
            }}
          >
            {splashes.map((s) => (
              <span
                key={s.id}
                style={{
                  position: "absolute",
                  left: s.x - 12,
                  top: s.y - 12,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "2px solid var(--pink)",
                  transform: "scale(0)",
                  animation: "splash-pop 0.4s ease-out forwards",
                }}
              />
            ))}
          </div>
          <style jsx global>{`
            @keyframes splash-pop {
              0% {
                transform: scale(0.2);
                opacity: 1;
              }
              100% {
                transform: scale(2.2);
                opacity: 0;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}
