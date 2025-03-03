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
import {
    getEventListFinished,
    getEventListNotFinished,
} from "../_data/getEvent";

interface EventContextType {
    eventListNotFinished: Event[];
    eventListFinished: Event[];
    isLoading: boolean;
    eventError: string | null;
    setEventListNotFinished: (events: Event[]) => void;
    setEventListFinished: (events: Event[]) => void;
    refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({
    children,
}: {
    readonly children: React.ReactNode;
}) => {
    const [eventListNotFinished, setEventListNotFinished] = useState<Event[]>(
        [],
    );
    const [eventListFinished, setEventListFinished] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [eventError, setEventError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            const [eventsNotFinished, eventsFinished] = await Promise.all([
                getEventListNotFinished(),
                getEventListFinished(),
            ]);
            setEventListNotFinished(eventsNotFinished);
            setEventListFinished(eventsFinished);
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
            eventListNotFinished,
            eventListFinished,
            isLoading,
            eventError,
            setEventListNotFinished,
            setEventListFinished,
            refreshEvents,
        }),
        [
            eventListNotFinished,
            eventListFinished,
            isLoading,
            eventError,
            refreshEvents,
        ],
    );

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvents deve ser usado dentro de um EventProvider");
    }
    return context;
};
