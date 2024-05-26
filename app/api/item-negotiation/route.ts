import Item from "@/models/item";
import Seller from "@/models/seller";
import User from "@/models/user";
import Negotiation from "@/models/negotiation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sellerId = req.headers.get("data");

    const items = await Item.find({ sellerId: sellerId }).populate({
      path: "negotiations",
      model: Negotiation,
      populate: {
        path: "negotiator",
        model: User,
      },
    });

    return NextResponse.json({
      items,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
