import { connectToDatabase } from "@/app/utils/database";
import Seller from "@/models/seller";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    connectToDatabase();

    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { creator, name, description } = body;

    const userCreator = await User.findById(creator);

    if (!userCreator) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    else if (userCreator.role == "seller") {
      return NextResponse.json(
        { error: "User is already a seller" },
        { status: 422 },
      );
    }

    console.log("new seller data: ", creator, name, description)

    const seller = new Seller({
      creator: creator,
      name: name,
      description: description,
      storeItems: [],
    });

    userCreator.role = "seller";

    await userCreator.save();
    await seller.save();

    return NextResponse.json({ status: true, seller: seller }, { status: 201 });
  } catch (error) {
    console.error("Error in creating seller!", error);
    return NextResponse.json(
      { message: "Error in creating seller!", error },
      { status: 500 },
    );
  }
};
