"use client";

import Link from "next/link";
import { Event } from "@prisma/client";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { PATHS } from "@/app/_constants/paths";
import { EventActionsDropdown } from "./event-actions-dropdown";
import { useState } from "react";
import { deleteEvent } from "@/app/_actions/deleteEvent";
import DeleteDialog from "../delete-dialog";

interface EventItemProps {
    readonly event: Event;
    onEventUpdated: () => void;
}

export const EventItem = ({
    event,
    onEventUpdated,
}: Readonly<EventItemProps>) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleDeleteEvent = async () => {
        await deleteEvent(event.id);
        onEventUpdated();
    };

    return (
        <SidebarMenuItem className="m-1 flex items-center">
            <SidebarMenuButton asChild>
                <Link href={`${PATHS.EVENTS}/${event.id}`} className="text-sm">
                    <p>{`${event.edition}º ${event.name}`}</p>
                </Link>
            </SidebarMenuButton>
            <EventActionsDropdown
                event={event}
                onEventUpdated={onEventUpdated}
                setIsAlertOpen={setIsAlertOpen}
            />
            <DeleteDialog
                itemType="evento"
                idEvent={event.id}
                isOpen={isAlertOpen}
                setIsOpen={setIsAlertOpen}
                onDelete={handleDeleteEvent}
            />
        </SidebarMenuItem>
    );
};
