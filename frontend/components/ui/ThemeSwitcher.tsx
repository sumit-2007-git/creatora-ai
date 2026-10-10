"use client";

import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("creatora-inkspark-theme");
    if (saved === "inkspark-night") {
      setIsNight(true);
      document.documentElement.setAttribute("data-theme", "inkspark-night");
    } else {
      document.documentElement.setAttribute("data-theme", "inkspark");
    }
  }, []);

  const toggleTheme = () => {
    const nextNight = !isNight;
    setIsNight(nextNight);
    const themeName = nextNight ? "inkspark-night" : "inkspark";
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("creatora-inkspark-theme", themeName);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="pill"
      style={{
        cursor: "pointer",
        padding: "5px 11px",
        background: isNight ? "var(--violet)" : "var(--yellow)",
        color: isNight ? "#FFFFFF" : "var(--ink)",
        borderColor: "var(--ink)",
        boxShadow: "2px 2px 0 var(--ink)",
        fontSize: 12,
        fontWeight: 800,
      }}
      title={isNight ? "Switch to Day Mode (Cream Sketchbook)" : "Switch to Night Mode (Dark Indigo)"}
      aria-label="Toggle Day and Night Mode"
    >
      <span>{isNight ? "🌙 Night" : "☀️ Day"}</span>
    </button>
  );
}
