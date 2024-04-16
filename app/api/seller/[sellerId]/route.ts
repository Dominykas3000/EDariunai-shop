import Item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sellerId: string } }
) {
  console.log("params", params);

  const items = await Item.find({ sellerId: params.sellerId });
  console.log("items", items);

  return NextResponse.json({
    items,
  });
}
