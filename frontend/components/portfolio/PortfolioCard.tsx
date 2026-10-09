import { PortfolioItem } from "@/types/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="surface surface-hover" style={{ overflow: "hidden", borderRadius: 18, border: "1.5px solid var(--line)" }}>
      <div style={{ position: "relative", height: 180, background: "var(--surface-soft)" }}>
        <img
          src={item.thumbnailUrl || item.mediaUrl}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
        <span className="pill" style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.9)", fontSize: 10 }}>
          {item.contentType || item.mediaType}
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 800, color: "var(--ink)" }}>{item.title}</h3>
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{item.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 10 }}>
          <span>👁 {item.views}</span>
          <span>❤️ {item.likes}</span>
          <span>⚡ {item.toolsUsed?.slice(0, 2).join(", ")}</span>
        </div>
      </div>
    </article>
  );
}
