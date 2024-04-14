import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";

export async function GET(
  req: NextRequest, { params }: { params: { itemId: string } }
) {
  await connectToDatabase();
  const items = await Item.findById(params.itemId);

  return NextResponse.json({
    status: true,
    message: {items},
  });
}
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { newName: name, newPrice: price, newDescription: description, newTags: tags, newStock: stock, image, salePrice, saleStartDate, saleEndDate, saleActive, newCategory: category, sellerId} = await req.json();
  await connectToDatabase();

  // TODO: Implement saleActive logic
  // if( (salePrice < price) && saleStartDate <= Date() && saleEndDate >= Date() ) {
  //   const saleActive = true;
  // }

  await Item.findByIdAndUpdate(params.itemId, {
    name,
    price,
    description,
    tags,
    stock,
    image,
    salePrice,
    saleStartDate,
    saleEndDate,
    saleActive,
    category,
    sellerId,
  })

  return NextResponse.json({
    status: true,
    message: `Update product: ${params.itemId} route`,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const id = params.itemId;
  await connectToDatabase();
  await Item.findByIdAndDelete(id);

  return NextResponse.json({
    status: true,
    message: `Delete product: ${params.itemId} route`,
  });
}