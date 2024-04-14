import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";

export async function POST(
    request: NextRequest,
  ) {
  
    const { name, price, description, tags, stock, category, sellerId } = await request.json();
    await connectToDatabase();
    const item = await Item.create({
      name,
      price,
      description,
      tags,
      stock,
      category,
      sellerId,
    });
  
    return NextResponse.json({
      status: true,
      message: `Created product: ${item._id} route`,
    });
  }