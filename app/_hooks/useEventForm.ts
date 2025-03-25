import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventFormSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EventComplete } from "../_components/event-form/types";

interface UseEventFormProps {
    event?: EventComplete;
    defaultValues?: Partial<z.infer<typeof eventFormSchema>>;
}

export const useEventForm = ({ event, defaultValues }: UseEventFormProps) => {
    const baseDefaultValues = {
        name: event?.name ?? "",
        edition: event?.edition ?? 0,
        date: format(event?.date ?? new Date(), "yyyy-MM-dd", {
            locale: ptBR,
        }),
        city: event?.city ?? "",
        state: event?.state ?? "",
        dateToOpen: format(event?.dateToOpen ?? new Date(), "yyyy-MM-dd", {
            locale: ptBR,
        }),
        dateToClose: format(event?.dateToClose ?? new Date(), "yyyy-MM-dd", {
            locale: ptBR,
        }),
        eventSectors: [],
    };

    return useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        mode: "onChange",
        defaultValues: {
            ...baseDefaultValues,
            ...defaultValues,
        },
    });
};
