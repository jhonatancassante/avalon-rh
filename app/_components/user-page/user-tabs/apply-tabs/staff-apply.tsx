"use client";

import { EventWithSectors } from "@/app/_components/event-form/types";
import { Form } from "@/app/_components/ui/form";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { getEventAreInscriptionsOpen } from "@/app/_data/getEvent";
import { useStaffApplyForm } from "@/app/_hooks/useStaffApplyForm";
import { userEventApplyFormSchema } from "@/app/_schemas/formSchema";
import { UserEventApply } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import EventFieldSelect from "./event-field-select";

const StaffApply = () => {
    const { setIsLoading } = useLoading();
    const [eventList, setEventList] = useState<EventWithSectors[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventWithSectors | null>(
        null,
    );
    const [staffEventApply, setStaffEventApply] =
        useState<UserEventApply | null>(null);
    const form = useStaffApplyForm({ staffEventApply });

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            const events = await getEventAreInscriptionsOpen();
            setEventList(events);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading]);

    useEffect(() => {
        fetchEvents();
        setStaffEventApply(null); //Apagar depois
    }, [fetchEvents]);

    const onSubmit = async (
        values: z.infer<typeof userEventApplyFormSchema>,
    ) => {
        console.log("Enviado:", values);
    };

    return (
        <div className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <EventFieldSelect
                        form={form}
                        eventList={eventList}
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                    />
                    {selectedEvent &&
                        selectedEvent.eventSectors.map((eventSector) => {
                            return (
                                <p key={eventSector.id}>
                                    {eventSector.sector.name}
                                </p>
                            );
                        })}
                </form>
            </Form>
        </div>
    );
};

export default StaffApply;
