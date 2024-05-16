import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";
import Item from "@/models/item";

export async function GET(req: NextRequest) {
  try {
    connectToDatabase();

    const requestData = JSON.parse(req.headers.get("data") || "");
    const { userId } = requestData;

    if (!userId) {
      return NextResponse.json(
        {
          status: false,
          message: "userId is required",
        },
        { status: 400 },
      );
    }

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

    const wishlistedItems = await Promise.all(
      user.wishlist.map(async (itemId: string) => {
        const item = await Item.findById(itemId);
        return item;
      }),
    );

    return NextResponse.json({
      status: true,
      wishlist: wishlistedItems,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "An error occurred while checking the wishlist",
    });
  }
}
