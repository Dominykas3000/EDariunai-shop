import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";
import Seller from "@/models/seller";

export async function GET(req: NextRequest) {
  const items = await Item.find({});
  const sellerIds = items.map((item) => item.sellerId);
  const sellers = await Seller.find({ _id: { $in: sellerIds } });

  // Merge seller data into items
  const populatedItems = items.map((item) => {
    const seller = sellers.find((seller) => seller._id.equals(item.sellerId));
    return { ...item.toObject(), seller };
  });

  return NextResponse.json({ items: populatedItems });

}


