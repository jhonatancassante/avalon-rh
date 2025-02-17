"use client";

import { useTheme } from "next-themes";
import React from "react";
import { useLoading } from "../_contexts/LoadingContext";

const LoadingIndicator: React.FC = () => {
    const { theme } = useTheme();
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div>
            <div
                className={`fixed left-0 top-0 z-10 h-[110vh] w-full bg-foreground ${theme === "light" ? "opacity-90" : "opacity-10"}`}
            ></div>
            <div className="fixed left-0 top-0 z-20 flex h-[110vh] w-full flex-col items-center justify-center gap-4">
                <div className="loader h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-dotted border-background border-r-foreground border-t-foreground"></div>
                <div className="text-xl font-bold text-foreground">
                    Carregando...
                </div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
