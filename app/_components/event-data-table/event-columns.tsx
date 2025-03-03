"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
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

export interface Meta {
    hideOnMobile: boolean;
}

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
        meta: {
            hideOnMobile: true,
        },
    },
    {
        id: "edition",
        accessorKey: "edition",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Edição" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("edition")}</div>
        ),
        meta: {
            hideOnMobile: true,
        },
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
        id: "date",
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
        meta: {
            hideOnMobile: true,
        },
    },
    {
        id: "dateToOpen",
        accessorKey: "dateToOpen",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data Abertura" />
        ),
        cell: ({ row }) => {
            const rawDate = row.getValue("dateToOpen");

            if (!(rawDate instanceof Date)) {
                throw new Error("dateToOpen não é uma instância de Date");
            }

            const utcDate = toZonedTime(rawDate, "UTC");

            return (
                <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                    <div className="capitalize">
                        {format(utcDate, "dd/MM/yyyy", {
                            locale: ptBR,
                        })}
                    </div>
                </Link>
            );
        },
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
        meta: {
            hideOnMobile: true,
        },
    },
    {
        id: "areInscriptionsOpen",
        accessorKey: "areInscriptionsOpen",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Abertas?" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <Checkbox checked={row.getValue("areInscriptionsOpen")} />
                <label className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {row.getValue("areInscriptionsOpen") ? "Sim" : "Não"}
                </label>
            </div>
        ),
    },
    {
        id: "dateToClose",
        accessorKey: "dateToClose",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data Fechamento" />
        ),
        cell: ({ row }) => {
            const rawDate = row.getValue("dateToClose");

            if (!(rawDate instanceof Date)) {
                throw new Error("dateToClose não é uma instância de Date");
            }

            const utcDate = toZonedTime(rawDate, "UTC");
            return (
                <Link href={`${PATHS.EVENTS}/${row.original.id}`}>
                    <div className="capitalize">
                        {format(utcDate, "dd/MM/yyyy", {
                            locale: ptBR,
                        })}
                    </div>
                </Link>
            );
        },
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
        meta: {
            hideOnMobile: false,
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
