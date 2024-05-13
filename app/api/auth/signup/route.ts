import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const { username, email, password } = body;

    const usernameRegex =
      /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū._]+(?<![_.])$/;

    // Check if the username complies with the regex
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username does not meet requirements" },
        { status: 422 },
      );
    }

    const passwordRegex = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      password,
    );

    if (passwordRegex) {
      return NextResponse.json(
        { error: "Password does not meet requirements" },
        { status: 422 },
      );
    }

    const checkUserEmail = await User.findOne({ email: email });

    if (checkUserEmail) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 422 },
      );
    }

    const checkUserName = await User.findOne({
      username: username,
    });

    if (checkUserName) {
      return NextResponse.json(
        { error: "User already exists with this username" },
        { status: 422 },
      );
    }

    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return NextResponse.json({ status: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in settings route!", error);
    return NextResponse.json(
      { message: "Error in settings route!", error },
      { status: 500 },
    );
  }
}
