"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BriefCard } from "@/components/brief/BriefCard";
import { fetchBriefs } from "@/lib/api/briefs";
import { demoBriefs } from "@/lib/demo-data";
import { Brief } from "@/types/brief";

export default function BrandBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>(demoBriefs);

  useEffect(() => {
    fetchBriefs()
      .then((data) => {
        if (data && data.length > 0) setBriefs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <header className="workspace-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">BRIEFS</span>
            <span className="pill purple">Campaign Management</span>
          </div>
          <h1 style={{ margin: "4px 0", fontSize: 28, fontWeight: 900, color: "var(--ink)" }}>Your Campaign Briefs</h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>Manage active briefs, review creator applications, and track milestones.</p>
        </div>
        <Link href="/briefs/create" className="button">
          + New Campaign Brief
        </Link>
      </header>

      <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
}
