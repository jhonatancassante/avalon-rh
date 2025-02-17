"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

interface LoadingProviderProps {
    children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error(
            "useLoading deve ser usado dentro de um LoadingProvider",
        );
    }
    return context;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const value = useMemo(
        () => ({ isLoading, setIsLoading }),
        [isLoading, setIsLoading],
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};
