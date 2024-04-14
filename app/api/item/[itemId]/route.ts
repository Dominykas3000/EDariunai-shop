import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";

export async function GET(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {

  return NextResponse.json({
    status: true,
    message: "nonono",
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const {
    newName: name,
    newPrice: price,
    newDescription: description,
    newTags: tags,
    newStock: stock,
    image,
    salePrice,
    saleStartDate,
    saleEndDate,
    saleActive,
    newCategory: category,
    sellerId,
  } = await req.json();
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
  });

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
