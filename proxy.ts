import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const token = request.cookies.get('toekn')?.value || '';

    const isPublicPath = ['/login', '/signup'].includes(path);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();

}
