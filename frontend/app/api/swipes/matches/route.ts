import { NextRequest, NextResponse } from "next/server";
import { getBrandMatches } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || "brand-001";
    const matches = getBrandMatches(brandId);
    return NextResponse.json(matches);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Matches error" }, { status: 400 });
  }
}
