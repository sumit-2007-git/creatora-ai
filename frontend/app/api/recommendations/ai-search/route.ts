import { NextRequest, NextResponse } from "next/server";
import { searchCreatorsWithAI } from "@/lib/server/marketplaceService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const query = payload.query || "";
    const structuredQuery = payload.structuredQuery;

    // Check if external FastAPI is running and configured
    const fastApiUrl = process.env.FASTAPI_BACKEND_URL;
    if (fastApiUrl) {
      try {
        const resp = await fetch(`${fastApiUrl}/api/recommendations/ai-search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (resp.ok) {
          const data = await resp.json();
          return NextResponse.json(data);
        }
      } catch (e) {
        // Fallback to local serverless implementation
      }
    }

    const result = searchCreatorsWithAI(query, structuredQuery);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "AI Search error" }, { status: 400 });
  }
}
