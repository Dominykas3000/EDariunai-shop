import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  console.log("sellerId", params.productId);
  return NextResponse.json({
    status: true,
    message: `Return product: ${params.productId} route`,
  });
}
