import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sellerId: string } }
) {
  console.log("sellerId", params.sellerId);
  return NextResponse.json({
    status: true,
    message: `Return seller: ${params.sellerId} route`,
  });
}
