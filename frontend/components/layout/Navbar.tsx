"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser, logOut, loginDemoCreator, loginDemoBrand, AppUser } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function Navbar() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleSwitchRole = async (targetRole: "CREATOR" | "BRAND") => {
    if (targetRole === "CREATOR") {
      const u = await loginDemoCreator();
      setUser(u);
    } else {
      const u = await loginDemoBrand();
      setUser(u);
    }
    setMobileMenuOpen(false);
    window.location.reload();
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="public-nav">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        {/* Brand Logo & Name */}
        <CreatoraLogo size={36} />

        {/* Center Nav Links (Desktop) */}
        <nav className="nav-links desktop-only" aria-label="Main navigation">
          <Link href="/discover">Discover</Link>
          <Link href="/creators">Creators</Link>
          <Link href="/briefs">Briefs</Link>
          <Link href="/tools/moodboard">AI Tools</Link>
          <Link href="/#about">About</Link>
        </nav>

        {/* Actions & Auth (Desktop) */}
        <div className="nav-actions desktop-only">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Link
                href={user.role === "CREATOR" ? "/dashboard/creator" : "/dashboard/brand"}
                className="button small secondary"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span>{user.role === "CREATOR" ? "🎨 Creator Studio" : "🏢 Brand Hub"}</span>
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--purple-line)" }}
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="button small ghost"
                  style={{ fontSize: 11, padding: "0 8px" }}
                  title="Sign out"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => handleSwitchRole("CREATOR")}
                  className="pill purple"
                  style={{ cursor: "pointer", fontSize: 10 }}
                  title="Instant Demo Creator View"
                >
                  ⚡ Demo Creator
                </button>
                <button
                  onClick={() => handleSwitchRole("BRAND")}
                  className="pill"
                  style={{ cursor: "pointer", fontSize: 10 }}
                  title="Instant Demo Brand View"
                >
                  ⚡ Demo Brand
                </button>
              </div>
              <Link href="/login" className="nav-login">
                Log in
              </Link>
              <Link href="/register" className="button small">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "1.5px solid var(--line-strong)",
            background: "#FFFFFF",
            color: "var(--ink)",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#FAF7F2",
            borderBottom: "2px solid var(--line-strong)",
            boxShadow: "0 18px 40px rgba(22, 16, 38, 0.12)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 999,
          }}
        >
          {/* Nav Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", padding: "6px 0" }}
            >
              🔍 Discover Creators
            </Link>
            <Link
              href="/creators"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", padding: "6px 0" }}
            >
              ✨ Creators Directory
            </Link>
            <Link
              href="/briefs"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", padding: "6px 0" }}
            >
              📋 Campaign Briefs
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", padding: "6px 0" }}
            >
              🎬 Video Portfolio Showcase
            </Link>
            <Link
              href="/tools/moodboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 700, color: "var(--purple-primary)", padding: "6px 0" }}
            >
              🎨 AI Moodboard & Tools
            </Link>
          </nav>

          <hr style={{ border: "none", borderTop: "1px solid var(--line)" }} />

          {/* Quick Demo Access Buttons */}
          <div>
            <span style={{ display: "block", fontSize: 11, fontWeight: 750, color: "var(--muted)", textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em" }}>
              Quick 1-Click Demo Logins
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleSwitchRole("CREATOR")}
                className="pill purple"
                style={{ flex: 1, justifyContent: "center", padding: "8px 12px", cursor: "pointer", fontSize: 12 }}
              >
                ⚡ Demo Creator
              </button>
              <button
                onClick={() => handleSwitchRole("BRAND")}
                className="pill"
                style={{ flex: 1, justifyContent: "center", padding: "8px 12px", cursor: "pointer", fontSize: 12 }}
              >
                ⚡ Demo Brand
              </button>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--line)" }} />

          {/* User Status / Actions */}
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link
                href={user.role === "CREATOR" ? "/dashboard/creator" : "/dashboard/brand"}
                onClick={() => setMobileMenuOpen(false)}
                className="button"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {user.role === "CREATOR" ? "🎨 Open Creator Studio" : "🏢 Open Brand Hub"}
              </Link>
              <button
                onClick={handleLogout}
                className="button ghost"
                style={{ width: "100%", justifyContent: "center", fontSize: 13 }}
              >
                Sign out ({user.name})
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="button secondary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="button"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
