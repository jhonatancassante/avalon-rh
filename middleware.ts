import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./app/_constants/roles";

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req: request, secret });

    if (request.nextUrl.pathname.startsWith("/pages/admin")) {
        if (!token || token.role !== Roles.Admin) {
            return NextResponse.redirect(new URL("/pages/401", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/pages/leader")) {
        if (
            !token ||
            (token.role !== Roles.Leader && token.role !== Roles.Admin)
        ) {
            return NextResponse.redirect(new URL("/pages/401", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/pages")) {
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/pages/admin/:path*", "/pages/leader/:path*", "/pages/:path*"],
};
