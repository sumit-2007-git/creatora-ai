export function SearchBar({ value, onChange, placeholder = "Search creators, skills, or styles…" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <div className="input-wrap"><span className="input-icon">⌕</span><input className="field" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Search creators"/></div>;
}
