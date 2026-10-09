"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, loginDemoCreator, loginDemoBrand, signInGoogle, UserRole } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CREATOR");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const user = await signIn(email, password);
      router.push(user.role === "BRAND" ? "/dashboard/brand" : "/dashboard/creator");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in. Try Demo Login below.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoCreator = async () => {
    await loginDemoCreator();
    router.push("/dashboard/creator");
  };

  const handleDemoBrand = async () => {
    await loginDemoBrand();
    router.push("/dashboard/brand");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInGoogle(role);
      router.push(user.role === "BRAND" ? "/dashboard/brand" : "/dashboard/creator");
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign in error");
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
      {/* Left Sketchbook Banner */}
      <aside
        style={{
          position: "relative",
          padding: "60px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1.5px solid var(--line)",
          background: "linear-gradient(145deg, #FAF7F2, #F5EFEB)",
          overflow: "hidden",
        }}
      >
        <CreatoraLogo size={36} />

        <div style={{ maxWidth: 440 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span className="kanji-stamp">LOGIN</span>
            <span className="pill purple">Welcome Back</span>
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.04em", margin: "0 0 16px" }}>
            Where Creativity <br />
            <span style={{ color: "var(--purple-primary)" }}>Meets AI.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
            Connect with leading AI filmmakers, digital artists, and groundbreaking brands.
          </p>
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          ✨ Creatora AI Creator Marketplace · Handcrafted Aesthetic
        </div>
      </aside>

      {/* Right Login Form */}
      <div style={{ display: "grid", placeItems: "center", padding: "40px 24px" }}>
        <div className="surface" style={{ width: "min(420px, 100%)", padding: 36, borderRadius: 24, border: "1.5px solid var(--line)" }}>
          <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 900, color: "var(--ink)" }}>Sign in to Creatora AI</h1>
          <p style={{ margin: "0 0 22px", fontSize: 13, color: "var(--muted)" }}>
            Select your role or choose instant demo mode.
          </p>

          {/* Role selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => setRole("CREATOR")}
              className={`pill ${role === "CREATOR" ? "purple" : ""}`}
              style={{ justifyContent: "center", padding: "8px 0", cursor: "pointer", fontSize: 12 }}
            >
              🎨 I am a Creator
            </button>
            <button
              type="button"
              onClick={() => setRole("BRAND")}
              className={`pill ${role === "BRAND" ? "purple" : ""}`}
              style={{ justifyContent: "center", padding: "8px 0", cursor: "pointer", fontSize: 12 }}
            >
              🏢 I am a Brand
            </button>
          </div>

          {/* Quick Demo Login Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={handleDemoCreator}
              className="button secondary"
              style={{ width: "100%", fontSize: 12.5 }}
            >
              ⚡ Instant Demo Creator (Aarav Sharma)
            </button>
            <button
              type="button"
              onClick={handleDemoBrand}
              className="button secondary"
              style={{ width: "100%", fontSize: 12.5 }}
            >
              ⚡ Instant Demo Brand (Solace Studio)
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0", color: "var(--muted)", fontSize: 11 }}>
            <span style={{ height: 1, flex: 1, background: "var(--line)" }} />
            <span>or email sign in</span>
            <span style={{ height: 1, flex: 1, background: "var(--line)" }} />
          </div>

          {errorMsg && (
            <div style={{ padding: "10px 14px", background: "#FFEBEE", color: "#C62828", borderRadius: 10, fontSize: 12, marginBottom: 14 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Email address</label>
              <input
                type="email"
                className="field"
                placeholder="you@creatora.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Password</label>
              <input
                type="password"
                className="field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="button" style={{ width: "100%", marginTop: 6 }}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "var(--muted)" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--purple-primary)", fontWeight: 700 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
