import { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { getUserUpdate } from "../_data/getUserUpdate";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            isComplete: boolean;
        } & DefaultSession["user"];
    }
}

interface CustomAdapterUser extends AdapterUser {
    role: string;
    isComplete: boolean;
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, trigger, user }) {
            if (user) {
                token.userId = user.id;
                token.role = (user as CustomAdapterUser).role;
                token.isComplete = (user as CustomAdapterUser).isComplete;
            }
            if (trigger === "update") {
                const userUpdate = await getUserUpdate(token.userId as string);
                token.role = userUpdate.role;
                token.isComplete = userUpdate.isComplete;
            }
            return token;
        },
        async session({ session, trigger, token }) {
            session.user = {
                ...session.user,
                id: token.userId as string,
                role: token.role as string,
                isComplete: token.isComplete as boolean,
            };
            if (trigger === "update") {
                session.user = {
                    ...session.user,
                    id: token.userId as string,
                    role: token.role as string,
                    isComplete: token.isComplete as boolean,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        newUser: "/pages/user",
    },
};
