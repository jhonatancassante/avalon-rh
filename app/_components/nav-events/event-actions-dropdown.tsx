"use client";

import {
    Delete,
    Edit,
    MoreHorizontal,
    Pencil,
    PencilOff,
    Search,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Event } from "@prisma/client";
import { SidebarMenuAction, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";
import {
    updateEventAreInscriptionsOpen,
    updateEventIsFinished,
} from "@/app/_actions/updateEvent";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/_contexts/LoadingContext";

interface EventActionsDropdownProps {
    readonly event: Event;
    onEventUpdated: () => void;
    setIsAlertOpen: Dispatch<SetStateAction<boolean>>;
}

export const EventActionsDropdown = ({
    event,
    onEventUpdated,
    setIsAlertOpen,
}: Readonly<EventActionsDropdownProps>) => {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const { setIsLoading } = useLoading();

    const handleCloseInscriptionsOpen = async () => {
        setIsLoading(true);
        await updateEventAreInscriptionsOpen(event.id, true);
        router.refresh();
        onEventUpdated();
        setIsLoading(false);
    };

    const handleCloseInscriptionsClose = async () => {
        setIsLoading(true);
        await updateEventAreInscriptionsOpen(event.id, false);
        router.refresh();
        onEventUpdated();
        setIsLoading(false);
    };

    const handleFinishEvent = async () => {
        setIsLoading(true);
        await updateEventIsFinished(event.id, true);
        router.refresh();
        onEventUpdated();
        setIsLoading(false);
    };

    const handleOpenAlert = () => {
        setIsAlertOpen(true);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">Mais</span>
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
            >
                <DropdownMenuItem asChild>
                    <Link href={`${PATHS.EVENTS}/${event.id}`}>
                        <Search className="text-muted-foreground" />
                        <span>Visualizar</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`${PATHS.EVENT_EDIT}/${event.id}`}>
                        <Edit className="text-muted-foreground" />
                        <span>Editar</span>
                    </Link>
                </DropdownMenuItem>
                {event.areInscriptionsOpen ? (
                    <DropdownMenuItem onClick={handleCloseInscriptionsClose}>
                        <PencilOff className="text-muted-foreground" />
                        <span>Fechar Inscrições</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={handleCloseInscriptionsOpen}>
                        <Pencil className="text-muted-foreground" />
                        <span>Abrir Inscrições</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleFinishEvent}>
                    <Delete className="text-muted-foreground" />
                    <span>Finalizar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleOpenAlert}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Deletar Evento</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
