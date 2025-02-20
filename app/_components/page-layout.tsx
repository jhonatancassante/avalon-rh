"use client";

import { ReactNode, useEffect } from "react";
import { Card } from "./ui/card";
import { useLoading } from "../_contexts/LoadingContext";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [setIsLoading]);

    return (
        <main className="flex w-full justify-center py-5 sm:px-2 lg:px-24">
            <Card className="mx-4 my-1 flex w-full flex-col items-center justify-center p-2 lg:max-w-4xl">
                {children}
            </Card>
        </main>
    );
};

export default PageLayout;
