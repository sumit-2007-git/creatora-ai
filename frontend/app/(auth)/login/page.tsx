"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, loginDemoCreator, loginDemoBrand, signInGoogle, resetPassword, UserRole } from "@/lib/firebase/auth";
import { CreatoraLogo } from "@/components/ui/CreatoraLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CREATOR");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");
  const [resetErrorMsg, setResetErrorMsg] = useState("");

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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setResetLoading(true);
      setResetErrorMsg("");
      setResetSuccessMsg("");
      await resetPassword(resetEmail);
      setResetSuccessMsg("Password reset link has been sent to your email! Check your inbox.");
    } catch (err: any) {
      setResetErrorMsg(err.message || "Failed to send reset email. Please verify the email address.");
    } finally {
      setResetLoading(false);
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
            <span className="kanji-stamp">LOGIN</span>
            <span className="pill purple">Welcome Back</span>
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
            Where Creativity <br />
            <span style={{ color: "var(--purple-primary)" }}>Meets AI.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--pencil)", lineHeight: 1.7, margin: 0 }}>
            Connect with leading AI filmmakers, digital artists, and groundbreaking visionary brands.
          </p>
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>
          ✨ Creatora AI Creator Marketplace · Handcrafted Aesthetic
        </div>
      </aside>

      {/* Right Login Form */}
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
              Sign in to Creatora
            </h1>
            <Link href="/" className="button small ghost" style={{ fontSize: 11, padding: "4px 10px" }}>
              ← Home
            </Link>
          </div>
          <p style={{ margin: "0 0 22px", fontSize: 13, color: "var(--muted)" }}>
            Select your role or sign in with your email account.
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
            <span>or email & password</span>
            <span style={{ height: 1, flex: 1, background: "var(--line)" }} />
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
                fontWeight: 700,
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 5, color: "var(--ink)" }}>
                Email address
              </label>
              <input
                type="email"
                className="field"
                placeholder="you@creatora.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", border: "2px solid var(--ink)", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: "var(--ink)" }}>Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowForgotModal(true);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "var(--purple-primary)",
                    fontSize: 11.5,
                    fontWeight: 800,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                className="field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", border: "2px solid var(--ink)", borderRadius: 10, padding: "10px 14px", fontSize: 14 }}
              />
            </div>

            <button type="submit" disabled={loading} className="button" style={{ width: "100%", marginTop: 6, fontWeight: 800 }}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--pencil)" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--purple-primary)", fontWeight: 800, textDecoration: "underline" }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26, 21, 68, 0.65)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
            zIndex: 100,
          }}
        >
          <div
            className="surface manga-panel"
            style={{
              width: "min(440px, 100%)",
              background: "#FFFFFF",
              border: "2.5px solid var(--ink)",
              boxShadow: "8px 8px 0 var(--ink)",
              borderRadius: 20,
              padding: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="kanji-stamp" style={{ background: "var(--yellow)", color: "var(--ink)" }}>RESET</span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 900,
                    color: "var(--ink)",
                  }}
                >
                  Reset Password
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSuccessMsg("");
                  setResetErrorMsg("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  fontWeight: 900,
                  cursor: "pointer",
                  color: "var(--ink)",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 13, color: "var(--pencil)", margin: "0 0 16px", lineHeight: 1.5 }}>
              Enter your registered email address. We will send you instructions to reset your password.
            </p>

            {resetSuccessMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(56, 217, 169, 0.15)",
                  color: "#0F766E",
                  borderRadius: 10,
                  fontSize: 12.5,
                  marginBottom: 14,
                  border: "1.5px solid #38D9A9",
                  fontWeight: 800,
                }}
              >
                ✅ {resetSuccessMsg}
              </div>
            )}

            {resetErrorMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "#FFEBEE",
                  color: "#C62828",
                  borderRadius: 10,
                  fontSize: 12,
                  marginBottom: 14,
                  border: "1.5px solid #EF9A9A",
                  fontWeight: 700,
                }}
              >
                ⚠️ {resetErrorMsg}
              </div>
            )}

            {!resetSuccessMsg ? (
              <form onSubmit={handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 800, marginBottom: 5 }}>
                    Your Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@domain.com"
                    style={{
                      width: "100%",
                      border: "2px solid var(--ink)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 14,
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="button small ghost"
                    style={{ flex: 1, fontWeight: 800 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="button small"
                    style={{ flex: 1, fontWeight: 800 }}
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSuccessMsg("");
                }}
                className="button small"
                style={{ width: "100%", marginTop: 8, fontWeight: 800 }}
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
