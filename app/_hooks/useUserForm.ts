import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formSchema } from "../_schemas/formSchema";
import { UserComplete } from "../_types/userComplete";

export const useUserForm = ({ user }: UserComplete) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: user.profile?.cpf ?? "",
            completeName: user.profile?.completeName ?? user.name ?? "",
            socialName: user.profile?.socialName ?? user.name ?? "",
            nickname: user.profile?.nickname ?? "",
            contactEmail: user.profile?.contactEmail ?? user.email ?? "",
            phone: user.profile?.phone ?? "",
            birthdate: format(
                user.profile?.birthdate ?? new Date(),
                "yyyy-MM-dd",
                { locale: ptBR },
            ),
            photo: undefined,
        },
    });

    return form;
};
