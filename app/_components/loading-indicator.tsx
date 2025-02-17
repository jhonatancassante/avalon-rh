import { useTheme } from "next-themes";
import React from "react";

const LoadingIndicator: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div>
            <div
                className={`fixed left-0 top-0 z-10 h-[110vh] w-full bg-foreground ${theme === "light" ? "opacity-90" : "opacity-10"}`}
            ></div>
            <div className="fixed left-0 top-0 z-20 flex h-[110vh] w-full flex-col items-center justify-center gap-4">
                <div className="loader h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-dotted border-t-white"></div>
                <div className="text-xl font-bold text-white">
                    Carregando...
                </div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
