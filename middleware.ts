import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./app/_constants/roles";

// Constantes para paths e mensagens
const PATHS = {
    ADMIN: "/pages/admin",
    LEADER: "/pages/leader",
    USER: "/pages/user",
    UNAUTHORIZED: "/pages/errors/401",
    HOME: "/",
    USER_EDIT: "/pages/user/edit", // Página de edição de perfil
};

// Função auxiliar para verificar roles
interface Token {
    userId: string;
    role: string;
    isComplete: boolean;
}

const hasRequiredRole = (token: Token | null, allowedRoles: string[]) => {
    return token && allowedRoles.includes(token.role);
};

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = (await getToken({ req: request, secret })) as Token | null;

    // Log para depuração
    console.log("Middleware triggered for:", request.nextUrl.pathname);
    console.log("User role:", token?.role);
    console.log("Is profile complete?", token?.isComplete);

    // Verificar se o usuário está autenticado (tem um token válido)
    if (
        request.nextUrl.pathname.startsWith(PATHS.ADMIN) ||
        request.nextUrl.pathname.startsWith(PATHS.LEADER) ||
        request.nextUrl.pathname.startsWith(PATHS.USER)
    ) {
        // Se o usuário não estiver autenticado, redirecione para a página inicial
        if (!token) {
            console.error("User not authenticated. Redirecting to home page");
            return NextResponse.redirect(new URL(PATHS.HOME, request.url));
        }

        // Se o perfil não estiver completo e o usuário não estiver na página de edição, redirecione para a página de edição
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

    // Verificar rotas de admin
    if (request.nextUrl.pathname.startsWith(PATHS.ADMIN)) {
        if (!hasRequiredRole(token, [Roles.Admin])) {
            console.error("Redirecting to unauthorized page");
            return NextResponse.redirect(
                new URL(PATHS.UNAUTHORIZED, request.url),
            );
        }
    }

    // Verificar rotas de leader
    if (request.nextUrl.pathname.startsWith(PATHS.LEADER)) {
        if (!hasRequiredRole(token, [Roles.Leader, Roles.Admin])) {
            console.error("Redirecting to unauthorized page");
            return NextResponse.redirect(
                new URL(PATHS.UNAUTHORIZED, request.url),
            );
        }
    }

    // Continuar a requisição se todas as verificações passarem
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/pages/admin/:path*",
        "/pages/leader/:path*",
        "/pages/user/:path*",
    ],
};
