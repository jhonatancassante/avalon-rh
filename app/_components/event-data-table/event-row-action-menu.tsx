"use client";

import {
    Copy,
    Delete,
    Edit,
    MoreHorizontal,
    Pencil,
    PencilOff,
    Repeat,
    Trash2,
    View,
} from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { PATHS } from "@/app/_constants/paths";
import {
    updateEventAreInscriptionsOpen,
    updateEventIsFinished,
} from "@/app/_actions/updateEvent";
import { useEvents } from "@/app/_contexts/EventContext";
import { useState } from "react";
import DeleteDialog from "../delete-dialog";
import { deleteEvent } from "@/app/_actions/deleteEvent";

interface EventRowActionMenuProps {
    event: Event;
}

const EventRowActionMenu = ({ event }: EventRowActionMenuProps) => {
    const router = useRouter();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const { refreshEvents } = useEvents();

    const handleOpenEvent = () => {
        setIsLoading(true);
        router.push(`${PATHS.EVENTS}/${event.id}`);
        setIsLoading(false);
    };

    const handleEditEvent = () => {
        setIsLoading(true);
        router.push(`${PATHS.EVENT_EDIT}/${event.id}`);
        setIsLoading(false);
    };

    const handleToggleInscriptions = async () => {
        setIsLoading(true);
        const newValue = !event.areInscriptionsOpen;
        await updateEventAreInscriptionsOpen(event.id, newValue);
        await refreshEvents();
        setIsLoading(false);
    };

    const handleToggleFinished = async () => {
        setIsLoading(true);
        const newValue = !event.isFinished;
        await updateEventIsFinished(event.id, newValue);
        await refreshEvents();
        setIsLoading(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteEvent(event.id);
        await refreshEvents();
        setIsLoading(false);
    };

    return (
        <>
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
                        onClick={() => navigator.clipboard.writeText(event.id)}
                        className="cursor-pointer"
                    >
                        <Copy />
                        Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleOpenEvent}
                        className="cursor-pointer"
                    >
                        <View /> Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleEditEvent}
                        className="cursor-pointer"
                    >
                        <Edit /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleToggleInscriptions}
                        className="cursor-pointer"
                    >
                        {event.areInscriptionsOpen ? (
                            <>
                                <PencilOff /> Fechar Inscrições
                            </>
                        ) : (
                            <>
                                <Pencil /> Abrir Inscrições
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleToggleFinished}
                        className="cursor-pointer"
                    >
                        {event.isFinished ? (
                            <>
                                <Repeat /> Reiniciar
                            </>
                        ) : (
                            <>
                                <Delete /> Finalizar
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setDeleteDialogOpen(true)}
                        className="cursor-pointer"
                    >
                        <Trash2 /> Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteDialog
                itemType="evento"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </>
    );
};

export default EventRowActionMenu;
