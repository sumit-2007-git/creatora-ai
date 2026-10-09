import { NextRequest, NextResponse } from "next/server";
import { listInquiries } from "@/lib/server/marketplaceService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const inquiries = listInquiries(params.id);
  return NextResponse.json(inquiries);
}
