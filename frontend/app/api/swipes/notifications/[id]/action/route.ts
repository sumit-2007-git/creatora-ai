import { NextRequest, NextResponse } from "next/server";
import { actionNotification } from "@/lib/server/marketplaceService";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await req.json();
    const action = payload.status || "read";
    const result = actionNotification(params.id, action);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Notification action error" }, { status: 400 });
  }
}
