import { FilterChip } from "@/components/discovery/FilterChip";

const categories = ["All creators", "Fashion", "Lifestyle", "Tech", "AI Video", "Product Ads", "AI Art"];
export function FilterPanel({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  return <div className="toolbar" aria-label="Filter creators by category">{categories.map((category) => <FilterChip key={category} label={category} active={active === category} onClick={() => onChange(category)}/>)}</div>;
}
