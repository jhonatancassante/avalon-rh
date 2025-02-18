import { z } from "zod";
import isValidCPF from "../_utils/isValidCPF";
import isDateValidAndOver18 from "../_utils/isDateValidAndOver18";
import isValidPhone from "../_utils/isValidPhone";
import {
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from "../_constants/photoValidations";
import isValidPix from "../_utils/isValidPix";

const lettersAndNumbersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'\-\s]+$/;

export const formSchema = z.object({
    cpf: z.string().refine((value) => isValidCPF(value), "CPF inválido!"),
    completeName: z
        .string()
        .trim()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(150, "Nome muito longo! Máximo 150 caracteres.")
        .regex(
            lettersAndNumbersRegex,
            "Apenas letras e números são permitidos!",
        ),
    socialName: z
        .string()
        .trim()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres.")
        .regex(
            lettersAndNumbersRegex,
            "Apenas letras e números são permitidos!",
        ),
    nickname: z
        .string()
        .trim()
        .min(2, "Apelido muito curto! Mínimo 2 caracteres!")
        .max(20, "Apelido muito longo! Máximo 20 caracteres.")
        .regex(
            lettersAndNumbersRegex,
            "Apenas letras e números são permitidos!",
        ),
    pronoun: z.string().min(1),
    pixKey: z
        .string()
        .trim()
        .refine((value) => isValidPix(value), {
            message:
                "Chave Pix inválida! Deve ser digitado com pontuação no formatos: CPF: 000.000.000-00, CNPJ: 00.000.000/0000-00, Telefones: (00) 00000-0000 ou (00) 0000-0000 ou Chaves aleatórias.",
        }),
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
    isPcd: z.boolean().optional(),
    deficiency: z.array(z.string()).optional(),
    extraSupport: z.array(z.string()).optional(),
    city: z.string().min(1, "O campo cidade não pode ser vazio!"),
    state: z.string().min(1, "O campo estado não pode ser vazio!"),
    photo: z
        .instanceof(File)
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "O arquivo deve ter no máximo 1MB!",
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Apenas arquivos .jpg e .jpeg são aceitos!",
        )
        .optional(),
});
