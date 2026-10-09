"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredUser, AppUser, logOut } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isBrand = user?.role === "BRAND" || pathname.includes("/brand");

  const creatorItems = [
    { href: "/dashboard/creator", label: "Dashboard", icon: "📊" },
    { href: `/creators/${user?.creatorId || "creator-001"}`, label: "My Profile", icon: "👤" },
    { href: "/portfolio", label: "Portfolio", icon: "📁" },
    { href: "/briefs", label: "Browse Briefs", icon: "📋" },
  ];

  const brandItems = [
    { href: "/dashboard/brand", label: "Dashboard", icon: "📊" },
    { href: "/briefs/create", label: "Post a Brief", icon: "📝" },
    { href: "/discover", label: "Discover Creators", icon: "👥" },
    { href: "/briefs", label: "My Briefs", icon: "📋" },
  ];

  const items = isBrand ? brandItems : creatorItems;

  return (
    <aside className="sidebar">
      {/* Brand Mark */}
      <div style={{ padding: "0 8px 24px", borderBottom: "1.5px solid var(--line)", marginBottom: 16 }}>
        <CreatoraLogo size={32} />
      </div>

      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", padding: "6px 12px", letterSpacing: "0.08em" }}>
        {isBrand ? "Brand Workspace" : "Creator Studio"}
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 3, margin: "6px 0 20px" }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", padding: "6px 12px", letterSpacing: "0.08em" }}>
        Marketplace
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 3, margin: "6px 0" }}>
        <Link href="/discover" className="sidebar-link">
          <span className="sidebar-icon">🔍</span>
          <span>Explore Talent</span>
        </Link>
        <Link href="/" className="sidebar-link">
          <span className="sidebar-icon">🌐</span>
          <span>Public Home</span>
        </Link>
      </nav>

      {/* Profile snippet at bottom */}
      <div style={{ marginTop: "auto", padding: "14px 10px 0", borderTop: "1.5px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={user?.profileImage || (isBrand ? "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80" : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80")}
            alt={user?.name || "Account"}
            style={{ width: 34, height: 34, borderRadius: 10, objectFit: "cover" }}
          />
          <div>
            <strong style={{ fontSize: 12, display: "block", color: "var(--ink)", maxWidth: 105, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name || (isBrand ? "Solace Brand" : "Aarav Sharma")}
            </strong>
            <small style={{ fontSize: 10, color: "var(--purple-primary)", fontWeight: 700 }}>
              {isBrand ? "Brand Hub" : "Creator Hub"}
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
}
