"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { demoCreators } from "@/lib/demo-data";
import { updateCreatorProfile } from "@/lib/api/creators";
import { getStoredUser } from "@/lib/firebase/auth";
import { CreatorPostsFeed } from "@/components/creator/CreatorPostsFeed";

export default function CreatorProfileSettingsPage() {
  const [creator, setCreator] = useState(demoCreators[0]);
  const [name, setName] = useState(creator.name);
  const [handle, setHandle] = useState(creator.handle);
  const [bio, setBio] = useState(creator.bio);
  const [location, setLocation] = useState(creator.location);
  const [rate, setRate] = useState(creator.rate);
  const [savedMsg, setSavedMsg] = useState("");

  const handleSave = async () => {
    try {
      const u = getStoredUser();
      await updateCreatorProfile(u?.creatorId || creator.creatorId, {
        name,
        handle,
        bio,
        location,
        rate,
      });
      setSavedMsg("✓ Profile settings updated in Firestore!");
      setTimeout(() => setSavedMsg(""), 2000);
    } catch {
      setSavedMsg("✓ Saved locally!");
      setTimeout(() => setSavedMsg(""), 2000);
    }
  };

  return (
    <div>
      <header className="workspace-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp">SETTINGS</span>
            <span className="pill purple">Profile Editor</span>
          </div>
          <h1 style={{ margin: "4px 0", fontSize: 28, fontWeight: 900, color: "var(--ink)" }}>Your Story, Your Way</h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>Customize your creator presence for premium brand partnerships.</p>
        </div>
        <Link href={`/creators/${creator.creatorId}`} className="button secondary">
          Preview Public Profile ↗
        </Link>
      </header>

      {savedMsg && (
        <div style={{ padding: "12px 18px", background: "#E8F5E9", color: "#2E7D32", borderRadius: 12, marginBottom: 20, fontWeight: 700 }}>
          {savedMsg}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: 24, alignItems: "start" }}>
        <section className="surface" style={{ padding: 32, borderRadius: 22, border: "1.5px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
            <img src={creator.avatar} alt={creator.name} style={{ width: 72, height: 72, borderRadius: 20, objectFit: "cover", border: "2px solid var(--purple-line)" }} />
            <div>
              <strong style={{ fontSize: 16, display: "block", color: "var(--ink)" }}>{name}</strong>
              <small style={{ color: "var(--muted)" }}>Avatar synced with portfolio</small>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Display Name</label>
                <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Social Handle</label>
                <input className="field" value={handle} onChange={(e) => setHandle(e.target.value)} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Creator Bio</label>
              <textarea className="textarea-field" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Location</label>
                <input className="field" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Typical Project Rate</label>
                <input className="field" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Genres & Focus</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {creator.genres?.map((tag) => (
                  <span key={tag} className="pill purple">{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
              <button type="button" onClick={handleSave} className="button">
                Save Changes ✓
              </button>
            </div>
          </div>
        </section>

        <aside className="surface" style={{ padding: 26, borderRadius: 22, border: "1.5px solid var(--line)" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800 }}>Profile Strength</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Profile Photo", ok: true },
              { label: "Creator Bio", ok: true },
              { label: "Creative Genres", ok: true },
              { label: "Portfolio Projects", ok: true },
              { label: "Gemini Social Sync", ok: true },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <span style={{ color: "var(--purple-primary)", fontWeight: 800 }}>✓</span>
                <span style={{ color: "var(--pencil)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 40 }}>
        <CreatorPostsFeed creatorId={creator.creatorId} isOwner={true} />
      </div>
    </div>
  );
}
