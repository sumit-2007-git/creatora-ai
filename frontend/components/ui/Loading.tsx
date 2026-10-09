export function Loading({ label = "Finding your next great match" }: { label?: string }) {
  return <div className="empty-state" role="status"><div className="empty-icon" style={{ animation: "pulse 1.4s ease-in-out infinite" }}>✳</div><h3>One moment</h3><p>{label}…</p></div>;
}
