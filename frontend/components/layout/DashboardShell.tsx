"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredUser, AppUser, logOut } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isBrand = user?.role === "BRAND" || pathname.includes("/brand");

  const creatorNavItems = [
    { href: "/dashboard/creator", label: "Dashboard" },
    { href: `/creators/${user?.creatorId || "creator-001"}`, label: "My Profile" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/briefs", label: "Browse Briefs" },
    { href: "/creator/inbox", label: "Inbox" },
  ];

  const brandNavItems = [
    { href: "/dashboard/brand", label: "Dashboard" },
    { href: "/discover", label: "Discovery" },
    { href: "/brand/swipe", label: "Swipe" },
    { href: "/briefs", label: "Briefs & Dream Team" },
    { href: "/brand/matches", label: "Matches" },
  ];

  const navItems = isBrand ? brandNavItems : creatorNavItems;

  const handleLogout = async () => {
    await logOut();
    window.location.href = "/";
  };

  return (
    <div className="site-shell" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* DASHBOARD HEADER - Only app logo, role navigation items, and one Logout button */}
      <header
        className="public-nav"
        style={{
          borderBottom: "2.5px solid var(--ink)",
          background: "var(--surface)",
          boxShadow: "0 4px 0 var(--ink)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            height: 64,
          }}
        >
          {/* App Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <CreatoraLogo size={32} showSubtitle={false} />
            <span
              className="kanji-stamp"
              style={{
                fontSize: 10,
                padding: "2px 6px",
                background: isBrand ? "var(--cyan)" : "var(--pink)",
                color: isBrand ? "var(--ink)" : "#FFFFFF",
              }}
            >
              {isBrand ? "BRAND" : "CREATOR"}
            </span>
          </div>

          {/* Role Navigation Items */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflowX: "auto",
              padding: "4px 0",
              scrollbarWidth: "none",
            }}
            aria-label="Dashboard role navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`button small ${isActive ? "" : "ghost"}`}
                  style={{
                    fontSize: 12.5,
                    padding: "6px 14px",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    background: isActive ? "var(--ink)" : "transparent",
                    color: isActive ? "#FFFFFF" : "var(--ink)",
                    borderColor: "var(--ink)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* One Logout Button */}
          <div style={{ flexShrink: 0 }}>
            <button
              onClick={handleLogout}
              className="button small secondary"
              style={{
                fontSize: 12,
                padding: "6px 14px",
                fontWeight: 800,
                background: "var(--yellow)",
                color: "var(--ink)",
              }}
              title="Sign out and return to home page"
            >
              Logout ➔
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Content */}
      <main style={{ flex: 1, padding: "28px 0 60px" }}>
        <div className="container">{children}</div>
      </main>

      {/* Minimal Footer Line */}
      <footer
        style={{
          borderTop: "2px solid var(--ink)",
          background: "var(--surface)",
          padding: "18px 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ fontSize: 12.5, color: "var(--pencil)", fontWeight: 700 }}>
          Creatora AI Marketplace · 2026
        </div>
      </footer>
    </div>
  );
}
