import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import isValidCPF from "./isValidCPF";
import isValidPhone from "./isValidPhone";
import isDateValidAndOver18 from "./isDateValidAndOver18";
import { UpdateUser } from "../_types/UpdateUser";

export const formSchema = z.object({
    cpf: z.string().refine((value) => isValidCPF(value), "CPF inválido!"),
    completeName: z
        .string()
        .trim()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres."),
    socialName: z
        .string()
        .trim()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres."),
    nickname: z
        .string()
        .trim()
        .min(2, "Apelido muito curto! Mínimo 2 caracteres!")
        .max(20, "Apelido muito longo! Máximo 20 caracteres."),
    contactEmail: z.string().email("Email inválido!"),
    phone: z
        .string()
        .refine((value) => isValidPhone(value), "Celular inválido!"),
    birthdate: z
        .string()
        .min(10, "Data inválida!")
        .refine(
            (value) => isDateValidAndOver18(value),
            "Você deve ter pelo menos 18 anos!",
        ),
});

export const validateUserData = (data: UpdateUser) => {
    try {
        const dataToValidade =
            typeof data?.profile?.birthdate === "string"
                ? { ...data.profile }
                : {
                      ...data.profile,
                      birthdate: format(
                          data?.profile?.birthdate ?? new Date(),
                          "yyyy/MM/dd",
                          {
                              locale: ptBR,
                          },
                      ),
                  };
        formSchema.parse(dataToValidade);
        return { isValid: true, errors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { isValid: false, errors: error.flatten().fieldErrors };
        }
        throw error;
    }
};
