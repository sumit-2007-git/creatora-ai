import { NextRequest, NextResponse } from "next/server";
import { getSwipeDeck } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || "brand-001";
    const briefId = searchParams.get("briefId") || undefined;

    const deck = getSwipeDeck(brandId, briefId);
    return NextResponse.json(deck);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Deck error" }, { status: 400 });
  }
}
