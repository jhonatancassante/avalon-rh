"use client";

import { Table } from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { PaginationButton } from "../ui/pagination-button";
import { RowsPerPageSelect } from "../ui/rows-per-page-select";
import { useIsMobile } from "@/app/_hooks/useMobile";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    smallTable: boolean;
}

export const DataTablePagination = <TData,>({
    table,
    smallTable,
}: Readonly<DataTablePaginationProps<TData>>) => {
    const isMobile = useIsMobile();

    return (
        <div
            className={`flex ${!smallTable && "w-full"} items-center justify-between px-2`}
        >
            {!isMobile && !smallTable && (
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} selecionados.
                </div>
            )}
            <div
                className={`flex ${isMobile && "w-full justify-between"} items-center space-x-6 lg:space-x-8`}
            >
                <div className="flex items-center space-x-2">
                    <RowsPerPageSelect
                        value={`${table.getState().pagination.pageSize}`}
                        onChange={(value) => table.setPageSize(Number(value))}
                        options={[10, 20, 30, 40, 50]}
                    />
                </div>
                <div className="flex items-center space-x-1">
                    <PaginationButton
                        icon={<ChevronsLeft />}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        ariaLabel="Go to first page"
                        className="hidden lg:flex"
                    />
                    <PaginationButton
                        icon={<ChevronLeft />}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        ariaLabel="Go to previous page"
                    />
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium first-letter:capitalize">
                        {`${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`}
                    </div>
                    <PaginationButton
                        icon={<ChevronRight />}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        ariaLabel="Go to next page"
                    />
                    <PaginationButton
                        icon={<ChevronsRight />}
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                        ariaLabel="Go to last page"
                        className="hidden lg:flex"
                    />
                </div>
            </div>
        </div>
    );
};
