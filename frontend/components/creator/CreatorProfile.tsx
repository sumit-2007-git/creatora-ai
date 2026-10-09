import Link from "next/link";
import { Creator } from "@/types/creator";

export function CreatorProfile({ creator }: { creator: Creator }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={creator.avatar} alt={creator.name} style={{ width: 64, height: 64, borderRadius: 18 }} />
        <div>
          <h2 style={{ margin: 0 }}>{creator.name}</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>{creator.roleTitle}</p>
        </div>
      </div>
    </div>
  );
}
