export function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`pill ${active ? "accent" : ""}`} style={{ cursor: "pointer", padding: "9px 13px" }}>{label}</button>;
}
