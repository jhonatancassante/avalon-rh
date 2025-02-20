"use client";

import { useSession } from "next-auth/react";
import LoginCard from "./_components/login-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "./_contexts/LoadingContext";
import { PATHS } from "./_constants/paths";

export default function Home() {
    const session = useSession();
    const router = useRouter();
    const { setIsLoading } = useLoading();

    useEffect(() => {
        if (session.data?.user) {
            setIsLoading(true);
            router.prefetch(`${PATHS.USER}/${session.data.user.id}`);

            const timer = setTimeout(() => {
                router.push(`${PATHS.USER}/${session.data.user.id}`);
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
        if (!session.data?.user.isComplete) {
            setIsLoading(true);
            router.prefetch(`${PATHS.USER_EDIT}/${session?.data?.user.id}`);

            const timer = setTimeout(() => {
                router.push(`${PATHS.USER_EDIT}/${session?.data?.user.id}`);
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [router, session.data, session.status, setIsLoading]);

    return (
        <>
            {!session.data ? (
                <div className="flex min-h-[88vh] w-full items-center justify-center bg-primary-foreground">
                    <LoginCard />
                </div>
            ) : (
                <div className="flex min-h-[88vh] w-full items-center justify-center bg-primary-foreground"></div>
            )}
        </>
    );
}
