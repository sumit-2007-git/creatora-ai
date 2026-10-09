import { NextRequest, NextResponse } from "next/server";
import { listApplications } from "@/lib/server/marketplaceService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const apps = listApplications(params.id);
  return NextResponse.json(apps);
}
