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

    console.log("body", body);

    const { negotiator, item, newPrice, comment } = body;
    
    const negotiation = new Negotiation({
      negotiator,
      item,
      newPrice,
      comment,
    });
    await negotiation.save();

    await Item.findByIdAndUpdate(item, {
      $push: { negotiations: negotiation._id },
    });
    
    return NextResponse.json({ message: "Review created successfully" });
  } catch (error) {
    console.error("Error submitting negotiation:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
