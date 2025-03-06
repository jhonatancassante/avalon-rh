"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { useState } from "react";
import { Button } from "../ui/button";

interface FormTooltipProps {
    msg: string;
}

const FormTooltip = ({ msg }: FormTooltipProps) => {
    const [openTooltip, setOpenTooltip] = useState(false);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                <TooltipTrigger asChild>
                    <Button
                        className="flex h-[18px] w-[18px] items-center justify-center rounded-full p-0"
                        onClick={() => setOpenTooltip(true)}
                        type="button"
                        variant={"outline"}
                    >
                        <FontAwesomeIcon
                            icon={faQuestion}
                            transform="shrink-5"
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{msg}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default FormTooltip;
