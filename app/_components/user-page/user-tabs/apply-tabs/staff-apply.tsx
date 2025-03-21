"use client";

import { EventWithSectors } from "@/app/_components/event-form/types";
import { Form } from "@/app/_components/ui/form";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { getEventAreInscriptionsOpen } from "@/app/_data/getEvent";
import { useStaffApplyForm } from "@/app/_hooks/useStaffApplyForm";
import { Sector } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import EventFieldSelect from "./event-field-select";
import { SelectedSectors, UserStaffApply } from "./types";
import SectorFieldSelect from "./sector-field-select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { useSession } from "next-auth/react";
import { getStaffApplyList } from "@/app/_data/getStaffApply";
import { updateOrCreateUserEventApply } from "@/app/_actions/updateUserEventApply";

const StaffApply = () => {
    const { setIsLoading } = useLoading();
    const [eventList, setEventList] = useState<EventWithSectors[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventWithSectors | null>(
        null,
    );

    const [sectorList, setSectorList] = useState<Sector[] | null>(null);
    const [selectedSectors, setSelectedSectors] = useState<SelectedSectors>({
        0: null,
        1: null,
        2: null,
        3: null,
    });
    const [staffApplyList, setStaffApplyList] = useState<
        UserStaffApply[] | null
    >(null);
    const [staffApply, setStaffApply] = useState<UserStaffApply | null>(null);
    const { data } = useSession();
    const form = useStaffApplyForm({});
    const sectorLabels = ["Primeira", "Segunda", "Terceira", "Quarta"];

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            const events = await getEventAreInscriptionsOpen();
            setEventList(events);
            const staffApplys = await getStaffApplyList(data?.user?.id ?? "");
            setStaffApplyList(staffApplys ?? []);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [data, setIsLoading]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    useEffect(() => {
        if (staffApplyList) {
            setStaffApply(
                staffApplyList.find(
                    (apply) => apply.eventId === selectedEvent?.id,
                ) ?? null,
            );
        }
    }, [selectedEvent, staffApplyList]);

    const onSubmit = async (
        values: Record<`sector${number}` | "eventId", string>,
    ) => {
        if (!data?.user?.id) {
            console.error("Usuário não autenticado");
            return;
        }

        const userSectorsApply = Array.from({ length: 4 }).map((_, index) => ({
            sectorId: values[`sector${index}`],
            optionOrder: index,
        }));

        const updateData = {
            userId: data.user.id,
            eventId: values.eventId,
            userEventSectors: userSectorsApply,
        };

        try {
            const result = await updateOrCreateUserEventApply(
                staffApply?.id,
                updateData,
            );
            console.log("Sucesso:", result);
        } catch (error) {
            console.error("Falha:", error);
        }
    };

    return (
        <div className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {eventList.length !== 0 ? (
                        <EventFieldSelect
                            form={form}
                            eventList={eventList}
                            applyList={staffApplyList}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            setSectorList={setSectorList}
                        />
                    ) : (
                        <h2>
                            Ainda não tem nenhum evento para se candidatar...
                            Volte mais tarde.
                        </h2>
                    )}
                    {sectorList && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Setores</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {sectorLabels.map((label, index) => (
                                    <SectorFieldSelect
                                        key={sectorList[index].id}
                                        form={form}
                                        sectorList={sectorList}
                                        apply={staffApply}
                                        fieldIndex={index}
                                        sectorLabel={label}
                                        selectedSectors={selectedSectors}
                                        setSelectedSectors={setSelectedSectors}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    )}
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    );
};

export default StaffApply;
