"use client";

import { useSession } from "next-auth/react";
import LoginCard from "./_components/login-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "./_components/loading-indicator";

export default function Home() {
    const session = useSession();
    const router = useRouter();
    const isLoading = session.status === "loading" || session.data?.user;

    useEffect(() => {
        if (session.data?.user) {
            router.push("/pages/home");
        }
    }, [router, session.data]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-primary-foreground">
            {isLoading ? <LoadingIndicator /> : <LoginCard />}
        </div>
    );
}
