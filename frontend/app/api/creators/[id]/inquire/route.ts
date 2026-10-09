import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/server/marketplaceService";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const inq = createInquiry(params.id, body);
    return NextResponse.json(inq, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to create inquiry" }, { status: 400 });
  }
}
