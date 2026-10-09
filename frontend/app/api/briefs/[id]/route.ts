import { NextRequest, NextResponse } from "next/server";
import { findBriefById, createOrUpdateBrief } from "@/lib/server/marketplaceService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const brief = findBriefById(params.id);
  if (!brief) {
    return NextResponse.json({ detail: "Brief not found" }, { status: 404 });
  }
  return NextResponse.json(brief);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = createOrUpdateBrief({ ...body, id: params.id });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to update brief" }, { status: 400 });
  }
}
