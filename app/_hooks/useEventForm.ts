import { Event } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventFormSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UseEventFormProps {
    event?: Event;
}

export const useEventForm = ({ event }: UseEventFormProps) => {
    return useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        mode: "onChange",
        defaultValues: {
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
            dateToClose: format(
                event?.dateToClose ?? new Date(),
                "yyyy-MM-dd",
                {
                    locale: ptBR,
                },
            ),
        },
    });
};
