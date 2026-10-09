import { NextRequest, NextResponse } from "next/server";
import { deletePortfolio } from "@/lib/server/marketplaceService";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = deletePortfolio(params.id);
  return NextResponse.json(res);
}
