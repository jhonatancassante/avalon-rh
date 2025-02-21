"use client";

import { useState } from "react";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "./view-options";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { FilterControls } from "./filter-controls";
import { ActionButtons } from "./action-buttons";
import { DataTableHeader } from "./data-table-header";
import { DataTableBody } from "./data-table-body";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const columnsWithFilters = [
    { field: "name", label: "nome" },
    { field: "date", label: "data" },
    { field: "dateToClose", label: "data de encerramento" },
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
    const [selectedFilter, setSelectedFilter] = useState(columnsWithFilters[0]);

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
        state: { sorting, columnFilters, columnVisibility, rowSelection },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <FilterControls
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    columnsWithFilters={columnsWithFilters}
                    table={table}
                />
                <ActionButtons />
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <DataTableHeader table={table} />
                <DataTableBody table={table} columns={columns} />
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
