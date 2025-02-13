import { z } from "zod";
import isValidCPF from "../_utils/isValidCPF";
import isDateValidAndOver18 from "../_utils/isDateValidAndOver18";

export const formSchema = z.object({
    cpf: z.string().refine((value) => isValidCPF(value), "CPF inválido!"),
    completeName: z.string().trim().min(5, "Nome muito curto!"),
    secondaryEmail: z.string().email("Email inválido!"),
    birthdate: z
        .string()
        .min(10, "Data inválida!")
        .refine(
            (value) => isDateValidAndOver18(value),
            "Você deve ter pelo menos 18 anos!",
        ),
    photoUrl: z
        .string()
        .url("URL inválida!")
        .refine(
            (value) => value.startsWith("https://drive.google.com/file/d/"),
            "O link da imagem deve ser do Google Drive!",
        ),
});
