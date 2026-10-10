import { NextRequest, NextResponse } from "next/server";
import { getCreatorNotifications } from "@/lib/server/marketplaceService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get("creatorId") || "creator-001";
    const data = getCreatorNotifications(creatorId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Notifications error" }, { status: 400 });
  }
}
