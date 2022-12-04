import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Redirect if they don't have the appropriate role
        if (
            req.nextUrl.pathname.startsWith('/admin') &&
            req.nextauth.token?.user.role !== 'ADMIN'
        ) {
            return NextResponse.redirect(new URL('/my', req.url));
        }
    },
    {
        pages: {
            signIn: '/login'
        }
    }
);

export const config = {
    matcher: ['/my/:path', '/admin/:path']
};
