import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";

export async function GET() {
  await connectToDatabase();
  const items = await Item.find();

  return NextResponse.json({
    status: true,
    data: items,
  });
}