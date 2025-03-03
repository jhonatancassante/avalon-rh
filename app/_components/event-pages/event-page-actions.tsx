"use client";

import {
    ArrowLeft,
    Delete,
    Edit,
    Pencil,
    PencilOff,
    Repeat,
    Trash2,
} from "lucide-react";
import { ActionButton } from "../ui/action-button";
import { TooltipProvider } from "../ui/tooltip";
import { Event } from "@prisma/client";
import { useState } from "react";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useRouter } from "next/navigation";
import {
    updateEventAreInscriptionsOpen,
    updateEventIsFinished,
} from "@/app/_actions/updateEvent";
import { PATHS } from "@/app/_constants/paths";
import DeleteDialog from "../delete-dialog";
import { deleteEvent } from "@/app/_actions/deleteEvent";

interface EventPageActionsProps {
    event: Event;
}

const EventPageActions = ({ event }: EventPageActionsProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleToggleInscriptions = async (isOpen: boolean) => {
        setIsLoading(true);
        await updateEventAreInscriptionsOpen(event.id, isOpen);
        router.refresh();
        setIsLoading(false);
    };

    const handleEditButtonClick = () => {
        setIsLoading(true);
        router.push(`${PATHS.EVENT_EDIT}/${event.id}`);
    };

    const handleToggleIsFinish = async (isOpen: boolean) => {
        setIsLoading(true);
        await updateEventIsFinished(event.id, isOpen);
        router.refresh();
        setIsLoading(false);
    };

    const handleDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteEvent(event.id);
        router.back();
        setIsLoading(false);
    };

    return (
        <div className="flex gap-2">
            <TooltipProvider>
                <ActionButton
                    icon={<ArrowLeft />}
                    tooltipText="Voltar"
                    onClick={handleBack}
                    ghost
                />
                {event.areInscriptionsOpen ? (
                    <ActionButton
                        icon={<PencilOff />}
                        tooltipText="Fechar Inscrições"
                        onClick={() => handleToggleInscriptions(false)}
                        ghost
                    />
                ) : (
                    <ActionButton
                        icon={<Pencil />}
                        tooltipText="Abrir Inscrições"
                        onClick={() => handleToggleInscriptions(true)}
                        ghost
                    />
                )}
                <ActionButton
                    icon={<Edit />}
                    tooltipText="Editar Evento"
                    onClick={handleEditButtonClick}
                    ghost
                />
                {event.isFinished ? (
                    <ActionButton
                        icon={<Repeat />}
                        tooltipText="Reiniciar Evento"
                        onClick={() => handleToggleIsFinish(false)}
                        ghost
                    />
                ) : (
                    <ActionButton
                        icon={<Delete />}
                        tooltipText="Finalizar Evento"
                        onClick={() => handleToggleIsFinish(true)}
                        ghost
                    />
                )}
                <ActionButton
                    icon={<Trash2 />}
                    tooltipText="Deletar Evento"
                    onClick={handleDialogOpen}
                    ghost
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

export default EventPageActions;
