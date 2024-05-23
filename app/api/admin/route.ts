import { connectToDatabase } from "@/utils/database";
import Seller from "@/models/seller";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { sellerId } = await request.json();

    try {
        await connectToDatabase();
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return NextResponse.json({ error: "Seller not found" }, { status: 404 });
        }

        seller.flagged = !seller.flagged;
        await seller.save();

        return NextResponse.json({ seller }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
