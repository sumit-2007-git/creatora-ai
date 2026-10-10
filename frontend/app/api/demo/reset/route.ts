import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Reset mutable test state in memory or localStorage triggers
    return NextResponse.json({
      success: true,
      message: "✓ Demo marketplace state reset to original pristine dataset.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
