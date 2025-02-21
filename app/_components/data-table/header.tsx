import { flexRender, Table } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";

interface DataTableHeaderProps<TData> {
    table: Table<TData>;
}

export const DataTableHeader = <TData,>({
    table,
}: Readonly<DataTableHeaderProps<TData>>) => {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                  )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    );
};
