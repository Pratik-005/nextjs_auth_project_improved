import { connectToDB } from "@/db/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connectToDB();

export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'user does not exists' }, { status: 400 });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'incorrect credentials' }, { status: 400 });
        }

        const tokenData = { id: user._id, email: user.email }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1hr' })

        const res = NextResponse.json({
            message: 'Logged in successfully'
        }, { status: 200 });

        res.cookies.set('token', token, {
            httpOnly: true,
        });

        return res;

    } catch (error: any) {
        console.log('ERROR SIGNING UP USER :: ', error);
        return NextResponse.json({ message: error.message, }, { status: 500 });
    }
}