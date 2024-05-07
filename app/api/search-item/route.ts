import Item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@utils/database";

export async function GET(req: NextRequest) {
  const itemQuery = req.headers.get("data");

  console.log("itemQuery", itemQuery);
  if (!itemQuery) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }


  connectToDatabase();
  const items = await Item.find({ name: { $regex: itemQuery, $options: "i" } });
  return NextResponse.json({ items });
}
