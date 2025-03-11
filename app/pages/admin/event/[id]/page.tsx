"use client";

import EventPageActions from "@/app/_components/event-page/event-page-actions";
import EventPageFields from "@/app/_components/event-page/event-page-fields";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { PATHS } from "@/app/_constants/paths";
import { getEventById } from "@/app/_data/getEvent";
import { formatEventFields } from "@/app/_utils/formatEventFields";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { EventComplete } from "@/app/_components/event-form/types";
import EventPageSectors from "@/app/_components/event-page/event-page-sectors";

const EventPage = () => {
    const [event, setEvent] = useState<EventComplete | null>(null);
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const fetchEvent = useCallback(async () => {
        try {
            setIsLoading(true);

            if (!id) {
                router.push(PATHS.ERROR_404);
                return;
            }

            const eventItem = await getEventById(id);

            if (!eventItem) {
                router.push(PATHS.ERROR_404);
                return;
            }

            setEvent(eventItem);
        } catch (error) {
            console.error(error);
            router.push(PATHS.ERROR_500);
        } finally {
            setIsLoading(false);
        }
    }, [id, router, setIsLoading]);

    useEffect(() => {
        if (id) {
            fetchEvent();
        }
    }, [fetchEvent, id]);

    if (!event) {
        setIsLoading(true);
        return null;
    }

    const breadcrumbList = [
        {
            label: "Administração",
            url: PATHS.ADMIN,
        },
        {
            label: "Eventos",
            url: PATHS.EVENTS,
        },
        {
            label: `${event.edition}º ${event.name}`,
            url: PATHS.EVENTS,
        },
    ] as const;

    const eventFields = formatEventFields(event);

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <div className="flex w-full justify-center">
                <Card className="mx-4 mb-8 mt-4 grid w-full lg:max-w-2xl">
                    <CardHeader className="pb-0">
                        <CardTitle className="flex w-full justify-center text-2xl font-bold">
                            {`${event.edition}º ${event.name}`}
                        </CardTitle>
                        <div className="flex w-full justify-end">
                            <EventPageActions
                                event={event}
                                setEvent={setEvent}
                            />
                        </div>
                    </CardHeader>
                    <div className="flex w-full items-center justify-center px-4 py-2">
                        <Separator />
                    </div>
                    <CardContent>
                        <EventPageFields eventFields={eventFields} />
                        <EventPageSectors event={event} />
                    </CardContent>
                </Card>
            </div>
        </PageLayoutSidebar>
    );
};

export default EventPage;
