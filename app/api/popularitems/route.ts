import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";

export async function GET(req: NextRequest) {
    const items = await Item.find({}).sort({ timesVisited: -1 }).limit(4);
    return NextResponse.json({ items });
}