import { PortfolioItem } from "@/types/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
}
