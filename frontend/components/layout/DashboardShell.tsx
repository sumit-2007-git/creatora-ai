"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { getStoredUser, AppUser, logOut, loginDemoCreator, loginDemoBrand } from "@/lib/firebase/auth";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleSwitchToCreator = async () => {
    await loginDemoCreator();
    window.location.href = "/dashboard/creator";
  };

  const handleSwitchToBrand = async () => {
    await loginDemoBrand();
    window.location.href = "/dashboard/brand";
  };

  return (
    <div className="workspace">
      <Sidebar />
      <div className="workspace-main" style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            height: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 34px",
            borderBottom: "1.5px solid var(--line)",
            background: "rgba(250, 247, 242, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="kanji-stamp" style={{ fontSize: 11, padding: "2px 6px" }}>CREATORA</span>
            <span style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600 }}>
              Creatora AI Workspace · <strong style={{ color: "var(--ink)" }}>{user?.role === "BRAND" ? "Brand Campaign Center" : "Creator Studio"}</strong>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={user?.role === "BRAND" ? handleSwitchToCreator : handleSwitchToBrand}
              className="pill purple"
              style={{ cursor: "pointer", fontSize: 11 }}
            >
              🔄 Switch to {user?.role === "BRAND" ? "Creator (Aarav)" : "Brand (Solace)"}
            </button>

            <Link href="/" className="button small ghost" style={{ fontSize: 12 }}>
              Home
            </Link>
          </div>
        </header>

        {/* Workspace Page Content */}
        <div style={{ flex: 1, padding: "28px 34px 60px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
