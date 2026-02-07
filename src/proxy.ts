import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // Define protected routes
    const protectedRoutes = ['/dashboard', '/statistics'];
    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Check for common auth cookies
        // Adjust 'access_token' if the actual cookie name is different
        const token = request.cookies.get('access_token') ||
            request.cookies.get('session_id') ||
            request.cookies.get('token');

        if (!token) {
            const loginUrl = new URL('/signin', request.url); // or /signin
            // loginUrl.searchParams.set('from', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/statistics/:path*',
    ],
};
