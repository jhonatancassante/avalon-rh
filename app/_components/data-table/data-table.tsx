"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { useState } from "react";
import { Input } from "../ui/input";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "./view-options";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Delete, Pencil, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const columnsFilters = [
    {
        field: "name",
        label: "nome",
    },
    {
        field: "date",
        label: "data",
    },
    {
        field: "dateToClose",
        label: "data de encerramento",
    },
];

export function DataTable<TData, TValue>({
    columns,
    data,
}: Readonly<DataTableProps<TData, TValue>>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [selectedFilter, setSelectedFilter] = useState({
        field: "name",
        label: "nome",
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
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
                            const newFilter = columnsFilters.filter((item) => {
                                if (item.field === value) {
                                    return true;
                                }
                                return false;
                            })[0];
                            setSelectedFilter(newFilter);
                        }}
                    >
                        <SelectTrigger className="w-[180px] max-w-[180px] text-ellipsis text-wrap text-left">
                            <SelectValue placeholder="Filtros..." />
                        </SelectTrigger>
                        <SelectContent>
                            {columnsFilters.map((item) => {
                                return (
                                    <SelectItem
                                        value={item.field}
                                        key={item.field}
                                    >
                                        <span className="capitalize">
                                            {item.label}
                                        </span>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
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
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
