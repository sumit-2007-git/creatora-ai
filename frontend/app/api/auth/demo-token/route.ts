import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const role = (body.role || "BRAND").toUpperCase();

    const isBrand = role === "BRAND";

    const demoUser = isBrand
      ? {
          uid: "user-brand-001",
          email: "partnerships@solace.com",
          name: "Solace Studio Brand",
          role: "BRAND",
          profileImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
          brandId: "brand-001",
          token: "demo-brand-token",
          isDemo: true,
        }
      : {
          uid: "user-creator-001",
          email: "aarav@ember.ai",
          name: "Aarav Sharma",
          role: "CREATOR",
          profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          creatorId: "creator-001",
          token: "demo-creator-token",
          isDemo: true,
        };

    return NextResponse.json({
      success: true,
      user: demoUser,
      token: demoUser.token,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
