"use client";

import { cloneElement, useState } from "react";
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
import { DataTableHeader } from "./header";
import { DataTableBody } from "./body";
import { DataTableEventActionButtonsProps } from "../event-data-table/event-action-buttons";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    itemList: object[];
    isLoading: boolean;
    columnsWithFilters: { field: string; label: string }[];
    refreshList: () => Promise<void>;
    actionButtons?: React.ReactElement<DataTableEventActionButtonsProps<TData>>;
}

export const DataTable = <TData, TValue>({
    columns,
    itemList,
    isLoading,
    columnsWithFilters,
    actionButtons,
}: Readonly<DataTableProps<TData, TValue>>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(columnsWithFilters[0]);

    const table = useReactTable({
        data: itemList as TData[],
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
                {actionButtons &&
                    cloneElement(actionButtons, {
                        selectedRows: table.getSelectedRowModel().rows,
                    })}
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <DataTableHeader table={table} />
                <DataTableBody
                    table={table}
                    columns={columns}
                    isLoading={isLoading}
                />
            </div>
            <DataTablePagination table={table} />
        </div>
    );
};
