import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./app/_constants/roles";
import { PATHS } from "./app/_constants/paths";

interface Token {
    userId: string;
    role: string;
    isComplete: boolean;
    isDeleted: boolean;
}

const hasRequiredRole = (token: Token | null, allowedRoles: string[]) => {
    return token && allowedRoles.includes(token.role);
};

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = (await getToken({ req: request, secret })) as Token | null;

    if (
        request.nextUrl.pathname.startsWith(PATHS.ADMIN) ||
        request.nextUrl.pathname.startsWith(PATHS.LEADER) ||
        request.nextUrl.pathname.startsWith(PATHS.USER)
    ) {
        if (!token) {
            console.error("User not authenticated. Redirecting to home page");
            return NextResponse.redirect(new URL(PATHS.HOME, request.url));
        }

        if (token.isDeleted) {
            console.error("Access Forbiden. Redirecting to forbiden page.");
            return NextResponse.redirect(new URL(PATHS.ERROR_403, request.url));
        }

        if (
            !token.isComplete &&
            !request.nextUrl.pathname.startsWith(PATHS.USER_EDIT)
        ) {
            console.error(
                "User profile not complete. Redirecting to user edit page",
            );
            const redirectUrl = PATHS.USER_EDIT + "/" + token?.userId;
            return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith(PATHS.ADMIN)) {
        if (!hasRequiredRole(token, [Roles.Admin])) {
            console.error("Redirecting to unauthorized page");
            return NextResponse.redirect(new URL(PATHS.ERROR_401, request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith(PATHS.LEADER)) {
        if (!hasRequiredRole(token, [Roles.Leader, Roles.Admin])) {
            console.error("Redirecting to unauthorized page");
            return NextResponse.redirect(new URL(PATHS.ERROR_401, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/pages/admin/:path*",
        "/pages/leader/:path*",
        "/pages/user/:path*",
    ],
};
