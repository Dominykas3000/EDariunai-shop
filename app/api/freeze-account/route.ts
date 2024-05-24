import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";


export const PUT = async (request: NextRequest, response: NextResponse) => {
    await connectToDatabase();
      try {
        const userId = request.headers.get("data");
        const user = await User.findById(userId);

        console.log('user', user)
  
        if (!user) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (user.frozen) {
          user.frozen = false;
        } else {
          user.frozen = true;
        }
  
        await user.save();
  
        return NextResponse.json({ message: 'Account frozen/unfrozen successfully' });
      } catch (error) {
        console.error('Error freezing/unfreezing account:', error);
        return NextResponse.json({ error }, { status: 500 });
      }
}