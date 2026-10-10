import { NextRequest, NextResponse } from "next/server";

// In-memory store fallback for demo & serverless execution
const inMemorySavedSearches: Array<{
  id: string;
  brandId: string;
  title: string;
  filters: Record<string, any>;
  createdAt: string;
}> = [
  {
    id: "saved-001",
    brandId: "brand-001",
    title: "Cinematic Fashion Gen-3 (Proof-Backed)",
    filters: { genre: "Fashion", tool: "Runway", proofBackedOnly: true },
    createdAt: new Date().toISOString(),
  },
  {
    id: "saved-002",
    brandId: "brand-001",
    title: "Cyberpunk & Tech Storytellers",
    filters: { genre: "Tech", tool: "Midjourney" },
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || "brand-001";

    const filtered = inMemorySavedSearches.filter(
      (s) => s.brandId === brandId || brandId === "all"
    );

    return NextResponse.json(filtered);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandId = "brand-001", title, filters } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newSearch = {
      id: `saved-${Date.now()}`,
      brandId,
      title,
      filters: filters || {},
      createdAt: new Date().toISOString(),
    };

    inMemorySavedSearches.unshift(newSearch);

    return NextResponse.json(newSearch);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const index = inMemorySavedSearches.findIndex((s) => s.id === id);
    if (index >= 0) {
      inMemorySavedSearches.splice(index, 1);
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
