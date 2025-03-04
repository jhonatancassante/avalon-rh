"use client";

import { updateOrCreateEvent } from "@/app/_actions/updateEvent";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useEventForm } from "@/app/_hooks/useEventForm";
import { eventFormSchema } from "@/app/_schemas/formSchema";
import CreateOrUpdateEvent from "@/app/_types/createOrUpdateEvent";
import dateToIso from "@/app/_utils/dateToIso";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "../ui/form";
import { FormFields } from "../form-fields/form-fields";
import { editEventFields } from "@/app/_constants/editEventFields";
import LocationsFields from "../form-fields/locations-fields";
import { FormActions } from "../form-fields/form-actions";

interface EventFormEditProps {
    event?: Event;
}

const EventFormEdit = ({ event }: EventFormEditProps) => {
    const router = useRouter();
    const { setIsLoading } = useLoading();
    const form = useEventForm({ event });

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
                    editFields={editEventFields}
                />
                <LocationsFields<typeof eventFormSchema> form={form} />

                <FormActions onExit={handleExit} />
            </form>
        </Form>
    );
};

export default EventFormEdit;
