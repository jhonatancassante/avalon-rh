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

interface FilterControlsProps<TData> {
    selectedFilter: { field: string; label: string };
    setSelectedFilter: (filter: { field: string; label: string }) => void;
    columnsWithFilters: { field: string; label: string }[];
    table: Table<TData>;
}

export const DataTableFilterControls = <TData,>({
    selectedFilter,
    setSelectedFilter,
    columnsWithFilters,
    table,
}: Readonly<FilterControlsProps<TData>>) => {
    const handleCleanFilter = () => {
        table.resetColumnFilters();

        table.getColumn(selectedFilter.field)?.setFilterValue("");
    };

    return (
        <div className="relative flex gap-4">
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
                className="max-w-sm pr-12"
            />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        className="absolute right-[136px] top-0"
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
            <Select
                value={selectedFilter.field}
                onValueChange={(value) => {
                    const newFilter = columnsWithFilters.find(
                        (item) => item.field === value,
                    );
                    if (newFilter) setSelectedFilter(newFilter);
                }}
            >
                <SelectTrigger className="w-[180px] max-w-[180px] text-ellipsis text-wrap text-left">
                    <SelectValue placeholder="Filtros..." />
                </SelectTrigger>
                <SelectContent>
                    {columnsWithFilters.map((item) => (
                        <SelectItem value={item.field} key={item.field}>
                            <span className="capitalize">{item.label}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
