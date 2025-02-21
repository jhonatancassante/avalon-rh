"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import { Event } from "@prisma/client";
import { getEventList } from "../_data/getEvent";

interface EventContextType {
    eventList: Event[];
    isLoading: boolean;
    eventError: string | null;
    setEventList: (events: Event[]) => void;
    refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const [eventList, setEventList] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [eventError, setEventError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            const events = await getEventList();
            setEventList(events);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setEventError("Erro ao carregar eventos.");
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

    const contextValue = useMemo(
        () => ({
            eventList,
            isLoading,
            eventError,
            setEventList,
            refreshEvents,
        }),
        [eventList, isLoading, eventError, refreshEvents], // Dependências
    );

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvents deve ser usado dentro de um EventProvider");
    }
    return context;
}
