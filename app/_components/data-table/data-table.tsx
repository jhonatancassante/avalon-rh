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
import { DataTableFilterControls } from "./filter-controls";
import { DataTableActionButtons } from "./action-buttons";
import { DataTableHeader } from "./header";
import { DataTableBody } from "./body";
import { useEvents } from "@/app/_contexts/EventContext";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
}

const columnsWithFilters = [
    { field: "name", label: "nome" },
    { field: "date", label: "data" },
    { field: "dateToClose", label: "data de encerramento" },
];

export const DataTable = <TData, TValue>({
    columns,
}: Readonly<DataTableProps<TData, TValue>>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(columnsWithFilters[0]);
    const { eventList, refreshEvents } = useEvents();

    const table = useReactTable({
        data: eventList as TData[],
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
                <DataTableFilterControls
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    columnsWithFilters={columnsWithFilters}
                    table={table}
                />
                <DataTableActionButtons
                    selectedRows={table.getSelectedRowModel().rows}
                    onActionCompleted={refreshEvents}
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <DataTableHeader table={table} />
                <DataTableBody table={table} columns={columns} />
            </div>
            <DataTablePagination table={table} />
        </div>
    );
};
