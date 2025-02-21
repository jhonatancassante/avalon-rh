"use client";

import { Button } from "../ui/button";
import { Delete, Pencil, PencilOff, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Row } from "@tanstack/react-table";
import {
    updateEventAreInscriptionsOpen,
    updateEventIsFinished,
} from "@/app/_actions/updateEvent";
import { Event } from "@prisma/client";
import { deleteEvent } from "@/app/_actions/deleteEvent";
import { useState } from "react";
import DeleteDialog from "../delete-dialog";

interface DataTableActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    onActionCompleted: () => Promise<void>;
}

export function DataTableActionButtons<TData>({
    selectedRows,
    onActionCompleted,
}: Readonly<DataTableActionButtonsProps<TData>>) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleInscriptionsOpen = async () => {
        selectedRows.forEach(async (row) => {
            const event = row.original as Event;
            await updateEventAreInscriptionsOpen(event.id, true);
            row.toggleSelected();
        });
        await onActionCompleted();
    };

    const handleInscriptionsClose = async () => {
        selectedRows.forEach(async (row) => {
            const event = row.original as Event;
            await updateEventAreInscriptionsOpen(event.id, false);
            row.toggleSelected();
        });
        await onActionCompleted();
    };

    const handleToggleIsFinished = async () => {
        selectedRows.forEach(async (row) => {
            const event = row.original as Event;
            await updateEventIsFinished(event.id);
            row.toggleSelected();
        });
        await onActionCompleted();
    };

    const handleDeleteDialog = async () => {
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        selectedRows.forEach(async (row) => {
            const event = row.original as Event;
            await deleteEvent(event.id);
            row.toggleSelected();
        });
        await onActionCompleted();
    };

    return (
        <div className="ml-20 flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"} onClick={handleInscriptionsOpen}>
                            <Pencil />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abrir Inscrições</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"} onClick={handleInscriptionsClose}>
                            <PencilOff />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Fechar Inscrições</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"} onClick={handleToggleIsFinished}>
                            <Delete />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Finalizar</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"icon"} onClick={handleDeleteDialog}>
                            <Trash2 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Deletar</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DeleteDialog
                itemType="evento"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </div>
    );
}
