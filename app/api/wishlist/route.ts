import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Item from "@/models/item";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    connectToDatabase();

    const requestData = JSON.parse(req.headers.get("data") || "");
    const { productId, userId } = requestData;

    if (!productId || !userId) {
      return NextResponse.json(
        {
          status: false,
          message: "productId and userId are required",
        },
        { status: 400 },
      );
    }

    console.log("productId", productId);
    console.log("userId", userId);

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const wishlistIndex = user.wishlist.indexOf(productId);

    const isWishlisted = wishlistIndex !== -1;

    return NextResponse.json({
      status: true,
      wishlisted: isWishlisted,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "An error occurred while checking the wishlist",
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    connectToDatabase();

    const data = await req.json();
    const { productId, userId } = data;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    const item = await Item.findById(productId);

    if (!item) {
      return NextResponse.json(
        {
          status: false,
          message: "Item not found",
        },
        { status: 404 },
      );
    }

    const wishlistIndex = user.wishlist.indexOf(productId);

    if (wishlistIndex === -1) {
      user.wishlist.push(productId);
      item.wishlistCount += 1;
    } else {
      user.wishlist.splice(wishlistIndex, 1);
      item.wishlistCount -= 1;
    }

    await user.save();
    await item.save();

    return NextResponse.json({
      status: true,
      message: "Wishlist updated",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "An error occurred while updating the wishlist",
    });
  }
}
