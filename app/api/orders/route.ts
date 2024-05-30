import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    const { orders } = body;

    orders.forEach(async (order: any) => {
      const newOrder = await Order.create({
        buyerid: order.buyer_id,
        quantity: order.quantity,
        itemid: order.item_id,
        sellerid: order.seller_id,
      });
    });

    return NextResponse.json({ message: "Order created successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {

  try {
    const sellerid = request.headers.get("seller");
    const buyerid = request.headers.get("buyer");
    if (sellerid) {
      console.log("sellerid", sellerid);
      const orders = await Order.find
      ({ sellerid: sellerid });
      return NextResponse.json({ orders });
    }
    if (buyerid) {
      console.log("buyerid", buyerid);
      const orders = await Order.find
      ({ buyerid: buyerid });
      return NextResponse.json({ orders });
    }
    return NextResponse.json({ error: "No seller or buyer id provided" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
