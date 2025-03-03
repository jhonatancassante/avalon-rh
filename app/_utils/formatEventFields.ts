import { Event } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatEventFields = (event: Event) => {
    return [
        {
            label: "Data do Evento",
            value: format(event.date ?? new Date(), "dd/MM/yyyy", {
                locale: ptBR,
            }),
        },
        { label: "Cidade", value: event.city ?? "" },
        { label: "Estado", value: event.state ?? "" },
        {
            label: "Data de Abertura das Inscrições",
            value: format(event.dateToOpen ?? new Date(), "dd/MM/yyyy", {
                locale: ptBR,
            }),
        },
        {
            label: "As Inscrições Estão Abertas?",
            value: event.areInscriptionsOpen ? "Sim" : "Não",
        },
        {
            label: "Data de Fechamento das Inscrições",
            value: format(event.dateToClose ?? new Date(), "dd/MM/yyyy", {
                locale: ptBR,
            }),
        },
        {
            label: "O Evento Foi Finalizado?",
            value: event.isFinished ? "Sim" : "Não",
        },
    ];
};
