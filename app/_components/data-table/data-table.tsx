"use client";

import { cloneElement, useEffect, useState } from "react";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "./view-options";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { DataTableFilterControls } from "./filter-controls";
import { DataTableHeader } from "./header";
import { DataTableBody } from "./body";
import { useIsMobile } from "@/app/_hooks/use-mobile";
import { Meta } from "@/app/_types/meta";

export interface DataTableActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    onActionCompleted: () => Promise<void>;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    itemList: object[];
    isLoading: boolean;
    columnsNames: { field: string; label: string; filter: boolean }[];
    actionButtons?: React.ReactElement<DataTableActionButtonsProps<TData>>;
}

export const DataTable = <TData, TValue>({
    columns,
    itemList,
    isLoading,
    columnsNames,
    actionButtons,
}: Readonly<DataTableProps<TData, TValue>>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(columnsNames[0]);
    const isMobile = useIsMobile();

    useEffect(() => {
        const newVisibility: VisibilityState = {};
        columns.forEach((column) => {
            const columnId = column.id;
            if (columnId) {
                newVisibility[columnId] = !(
                    isMobile && (column.meta as Meta)?.hideOnMobile
                );
            }
        });
        setColumnVisibility((prev) => ({
            ...prev,
            ...newVisibility,
        }));
    }, [isMobile, columns]);

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
        <div className="space-y-4">
            <div className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-[3fr_2fr_1fr] lg:grid-rows-1">
                <DataTableFilterControls
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    columnsNames={columnsNames}
                    table={table}
                />
                {actionButtons &&
                    cloneElement(actionButtons, {
                        selectedRows: table.getSelectedRowModel().rows,
                    })}
                <DataTableViewOptions
                    table={table}
                    columnsNames={columnsNames}
                />
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
