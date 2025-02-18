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
    return {
        cpf: user.profile?.cpf ? formatCPF(user.profile?.cpf) : "",
        pronoun: user.profile?.pronoun ?? "",
        completeName: user.profile?.completeName ?? "",
        socialName: user.profile?.socialName ?? "",
        nickname: user.profile?.nickname ?? "",
        pixKey: user.profile?.pixKey ?? "",
        birthdate: format(user.profile?.birthdate ?? new Date(), "dd/MM/yyyy", {
            locale: ptBR,
        }),
        email: user.email ?? "",
        contactEmail: user.profile?.contactEmail ?? "",
        phone: user.profile?.phone ?? "",
        state: user.profile?.state ?? "",
        city: user.profile?.city ?? "",
        isPcd: user.profile?.isPcd ? "Sim" : "Não",
        deficiency: user.profile?.deficiency ?? [],
        extraSupport: user.profile?.extraSupport ?? [],
    };
};
