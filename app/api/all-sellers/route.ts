import { NextRequest, NextResponse } from "next/server";
import Seller from "@/models/seller";

export async function GET(req: NextRequest) {
  const sellers = await Seller.find({});
  return NextResponse.json(sellers);
}
