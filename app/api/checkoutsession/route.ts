const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';


export async function POST(req: any, res: any) {
  try {
    const origin  = req.headers.get("origin");

    const body = await req.json();
    const { items } = body;

    if (!items) {
      return NextResponse.json({ message: 'Items are required' }, { status: 400 });
    }
    const transformedItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.statusCode || 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}