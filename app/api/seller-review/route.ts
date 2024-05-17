import Seller from "@/models/seller";
import { connectToDatabase } from "@/utils/database";
import SellerReview from "@/models/sellerreview";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  connectToDatabase();
  const body = await request.json();


  try {
    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    
    const { userId, sellerId, rating, review } = body;
    
    console.log("HERE: "+sellerId)
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
