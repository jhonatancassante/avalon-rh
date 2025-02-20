"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Event } from "@prisma/client";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/app/_components/ui/sidebar";
import { getEventList } from "@/app/_data/getEvent";
import { EventItem } from "./event-item";

export function NavEvents() {
    const [eventList, setEventList] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            const events = await getEventList();
            setEventList(events);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setError("Erro ao carregar eventos.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshEvents = useCallback(async () => {
        await fetchEvents();
    }, [fetchEvents]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const renderedEvents = useMemo(() => {
        return eventList.map((event) => (
            <EventItem
                key={event.id}
                event={event}
                onEventUpdated={refreshEvents}
            />
        ));
    }, [eventList, refreshEvents]);

    const renderContent = () => {
        if (isLoading) {
            return <p className="p-2 text-sm">Carregando eventos...</p>;
        }

        if (error) {
            return <p className="p-2 text-sm text-red-500">{error}</p>;
        }

        if (eventList.length === 0) {
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
}
