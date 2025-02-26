"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";
import EventRowActionMenu from "./event-row-action-menu";

export const columnsNames = [
    { field: "name", label: "nome", filter: true },
    { field: "edition", label: "edição", filter: false },
    { field: "date", label: "data evento", filter: true },
    { field: "dateToOpen", label: "data abertura", filter: true },
    { field: "areInscriptionsOpen", label: "Abertas?", filter: false },
    { field: "dateToClose", label: "data encerramento", filter: true },
];

export const eventColumns: ColumnDef<Event>[] = [
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
        accessorKey: "edition",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Edição" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("edition")}</div>
        ),
    },
    {
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
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data Evento" />
        ),
        cell: ({ row }) => (
            <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                <div className="capitalize">
                    {format(row.getValue("date"), "dd/MM/yyyy", {
                        locale: ptBR,
                    })}
                </div>
            </Link>
        ),
        filterFn: (row, columnId, filterValue) => {
            const rowValue = row.getValue(columnId);

            if (
                typeof rowValue === "string" ||
                typeof rowValue === "number" ||
                rowValue instanceof Date
            ) {
                const formattedRowValue = format(rowValue, "dd/MM/yyyy");
                return formattedRowValue.includes(filterValue);
            }

            return false;
        },
    },
    {
        accessorKey: "dateToOpen",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data Abertura" />
        ),
        cell: ({ row }) => (
            <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                <div className="capitalize">
                    {format(row.getValue("dateToOpen"), "dd/MM/yyyy", {
                        locale: ptBR,
                    })}
                </div>
            </Link>
        ),
        filterFn: (row, columnId, filterValue) => {
            const rowValue = row.getValue(columnId);

            if (
                typeof rowValue === "string" ||
                typeof rowValue === "number" ||
                rowValue instanceof Date
            ) {
                const formattedRowValue = format(rowValue, "dd/MM/yyyy");
                return formattedRowValue.includes(filterValue);
            }

            return false;
        },
    },
    {
        accessorKey: "areInscriptionsOpen",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Abertas?" />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getValue("areInscriptionsOpen")} />
        ),
    },
    {
        accessorKey: "dateToClose",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data Fechamento" />
        ),
        cell: ({ row }) => (
            <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                <div className="capitalize">
                    {format(row.getValue("dateToClose"), "dd/MM/yyyy", {
                        locale: ptBR,
                    })}
                </div>
            </Link>
        ),
        filterFn: (row, columnId, filterValue) => {
            const rowValue = row.getValue(columnId);

            if (
                typeof rowValue === "string" ||
                typeof rowValue === "number" ||
                rowValue instanceof Date
            ) {
                const formattedRowValue = format(rowValue, "dd/MM/yyyy");
                return formattedRowValue.includes(filterValue);
            }

            return false;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const event = row.original;

            return <EventRowActionMenu event={event} />;
        },
    },
];
