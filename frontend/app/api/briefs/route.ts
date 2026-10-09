import { NextRequest, NextResponse } from "next/server";
import { listBriefs, createOrUpdateBrief } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const genre = searchParams.get("genre") || undefined;
  const contentType = searchParams.get("contentType") || undefined;

  const briefs = listBriefs({ status, genre, contentType });
  return NextResponse.json(briefs);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = createOrUpdateBrief(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to create brief" }, { status: 400 });
  }
}
