import { NextRequest, NextResponse } from "next/server";
import { recordSwipe } from "@/lib/server/marketplaceService";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const result = recordSwipe(payload);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Swipe error" }, { status: 400 });
  }
}
