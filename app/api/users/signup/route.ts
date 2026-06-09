import { connectToDB } from "@/db/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";


connectToDB();

export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'user already exists' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);  
        const hashedPassword = await bcrypt.hash(password, salt);      

        const newUser = new User({
            email: email,
            password: hashedPassword,
        });

        await newUser.save();;

        return NextResponse.json({ message: 'account created successfullly' }, { status: 201 });

    } catch (error: any) {
        console.log('ERROR SIGNING UP USER :: ', error);
        return NextResponse.json({ message: error.message, }, { status: 500 });
    }
}