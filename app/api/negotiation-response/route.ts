import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Negotiation from "@/models/negotiation";
import Item from "@/models/item";

export const POST = async (request: NextRequest) => {
  connectToDatabase();
  const body = await request.json();

  try {
    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { negotiationId, action } = body;

    const negotiation = await Negotiation.findById(negotiationId).populate(
      "item",
    );

    if (!negotiation) {
      return NextResponse.json({ error: "Negotiation not found" }, { status: 404 });
    }

    const item = negotiation.item;

    if (action === "accept") {
      item.price = negotiation.newPrice;
      item.salePrice = undefined; 
      await item.save();

      await Negotiation.findByIdAndDelete(negotiationId);
      await Item.findByIdAndUpdate(item._id, {
        $pull: { negotiations: negotiationId },
      });

      return NextResponse.json({ message: "Negotiation accepted" });
    } else if (action === "decline") {

      await Negotiation.findByIdAndDelete(negotiationId);

      await Item.findByIdAndUpdate(item._id, {
        $pull: { negotiations: negotiationId },
      });

      return NextResponse.json({ message: "Negotiation declined" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error handling negotiation response:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};