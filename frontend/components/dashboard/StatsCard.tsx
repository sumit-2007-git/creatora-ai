export function StatsCard({ label, value, change, icon }: { label: string; value: string; change: string; icon: string }) {
  return <article className="surface surface-hover stat-card"><div className="stat-label"><span>{label}</span><span style={{ color: "var(--lime)", fontSize: 14 }}>{icon}</span></div><div className="stat-value">{value}</div><div className="stat-change">↗ &nbsp;{change}</div></article>;
}
