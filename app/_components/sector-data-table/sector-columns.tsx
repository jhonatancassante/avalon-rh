"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Sector } from "@prisma/client";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";
import { Button } from "../ui/button";

export const columnsNames = [{ field: "name", label: "nome", filter: true }];

export const sectorColumns: ColumnDef<Sector>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nome" />
        ),
        cell: ({ row }) => (
            <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                <div className="capitalize">{row.getValue("name")}</div>
            </Link>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const sector = row.original;

            return <Button key={sector.id}>Teste</Button>;
        },
    },
];
