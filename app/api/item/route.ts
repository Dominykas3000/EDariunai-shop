import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/item";

export async function GET(req: NextRequest) {
  const itemId = req.headers.get("data");

  const item = await Item.findById(itemId);

  return NextResponse.json({
    status: true,
    item: item.toJSON(),
  });
}

export async function POST(request: NextRequest) {
  const { name, price, description, tags, stock, category, sellerId, photoLink } =
    await request.json();
    console.log("photolink\n\n\n", photoLink);
  const item = await Item.create({
    name,
    price,
    description,
    tags,
    stock,
    category,
    sellerId,
    image: photoLink,
  });

  return NextResponse.json({
    status: true,
    message: `Created product: ${item._id} route`,
  });
}

export async function PUT(req: NextRequest) {
  const {
    itemId,
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

  await Item.findByIdAndUpdate(itemId, {
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
    message: `Update product: ${itemId} route`,
  });
}

export async function DELETE(req: NextRequest) {
  const id = req.headers.get("data");
  await Item.findByIdAndDelete(id);

  return NextResponse.json({
    status: true,
    message: `Delete product: ${id} route`,
  });
}
