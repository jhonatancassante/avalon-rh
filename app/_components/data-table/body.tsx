import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/app/_components/ui/table";

interface DataTableBodyProps<TData, TValue> {
    table: Table<TData>;
    columns: ColumnDef<TData, TValue>[];
    isLoading: boolean;
}

export const DataTableBody = <TData, TValue>({
    table,
    columns,
    isLoading,
}: Readonly<DataTableBodyProps<TData, TValue>>) => {
    const renderTable = () => {
        if (table.getRowModel().rows?.length) {
            return table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
            ));
        }

        return (
            <TableRow>
                <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                >
                    {isLoading ? "Carregando..." : "No results."}
                </TableCell>
            </TableRow>
        );
    };

    return <TableBody>{renderTable()}</TableBody>;
};
