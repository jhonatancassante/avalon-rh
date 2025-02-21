import { cn } from "@/app/_lib/utils";
import { Column } from "@tanstack/react-table";
import { ChevronsDown, ChevronsUp, ChevronsUpDown, EyeOff } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

const sortedArrow = (sortOrder: "asc" | "desc" | false) => {
    const iconDirection = {
        asc: <ChevronsUp />,
        desc: <ChevronsDown />,
    };

    if (!sortOrder) return <ChevronsUpDown />;

    return iconDirection[sortOrder];
};

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {sortedArrow(column.getIsSorted())}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(false)}
                    >
                        <ChevronsUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Crescente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(true)}
                    >
                        <ChevronsDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Decrescente
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => column.toggleVisibility(false)}
                    >
                        <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Ocultar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
