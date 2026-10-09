import { NextRequest, NextResponse } from "next/server";
import { applyBrief } from "@/lib/server/marketplaceService";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const app = applyBrief(params.id, body);
    return NextResponse.json(app, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to apply" }, { status: 400 });
  }
}
