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
            setIsLoading(true);
            router.push(`/pages/user/${session.data.user.id}`);
        }
    }, [router, session.data, session.status, setIsLoading]);

    return (
        <>
            {!session.data ? (
                <div className="flex min-h-[85vh] items-center justify-center bg-primary-foreground">
                    <LoginCard />
                </div>
            ) : (
                <div className="flex min-h-[85vh] items-center justify-center bg-primary-foreground"></div>
            )}
        </>
    );
}
