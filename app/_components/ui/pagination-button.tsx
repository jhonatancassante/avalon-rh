import { Button } from "./button";
import { ReactNode } from "react";

interface PaginationButtonProps {
    icon: ReactNode;
    onClick: () => void;
    disabled: boolean;
    ariaLabel: string;
    className?: string;
}

export const PaginationButton = ({
    icon,
    onClick,
    disabled,
    ariaLabel,
    className,
}: Readonly<PaginationButtonProps>) => {
    return (
        <Button
            variant="outline"
            className={`h-8 w-8 p-0 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="sr-only">{ariaLabel}</span>
            {icon}
        </Button>
    );
};
