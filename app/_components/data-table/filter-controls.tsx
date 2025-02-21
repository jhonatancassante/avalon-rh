import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface FilterControlsProps<TData> {
    selectedFilter: { field: string; label: string };
    setSelectedFilter: (filter: { field: string; label: string }) => void;
    columnsWithFilters: { field: string; label: string }[];
    table: Table<TData>;
}

export function FilterControls<TData>({
    selectedFilter,
    setSelectedFilter,
    columnsWithFilters,
    table,
}: Readonly<FilterControlsProps<TData>>) {
    return (
        <div className="flex gap-4">
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
                className="max-w-sm"
            />
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
}
