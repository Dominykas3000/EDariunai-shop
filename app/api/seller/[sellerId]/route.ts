import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sellerId: string } }
) {
  console.log("params", params);
  await connectToDatabase();

  const items = await Item.find({ sellerId: params.sellerId });
  console.log("items", items);

  return NextResponse.json({
    items,
  });
}
