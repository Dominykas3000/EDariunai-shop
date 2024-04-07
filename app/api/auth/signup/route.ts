import { connectToDatabase } from "@/app/utils/database";
import User from "@/models/user";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    connectToDatabase().catch((error) => {
      console.error("Connection failed!", error);
      return NextResponse.json(
        { error: "Connection failed!" },
        { status: 500 }
      );
    });
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    console.log("body", body);
    const { username, email, password } = body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 422 }
      );
    }
    const newUser = await User.create({
      username,
      email,
      password: await hash(password, 10),
    });

    return NextResponse.json({ status: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in settings route!", error);
    return NextResponse.json(
      { message: "Error in settings route!", error },
      { status: 500 }
    );
  }
}
