import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "confirmed",
      totalFollowers: body.totalFollowers || 250000,
      monthlyViews: body.monthlyViews || 4500000,
      engagementRate: body.engagementRate || 7.5,
      postsCount: body.postsCount || 180,
      isSelfReported: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to confirm" }, { status: 400 });
  }
}
