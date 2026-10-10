import { NextRequest, NextResponse } from "next/server";
import { resetPasses } from "@/lib/server/marketplaceService";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || "brand-001";
    const result = resetPasses(brandId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Reset error" }, { status: 400 });
  }
}
