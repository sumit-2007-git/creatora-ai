import { PortfolioItem } from "@/types/portfolio";

export function PortfolioViewer({ item }: { item: PortfolioItem }) {
  return (
    <article className="surface" style={{ overflow: "hidden", borderRadius: 20 }}>
      <img
        src={item.mediaUrl}
        alt={item.title}
        style={{ display: "block", width: "100%", maxHeight: 440, objectFit: "cover" }}
      />
      <div style={{ padding: 20 }}>
        <span className="pill purple">{item.contentType || item.mediaType}</span>
        <h2 style={{ margin: "14px 0 6px", fontSize: 22 }}>{item.title}</h2>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{item.description}</p>
      </div>
    </article>
  );
}
