import { NextRequest, NextResponse } from "next/server";
import { findCreatorById, saveCreator } from "@/lib/server/marketplaceService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const creator = findCreatorById(params.id);
  if (!creator) {
    return NextResponse.json({ detail: "Creator not found" }, { status: 404 });
  }
  return NextResponse.json(creator);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = saveCreator({ ...body, creatorId: params.id });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to update creator" }, { status: 400 });
  }
}
