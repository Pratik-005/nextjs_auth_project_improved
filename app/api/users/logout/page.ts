import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error: any) {
        console.log('ERROR LOGGING OUT USER :: ', error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

