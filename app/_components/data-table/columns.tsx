"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    Copy,
    Delete,
    Edit,
    MoreHorizontal,
    Pencil,
    Trash2,
    View,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const columns: ColumnDef<Event>[] = [
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
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">
                {format(row.getValue("date"), "dd/MM/yyyy", { locale: ptBR })}
            </div>
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
            <DataTableColumnHeader
                column={column}
                title="Inscrições Abertas?"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getValue("areInscriptionsOpen")} />
        ),
    },
    {
        accessorKey: "dateToClose",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Data de Encerramento"
            />
        ),
        cell: ({ row }) => (
            <div className="capitalize">
                {format(row.getValue("dateToClose"), "dd/MM/yyyy", {
                    locale: ptBR,
                })}
            </div>
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
        accessorKey: "isFinished",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Finalizado?" />
        ),
        cell: ({ row }) => <Checkbox checked={row.getValue("isFinished")} />,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const event = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(event.id)
                            }
                        >
                            <Copy />
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <View /> Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Pencil /> Abrir Inscrições
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Delete /> Finalizar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Trash2 /> Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
