import { NextResponse } from "next/server";
import { listSavedCreatorIds } from "@/lib/server/marketplaceService";

export async function GET() {
  const savedIds = listSavedCreatorIds("demo-user");
  return NextResponse.json(savedIds);
}
