import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import formatCPF from "@/app/_utils/formatCPF";
import { Prisma } from "@prisma/client";

interface FormatUserFieldsProps {
    user: Prisma.UserGetPayload<{
        include: { photo: true; profile: true };
    }>;
}

export const formatUserFields = ({ user }: FormatUserFieldsProps) => {
    return [
        {
            label: "CPF",
            value: user.profile?.cpf ? formatCPF(user.profile?.cpf) : "",
        },
        {
            label: "Pronome",
            value: user.profile?.pronoun ?? "",
        },
        {
            label: "Nome Completo",
            value: user.profile?.completeName ?? "",
        },
        {
            label: "Nome Social",
            value: user.profile?.socialName ?? "",
        },
        {
            label: "Apelido",
            value: user.profile?.nickname ?? "",
        },
        {
            label: "Chave Pix",
            value: user.profile?.pixKey ?? "",
        },
        {
            label: "Data de Nascimento",
            value: format(user.profile?.birthdate ?? new Date(), "dd/MM/yyyy", {
                locale: ptBR,
            }),
        },
        {
            label: "Email do Google Account",
            value: user.email ?? "",
        },
        {
            label: "Email de Contato",
            value: user.profile?.contactEmail ?? "",
        },
        {
            label: "Celular / Whatsapp",
            value: user.profile?.phone ?? "",
        },
        {
            label: "Cidade",
            value: user.profile?.city ?? "",
        },
        {
            label: "Estado",
            value: user.profile?.state ?? "",
        },
        {
            label: "É Portador de Deficiencia?",
            value: user.profile?.isPcd ? "Sim" : "Não",
        },
        {
            label: "Qual sua deficiência?",
            value: user.profile?.deficiency ?? [],
        },
        {
            label: "Precisa de algum auxílio específico?",
            value: user.profile?.extraSupport ?? [],
        },
    ];
};
