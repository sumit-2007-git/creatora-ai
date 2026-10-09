import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; appId: string } }
) {
  try {
    const body = await req.json();
    return NextResponse.json({ id: params.appId, status: body.status || "shortlisted" });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed" }, { status: 400 });
  }
}
