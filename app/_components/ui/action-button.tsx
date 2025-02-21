"use client";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { ReactNode } from "react";

interface ActionButtonProps {
    icon: ReactNode;
    tooltipText: string;
    onClick: () => void;
}

export const ActionButton = ({
    icon,
    tooltipText,
    onClick,
}: Readonly<ActionButtonProps>) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size={"icon"} onClick={onClick}>
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
    );
};
