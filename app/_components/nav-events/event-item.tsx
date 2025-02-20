"use client";

import Link from "next/link";
import { Event } from "@prisma/client";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { PATHS } from "@/app/_constants/paths";
import { EventActionsDropdown } from "./event-actions-dropdown";

interface EventItemProps {
    readonly event: Event;
    onEventUpdated: () => void;
}

export function EventItem({ event, onEventUpdated }: Readonly<EventItemProps>) {
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
            />
        </SidebarMenuItem>
    );
}
