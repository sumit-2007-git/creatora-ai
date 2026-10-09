"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser, logOut, loginDemoCreator, loginDemoBrand, AppUser } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function Navbar() {
  const [user, setUser] = useState<AppUser | null>(null);

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
    window.location.reload();
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="public-nav">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand Logo & Name */}
        <CreatoraLogo size={36} />

        {/* Center Nav Links */}
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/discover">Discover</Link>
          <Link href="/creators">Creators</Link>
          <Link href="/briefs">Briefs</Link>
          <Link href="/tools/moodboard">AI Tools</Link>
          <Link href="/#about">About</Link>
        </nav>

        {/* Actions & Auth */}
        <div className="nav-actions">
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
      </div>
    </header>
  );
}
