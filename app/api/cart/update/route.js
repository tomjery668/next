import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/config/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        // Check if user is authenticated
        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' });
        }

        const { cartData } = await request.json();

        // Validate cartData
        if (cartData === undefined || cartData === null) {
            return NextResponse.json({ success: false, message: 'Invalid cart data' });
        }

        await connectDB();
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        // Ensure cartData is an object (fallback to empty object)
        user.cartItems = cartData || {};
        await user.save();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Cart UPDATE error:', error);
        return NextResponse.json({ success: false, message: error.message });
    }
}