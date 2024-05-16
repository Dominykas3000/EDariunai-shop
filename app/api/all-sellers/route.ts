import { NextRequest, NextResponse } from "next/server";
import Seller from "@/models/seller";
import { connectToDatabase } from "@utils/database";

export async function GET(req: NextRequest) {
  connectToDatabase();
  const sellers = await Seller.find({});
  return NextResponse.json({ sellers });
}
