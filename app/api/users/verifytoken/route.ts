import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ message: 'Invalid tokn' }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}