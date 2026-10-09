import Link from "next/link";
import { Brief } from "@/types/brief";

export function BriefCard({ brief }: { brief: Brief }) {
  return (
    <article className="surface surface-hover" style={{ padding: 22, borderRadius: 20, border: "1.5px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span className="pill purple" style={{ fontSize: 10 }}>{brief.brandName || "Creatora Brand"}</span>
        <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9", fontSize: 10 }}>
          ● {brief.status === "open" ? "Accepting Creators" : brief.status}
        </span>
      </div>

      <h3 style={{ margin: "4px 0 8px", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{brief.title}</h3>
      <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>{brief.description}</p>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", fontSize: 11, marginBottom: 14 }}>
        <span>Budget: <strong style={{ color: "var(--purple-primary)" }}>{brief.budget}</strong></span>
        <span>Applicants: <strong>{brief.applicantCount || 0}</strong></span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {brief.genres?.slice(0, 2).map((g) => (
            <span key={g} className="pill" style={{ fontSize: 9.5 }}>{g}</span>
          ))}
        </div>
        <Link href={`/briefs/${brief.id}`} className="text-link" style={{ fontSize: 12, fontWeight: 700, color: "var(--purple-primary)" }}>
          View Details →
        </Link>
      </div>
    </article>
  );
}
