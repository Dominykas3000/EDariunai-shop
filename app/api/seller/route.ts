import Item from "@/models/item";
import Seller from "@/models/seller";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sellerId = req.headers.get("data");

  const items = await Item.find({ sellerId: sellerId });

  return NextResponse.json({
    items,
  });
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (!body)
      return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { creator, name, description } = body;

    if (!creator || !name || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const nameRegex =
      !/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū.\s]*$/.test(
        name,
      );

    if (nameRegex) {
      return NextResponse.json(
        {
          error:
            "Invalid name, it should contain 3-20 alphanumeric characters and be unique!",
        },
        { status: 422 },
      );
    }

    const descriptionRegex = !/^.{10,500}$/.test(description);

    if (descriptionRegex) {
      return NextResponse.json(
        {
          error:
            "Invalid description, it should contain between 10 and 500 characters!",
        },
        { status: 422 },
      );
    }

    const userCreator = await User.findById(creator);

    if (!userCreator) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else if (userCreator.role == "seller") {
      return NextResponse.json(
        { error: "User is already a seller" },
        { status: 422 },
      );
    }

    const seller = new Seller({
      creator: creator,
      name: name,
      description: description,
      storeItems: [],
      sellerReviews: [],
    });

    console.log("seller", seller);

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
