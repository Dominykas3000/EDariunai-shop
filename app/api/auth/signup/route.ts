import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    console.log("body", body);

    const { username, email, password } = body;

    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 422 }
      );
    }
    console.log("new user data: ", username, email, password);
    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    console.log("credentials create");
    return NextResponse.json({ status: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in settings route!", error);
    return NextResponse.json(
      { message: "Error in settings route!", error },
      { status: 500 }
    );
  }
}
