"use client";

import { Level } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/column-header";
import LevelRowActions from "./level-row-actions";

export const columnsNames = [
    { field: "name", label: "nome", filter: true },
    { field: "isLcaApply", label: "aplicar ACL?", filter: false },
];

export const levelColumns: ColumnDef<Level>[] = [
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
        id: "isLcaApply",
        accessorKey: "isLcaApply",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Aplicar ACL?" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <Checkbox checked={row.getValue("isLcaApply")} />
                <label className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {row.getValue("isLcaApply") ? "Sim" : "Não"}
                </label>
            </div>
        ),
    },
    {
        id: "points",
        accessorKey: "points",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pontos" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("points")}</div>
        ),
    },
    {
        id: "pointsLca",
        accessorKey: "pointsLca",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pontos ACL" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("pointsLca")}</div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const level = row.original;

            return <LevelRowActions level={level} />;
        },
    },
];
