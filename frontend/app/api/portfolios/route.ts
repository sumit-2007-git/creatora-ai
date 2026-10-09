import { NextRequest, NextResponse } from "next/server";
import { listPortfolios, addPortfolio } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const creatorId = searchParams.get("creatorId") || undefined;
  const genre = searchParams.get("genre") || undefined;
  const contentType = searchParams.get("contentType") || undefined;

  const items = listPortfolios({ creatorId, genre, contentType });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = addPortfolio(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to create portfolio item" }, { status: 400 });
  }
}
