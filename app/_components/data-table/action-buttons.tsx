import { Button } from "../ui/button";
import { Delete, Pencil, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

export function ActionButtons() {
    return (
        <div className="ml-20 flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"}>
                            <Pencil />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abrir Inscrições</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"}>
                            <Delete />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Finalizar</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"}>
                            <Trash2 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
