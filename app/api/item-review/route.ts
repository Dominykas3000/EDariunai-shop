import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";
import ItemReview from "@/models/itemreview";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const itemId = searchParams.get("itemId");

  if (!userId || !itemId) {
    return NextResponse.json(
      { error: "Missing userId or itemId" },
      { status: 400 },
    );
  }

  try {
    const review = await ItemReview.findOne({ reviewer: userId, item: itemId });
    if (review) {
      return NextResponse.json({ review });
    } else {
      return NextResponse.json({ review: null });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  await connectToDatabase();
  const body = await request.json();

  try {
    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { userId, itemId, rating, review } = body;

    if (!userId || !itemId || !rating || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const itemReview = new ItemReview({
      reviewer: userId,
      item: itemId,
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

// delete
export const DELETE = async (request: NextRequest) => {
  connectToDatabase();

  try {
    const reviewId = request.headers.get("data");
    console.log("reviewId", reviewId);

    if (!reviewId)
      return NextResponse.json(
        { error: "No review ID provided" },
        { status: 400 }
      );

    const review = await ItemReview.findById(reviewId);
    console.log("review", review);

    if (!review)
      return NextResponse.json({ error: "Review not found" }, { status: 404 });

    await ItemReview.findByIdAndDelete(reviewId);

    return NextResponse.json({ message: "Review deleted successfully" });
     } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};


export const PUT = async (request: NextRequest) => {
  await connectToDatabase();
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

    const existingReview = await ItemReview.findOne({
      reviewer: userId,
      item: itemId,
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    existingReview.rating = rating;
    existingReview.review = review;
    await existingReview.save();

    return NextResponse.json({ message: "Review updated successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
