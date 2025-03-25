"use client";

import { updateOrCreateEvent } from "@/app/_actions/updateEvent";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useEventForm } from "@/app/_hooks/useEventForm";
import { eventFormSchema } from "@/app/_schemas/formSchema";
import CreateOrUpdateEvent from "@/app/_types/createOrUpdateEvent";
import dateToIso from "@/app/_utils/dateToIso";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormFields } from "../form-fields/form-fields";
import { EDITEVENTFIELDS } from "@/app/_constants/editEventFields";
import LocationsFields from "../form-fields/locations-fields";
import { FormActions } from "../form-fields/form-actions";
import EventSectorSelection from "./event-sector-selection";
import { useCallback, useEffect, useState } from "react";
import { getEventSectorsLastUpdated } from "@/app/_data/getEventSector";
import { EventComplete, EventSectorComplete } from "./types";
import { createFormStorage } from "@/app/_utils/formStorage";
import { STORAGE_KEYS } from "@/app/_constants/localStorageKeys";

interface EventFormEditProps {
    event?: EventComplete;
}

const EventFormEdit = ({ event }: EventFormEditProps) => {
    const router = useRouter();
    const { setIsLoading } = useLoading();
    const [lastSectorsList, setLastSectorsList] = useState<
        EventSectorComplete[]
    >([]);
    const [isReady, setIsReady] = useState(false);

    const fetchLastSectorsConfig = useCallback(async () => {
        try {
            setIsLoading(true);
            const lastEventSectors = await getEventSectorsLastUpdated();
            setLastSectorsList(lastEventSectors);
        } catch (error) {
            console.error("Erro ao buscar ultimos registros:", error);
        } finally {
            setIsReady(true);
            setIsLoading(false);
        }
    }, [setIsLoading]);

    useEffect(() => {
        fetchLastSectorsConfig();
    }, [fetchLastSectorsConfig]);

    const formStorage = createFormStorage<typeof eventFormSchema>(
        STORAGE_KEYS.EVENT_FORM(event?.id ?? "new_event"),
    );

    const form = useEventForm({
        event,
        defaultValues: formStorage.load() || undefined,
    });

    useEffect(() => {
        const subscription = form.watch((value) => {
            formStorage.save(value as z.infer<typeof eventFormSchema>);
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch]);

    useEffect(() => {
        if (isReady && !formStorage.load()) {
            const defaultEventSectors = event?.eventSectors ?? lastSectorsList;
            form.reset({
                ...form.getValues(),
                eventSectors: defaultEventSectors.map(
                    (sector) => sector.sectorId,
                ),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, lastSectorsList, form, event]);

    const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
        setIsLoading(true);
        try {
            const dateIso = dateToIso(values.date);
            const dateToOpenIso = dateToIso(values.dateToOpen);
            const dateToCloseIso = dateToIso(values.dateToClose);

            const updateData: CreateOrUpdateEvent = {
                ...values,
                date: dateIso,
                dateToOpen: dateToOpenIso,
                dateToClose: dateToCloseIso,
            };

            await updateOrCreateEvent(event?.id ?? "", updateData);

            toast.success("Sucesso!", {
                description: `Evento ${event ? "atualizado" : "criado"} com sucesso!`,
            });

            formStorage.clear();
            router.back();
        } catch (error) {
            console.error(
                `Erro ao ${event ? "atualizar" : "criar"} evento: ${error}`,
            );
            toast.error("Erro!", {
                description: `Erro ao ${event ? "atualizar" : "criar"} evento.`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleExit = () => {
        try {
            setIsLoading(true);
            formStorage.clear();
            router.back();
        } catch (error) {
            console.error("Erro ao sair da página de edição de evento:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormFields
                    control={form.control}
                    formSchema={eventFormSchema}
                    editFields={EDITEVENTFIELDS}
                />
                <LocationsFields<typeof eventFormSchema> form={form} />
                <EventSectorSelection control={form.control} />

                <FormActions onExit={handleExit} />
            </form>
        </Form>
    );
};

export default EventFormEdit;
