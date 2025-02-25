"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Pencil, PencilOff, Delete, Trash2 } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "../ui/action-button";
import {
    updateEventAreInscriptionsOpen,
    updateEventIsFinished,
} from "@/app/_actions/updateEvent";
import { deleteEvent } from "@/app/_actions/deleteEvent";
import { handleEventAction } from "@/app/_lib/event-actions";
import DeleteDialog from "../delete-dialog";
import { useLoading } from "@/app/_contexts/LoadingContext";

export interface DataTableEventActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    onActionCompleted: () => Promise<void>;
}

export const DataTableEventActionButtons = <TData,>({
    selectedRows,
    onActionCompleted,
}: Readonly<DataTableEventActionButtonsProps<TData>>) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();

    const handleDelete = async () => {
        await handleEventAction(
            selectedRows,
            deleteEvent,
            onActionCompleted,
            setIsLoading,
        );
    };

    return (
        <div className="ml-20 flex gap-2">
            <TooltipProvider>
                <ActionButton
                    icon={<Pencil />}
                    tooltipText="Abrir Inscrições"
                    onClick={() =>
                        handleEventAction(
                            selectedRows,
                            (id) => updateEventAreInscriptionsOpen(id, true),
                            onActionCompleted,
                            setIsLoading,
                        )
                    }
                />
                <ActionButton
                    icon={<PencilOff />}
                    tooltipText="Fechar Inscrições"
                    onClick={() =>
                        handleEventAction(
                            selectedRows,
                            (id) => updateEventAreInscriptionsOpen(id, false),
                            onActionCompleted,
                            setIsLoading,
                        )
                    }
                />
                <ActionButton
                    icon={<Delete />}
                    tooltipText="Finalizar"
                    onClick={() =>
                        handleEventAction(
                            selectedRows,
                            updateEventIsFinished,
                            onActionCompleted,
                            setIsLoading,
                        )
                    }
                />
                <ActionButton
                    icon={<Trash2 />}
                    tooltipText="Deletar"
                    onClick={() => setDeleteDialogOpen(true)}
                />
            </TooltipProvider>
            <DeleteDialog
                itemType="evento"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </div>
    );
};
