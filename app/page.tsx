"use client";

import { useSession } from "next-auth/react";
import LoginCard from "./_components/login-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "./_contexts/LoadingContext";

export default function Home() {
    const session = useSession();
    const router = useRouter();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        if (session.data?.user) {
            router.push(`/pages/user/${session.data.user.id}`);
        }
        if (session.status === "loading") {
            setIsLoading(true);
        }
        setIsLoading(false);
    }, [router, session.data, session.status, setIsLoading]);

    return (
        <div className="flex min-h-[85vh] items-center justify-center bg-primary-foreground">
            <LoginCard />
        </div>
    );
}
