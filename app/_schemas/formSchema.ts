import { z } from "zod";
import isValidCPF from "../_utils/isValidCPF";
import isDateValidAndOver18 from "../_utils/isDateValidAndOver18";
import isValidPhone from "../_utils/isValidPhone";
import {
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from "../_constants/photoValidations";

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
    photo: z
        .instanceof(File)
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            "O arquivo deve ter no máximo 1MB!",
        )
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Apenas arquivos .jpg e .jpeg são aceitos!",
        ),
});
