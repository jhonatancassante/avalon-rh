"use client";

import { Form } from "@/app/_components/ui/form";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useMemo } from "react";
import EventFieldSelect from "./event-field-select";
import SectorFieldSelect from "./sector-field-select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { useSession } from "next-auth/react";
import { useStaffApply } from "@/app/_hooks/useStaffApply";
import { UpdateStatus } from "../../../update-status";

const sectorLabels = ["Primeira", "Segunda", "Terceira", "Quarta"];

interface StaffApplyProps {
    eventId?: string;
}

const StaffApply = ({ eventId }: StaffApplyProps) => {
    const { isLoading } = useLoading();
    const { data: session } = useSession();
    const {
        form,
        eventList,
        selectedEvent,
        sectorList,
        selectedSectors,
        staffApplyList,
        staffApply,
        setState,
        onSubmit,
    } = useStaffApply(session?.user?.id, eventId);

    const shouldShowSectors = useMemo(
        () => sectorList && sectorList.length > 0,
        [sectorList],
    );

    const noEventsMessage = useMemo(
        () => (
            <h2 className="p-4 text-center text-muted-foreground">
                Ainda não há eventos disponíveis para candidatura. Por favor,
                volte mais tarde.
            </h2>
        ),
        [],
    );

    return (
        <div className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {eventList.length !== 0 ? (
                        <>
                            <EventFieldSelect
                                form={form}
                                eventList={eventList}
                                applyList={staffApplyList}
                                selectedEvent={selectedEvent}
                                setState={setState}
                            />
                            {shouldShowSectors && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Setores</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {sectorList &&
                                            sectorLabels.map((label, index) => (
                                                <SectorFieldSelect
                                                    key={sectorList[index].id}
                                                    form={form}
                                                    sectorList={sectorList}
                                                    fieldIndex={index}
                                                    sectorLabel={label}
                                                    selectedSectors={
                                                        selectedSectors
                                                    }
                                                    setState={setState}
                                                />
                                            ))}
                                    </CardContent>
                                </Card>
                            )}

                            <UpdateStatus
                                lastUpdate={staffApply?.updatedAt}
                                className="mt-4"
                            />

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!selectedEvent || isLoading}
                                >
                                    {isLoading
                                        ? "Enviando..."
                                        : "Enviar Candidatura"}
                                </Button>
                            </div>
                        </>
                    ) : (
                        noEventsMessage
                    )}
                </form>
            </Form>
        </div>
    );
};

export default StaffApply;
