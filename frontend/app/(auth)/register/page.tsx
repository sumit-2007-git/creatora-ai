"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, UserRole } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CREATOR");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const user = await signUp(email, password, name, role);
      router.push(user.role === "BRAND" ? "/dashboard/brand" : "/dashboard/creator");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed. Try demo mode or check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--bg)",
      }}
    >
      <aside
        style={{
          position: "relative",
          padding: "60px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "2.5px solid var(--ink)",
          background: "linear-gradient(145deg, #FAF7F2, #F5EFEB)",
          overflow: "hidden",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <CreatoraLogo size={36} />
        </Link>

        <div style={{ maxWidth: 440 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span className="kanji-stamp">JOIN</span>
            <span className="pill purple">Start Creating</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 38,
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.04em",
              margin: "0 0 16px",
            }}
          >
            Join the Next Era of Visual Art.
          </h2>
          <p style={{ fontSize: 15, color: "var(--pencil)", lineHeight: 1.7, margin: 0 }}>
            Whether you generate cinematic universes or commission cutting-edge AI ads, Creatora AI brings you together.
          </p>
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>
          ✨ Creatora AI Creator Marketplace
        </div>
      </aside>

      <div style={{ display: "grid", placeItems: "center", padding: "40px 24px" }}>
        <div
          className="surface manga-panel"
          style={{
            width: "min(440px, 100%)",
            padding: 36,
            borderRadius: 24,
            border: "2.5px solid var(--ink)",
            boxShadow: "6px 6px 0 var(--ink)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                margin: 0,
                fontSize: 26,
                fontWeight: 900,
                color: "var(--ink)",
              }}
            >
              Create an Account
            </h1>
            <Link href="/" className="button small ghost" style={{ fontSize: 11, padding: "4px 10px" }}>
              ← Home
            </Link>
          </div>
          <p style={{ margin: "0 0 22px", fontSize: 13, color: "var(--muted)" }}>
            Select your account type and get started in seconds.
          </p>

          {/* Role selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => setRole("CREATOR")}
              className={`pill ${role === "CREATOR" ? "purple" : ""}`}
              style={{ justifyContent: "center", padding: "8px 0", cursor: "pointer", fontSize: 12, fontWeight: 800 }}
            >
              🎨 I am a Creator
            </button>
            <button
              type="button"
              onClick={() => setRole("BRAND")}
              className={`pill ${role === "BRAND" ? "purple" : ""}`}
              style={{ justifyContent: "center", padding: "8px 0", cursor: "pointer", fontSize: 12, fontWeight: 800 }}
            >
              🏢 I am a Brand
            </button>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: "10px 14px",
                background: "#FFEBEE",
                color: "#C62828",
                borderRadius: 10,
                fontSize: 12,
                marginBottom: 14,
                border: "1.5px solid #EF9A9A",
                fontWeight: 750,
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 5, color: "var(--ink)" }}>
                {role === "CREATOR" ? "Creator Full Name / Handle" : "Company / Brand Name"}
              </label>
              <input
                type="text"
                className="field"
                placeholder={role === "CREATOR" ? "e.g. Aarav Sharma" : "e.g. Solace Studio"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", border: "2px solid var(--ink)", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 5, color: "var(--ink)" }}>
                Email address
              </label>
              <input
                type="email"
                className="field"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", border: "2px solid var(--ink)", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 5, color: "var(--ink)" }}>
                Password
              </label>
              <input
                type="password"
                className="field"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", border: "2px solid var(--ink)", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
              />
            </div>

            <button type="submit" disabled={loading} className="button" style={{ width: "100%", marginTop: 6, fontWeight: 800 }}>
              {loading ? "Creating account..." : `Sign up as ${role === "CREATOR" ? "Creator" : "Brand"} →`}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--pencil)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--purple-primary)", fontWeight: 800, textDecoration: "underline" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
