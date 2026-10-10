"use client";

export function FilterChip({
  label,
  active,
  onClick,
  dimmed = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dimmed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={dimmed}
      className={`sticker-chip ${active ? "active" : ""} ${dimmed ? "sticker-dimmed" : ""}`}
    >
      <span>{label}</span>
    </button>
  );
}
