import Seller from "@/models/seller";
import { connectToDatabase } from "@/utils/database";
import SellerReview from "@/models/sellerreview";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const sellerId = searchParams.get("sellerId");

  if (!userId || !sellerId) {
    return NextResponse.json(
      { error: "Missing userId or sellerId" },
      { status: 400 },
    );
  }

  try {
    const review = await SellerReview.findOne({
      reviewer: userId,
      seller: sellerId,
    });
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

    const { userId, sellerId, rating, review } = body;

    if (!userId || !sellerId || !rating || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    const sellerReview = new SellerReview({
      reviewer: userId,
      seller: sellerId,
      rating,
      review,
    });

    await sellerReview.save();

    seller.sellerReviews.push(sellerReview._id);
    await seller.save();

    return NextResponse.json({ message: "Review created successfully" });
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

    const { userId, sellerId, rating, review } = body;

    if (!userId || !sellerId || !rating || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingReview = await SellerReview.findOne({
      reviewer: userId,
      seller: sellerId,
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

export const DELETE = async (request: NextRequest) => {
  await connectToDatabase();
  try {
    const reviewId = request.headers.get("data");
    console.log("reviewId", reviewId);

    if (!reviewId)
      return NextResponse.json(
        { error: "No review ID provided" },
        { status: 400 },
      );

    const review = await SellerReview.findById(reviewId);
    console.log("review", review);

    if (!review)
      return NextResponse.json({ error: "Review not found" }, { status: 404 });

    await SellerReview.findByIdAndDelete(reviewId);

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
    
  }
};