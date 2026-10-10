import { NextRequest, NextResponse } from "next/server";
import { listPosts, addPost } from "@/lib/server/marketplaceService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = listPosts(params.id);
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Posts error" }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const newPost = addPost(params.id, body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ detail: err.message || "Failed to add post" }, { status: 400 });
  }
}
