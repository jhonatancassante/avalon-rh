"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/column-header";
import SectorRowActions from "./sector-row-actions";
import { SectorComplete } from "@/app/_types/sectorComplete";

export const columnsNames = [
    { field: "name", label: "nome", filter: true },
    { field: "leader", label: "líder", filter: true },
];

export const sectorColumns: ColumnDef<SectorComplete>[] = [
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
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        id: "leader",
        accessorFn: (row) => row?.leader?.profile?.socialName ?? "Não definido",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Líder" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("leader")}</div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const sector = row.original;

            return <SectorRowActions sector={sector} />;
        },
    },
];
