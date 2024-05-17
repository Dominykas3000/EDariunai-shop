import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";
import ItemReview from "@/models/itemreview";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  connectToDatabase();
  const body = await request.json();

  try {
    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { userId, itemId, rating, review } = body;

    if (!userId || !itemId || !rating || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const itemReview = new ItemReview({
      reviewer: userId,
      seller: itemId,
      rating,
      review,
    });

    await itemReview.save();

    item.itemReviews.push(itemReview._id);
    await item.save();

    return NextResponse.json({ message: "Review created successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
