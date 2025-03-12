"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { X } from "lucide-react";
import { useIsMobile } from "@/app/_hooks/useMobile";

interface FilterControlsProps<TData> {
    selectedFilter: { field: string; label: string };
    setSelectedFilter: (filter: {
        field: string;
        label: string;
        filter: boolean;
    }) => void;
    columnsNames: { field: string; label: string; filter: boolean }[];
    table: Table<TData>;
}

export const DataTableFilterControls = <TData,>({
    selectedFilter,
    setSelectedFilter,
    columnsNames,
    table,
}: Readonly<FilterControlsProps<TData>>) => {
    const isMobile = useIsMobile();

    const handleCleanFilter = () => {
        table.resetColumnFilters();

        table.getColumn(selectedFilter.field)?.setFilterValue("");
    };

    return (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[3fr_1fr]">
            <div className="relative w-full">
                <Input
                    placeholder={`Filtrar por ${selectedFilter.label}...`}
                    value={
                        (table
                            .getColumn(selectedFilter.field)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(selectedFilter.field)
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full max-w-full pr-9"
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                            className="absolute right-0 top-0"
                            asChild
                        >
                            <Button
                                size={"icon"}
                                variant={"ghost"}
                                onClick={handleCleanFilter}
                            >
                                <X />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Limpar filtro</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {!isMobile && (
                <Select
                    value={selectedFilter.field}
                    onValueChange={(value) => {
                        const newFilter = columnsNames.find(
                            (item) => item.field === value,
                        );
                        if (newFilter) setSelectedFilter(newFilter);
                    }}
                >
                    <SelectTrigger className="w-[120px] max-w-[120px] text-ellipsis text-wrap text-left">
                        <SelectValue placeholder="Filtros..." />
                    </SelectTrigger>
                    <SelectContent>
                        {columnsNames.map((item) => {
                            if (!item.filter) return;
                            return (
                                <SelectItem value={item.field} key={item.field}>
                                    <span className="capitalize">
                                        {item.label}
                                    </span>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};
