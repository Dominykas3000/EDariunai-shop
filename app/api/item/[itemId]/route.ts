import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest, { params }: { params: { itemId: string } }
) {
  
  return NextResponse.json({
    status: true,
    message: `Return product: ${params.itemId} route`,
  });
}
export async function POST(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {

  return NextResponse.json({
    status: true,
    message: `Create product: ${params.itemId} route`,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  return NextResponse.json({
    status: true,
    message: `Update product: ${params.itemId} route`,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  return NextResponse.json({
    status: true,
    message: `Delete product: ${params.itemId} route`,
  });
}