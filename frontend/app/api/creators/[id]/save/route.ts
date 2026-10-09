import { NextRequest, NextResponse } from "next/server";
import { toggleSave } from "@/lib/server/marketplaceService";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = toggleSave(params.id, "demo-user");
  return NextResponse.json(result);
}
