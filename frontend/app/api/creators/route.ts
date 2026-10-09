import { NextRequest, NextResponse } from "next/server";
import { listCreators, saveCreator } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const genre = searchParams.get("genre") || undefined;
  const contentType = searchParams.get("contentType") || undefined;
  const tool = searchParams.get("tool") || undefined;
  const platform = searchParams.get("platform") || undefined;
  const specialization = searchParams.get("specialization") || undefined;
  const availability = searchParams.get("availability") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;

  const creators = listCreators({
    q,
    genre,
    contentType,
    tool,
    platform,
    specialization,
    availability,
    sortBy,
  });

  return NextResponse.json(creators);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = saveCreator(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to create creator" }, { status: 400 });
  }
}
