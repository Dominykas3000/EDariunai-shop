import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";

export async function GET(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const item = await Item.findById(params.itemId);

  return NextResponse.json({
    status: true,
    item: item.toJSON(),
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
  await Item.findByIdAndDelete(id);

  return NextResponse.json({
    status: true,
    message: `Delete product: ${params.itemId} route`,
  });
}
