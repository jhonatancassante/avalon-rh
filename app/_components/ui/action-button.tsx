"use client";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { ReactNode } from "react";

interface ActionButtonProps {
    icon: ReactNode;
    tooltipText: string;
    onClick: () => void;
    ghost?: boolean;
}

export const ActionButton = ({
    icon,
    tooltipText,
    onClick,
    ghost = false,
}: Readonly<ActionButtonProps>) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size={"icon"}
                    onClick={onClick}
                    variant={ghost ? "ghost" : "default"}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
    );
};
