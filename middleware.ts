import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next (internal Next.js routes)
         */
        '/((?!_next).*)',
    ],
};

export function middleware(request: NextRequest) {
    return NextResponse.next();
}
