import { NextRequest, NextResponse } from "next/server";
import { updatePost, deletePost } from "@/lib/server/marketplaceService";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; postId: string } }
) {
  try {
    const body = await req.json();
    const updated = updatePost(params.id, params.postId, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to update post" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; postId: string } }
) {
  try {
    const result = deletePost(params.id, params.postId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to delete post" }, { status: 400 });
  }
}
