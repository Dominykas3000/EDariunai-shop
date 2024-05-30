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

    const { itemId } = body;

    const item = await Item.findById(itemId).populate("negotiations");
    if (!item) {
      return NextResponse.json(
        { error: "Negotiation not found" },
        { status: 404 },
      );
    }

    await Negotiation.deleteMany({ _id: { $in: item.negotiations } });

    item.negotiations = [];
    await item.save();

    return NextResponse.json({ message: "All negotiations rejected" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
