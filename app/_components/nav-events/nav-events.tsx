"use client";

import { useMemo } from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/app/_components/ui/sidebar";
import { EventItem } from "./event-item";
import { useEvents } from "@/app/_contexts/EventContext";

export const NavEvents = () => {
    const { eventListNotFinished, isLoading, eventError, refreshEvents } =
        useEvents();

    const renderedEvents = useMemo(() => {
        if (!eventListNotFinished) return null;

        if (eventListNotFinished.length >= 3) {
            return eventListNotFinished
                .slice(0, 3)
                .map((event) => (
                    <EventItem
                        key={event.id}
                        event={event}
                        onEventUpdated={refreshEvents}
                    />
                ));
        }

        return eventListNotFinished.map((event) => (
            <EventItem
                key={event.id}
                event={event}
                onEventUpdated={refreshEvents}
            />
        ));
    }, [eventListNotFinished, refreshEvents]);

    const renderContent = () => {
        if (isLoading) {
            return <p className="p-2 text-sm">Carregando eventos...</p>;
        }

        if (eventError) {
            return <p className="p-2 text-sm text-red-500">{eventError}</p>;
        }

        if (eventListNotFinished.length === 0) {
            return <p className="p-2 text-sm">Nenhum evento cadastrado!</p>;
        }

        return renderedEvents;
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Eventos</SidebarGroupLabel>
            <SidebarMenu>{renderContent()}</SidebarMenu>
        </SidebarGroup>
    );
};
