import { NextRequest, NextResponse } from "next/server";
import { updateInquiry } from "@/lib/server/marketplaceService";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; inquiryId: string } }
) {
  try {
    const body = await req.json();
    const updated = updateInquiry(params.id, params.inquiryId, body.status || "accepted");
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to update inquiry" }, { status: 400 });
  }
}
