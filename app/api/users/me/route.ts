import User from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById(userId).select('-password');
        return NextResponse.json({ user: user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}