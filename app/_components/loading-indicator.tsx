import React from "react";

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="loader h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-dotted border-t-primary"></div>
            <div className="text-xl font-bold text-primary">Carregando...</div>
        </div>
    );
};

export default LoadingIndicator;
