import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const auth = await getAuth(request);
        const userId = auth && auth.userId;
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();

        const orders = await Order.find({ userId }).populate('address items.product');

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

