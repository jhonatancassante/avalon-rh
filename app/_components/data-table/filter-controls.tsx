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
import { useIsMobile } from "@/app/_hooks/use-mobile";

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
        <div className="relative flex w-full gap-4">
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
                className="w-full max-w-full pr-10 lg:max-w-sm lg:pr-12"
            />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        className="absolute right-0 top-0 lg:right-[136px]"
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
                    <SelectTrigger className="w-[180px] max-w-[180px] text-ellipsis text-wrap text-left">
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
