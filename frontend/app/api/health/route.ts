import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    database: "Firebase Cloud Firestore + Serverless Cache",
    auth: "Firebase Authentication",
    storage: "Firebase Cloud Storage",
    gemini: process.env.GEMINI_API_KEY ? "configured" : "resilient_fallback",
    platform: "Vercel + Firebase (Zero Render Dependency)",
    architecture: "100% Serverless Edge & Cloud Native",
    coldStartDelayMs: 0,
  });
}
