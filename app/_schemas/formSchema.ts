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

export const userFormSchema = z
    .object({
        cpf: z
            .string()
            .min(1, "CPF não pode estar vazio!")
            .refine((value) => isValidCPF(value), "CPF inválido!"),
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
        pronoun: z.string().min(1, "Selecione um pronome."),
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
        isPcd: z.boolean({
            required_error: "Informe se você é pessoa com deficiência",
            invalid_type_error: "Valor inválido",
        }),
        deficiency: z.array(z.string()).optional(),
        extraSupport: z.array(z.string()).optional(),
        city: z.string().min(1, "O campo cidade não pode ser vazio!"),
        state: z.string().min(1, "O campo estado não pode ser vazio!"),
        photo: z
            .instanceof(File)
            .nullable()
            .refine((file) => file instanceof File, {
                message: "É necessário colocar uma imagem",
            })
            .refine(
                (file) => !file || file.size <= MAX_FILE_SIZE,
                "O arquivo deve ter no máximo 1MB!",
            )
            .refine(
                (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Apenas arquivos .jpg e .jpeg são aceitos!",
            )
            .optional(),
    })
    .refine(
        (data) => {
            if (data.isPcd) {
                return data.deficiency && data.deficiency.length >= 1;
            }
            return true;
        },
        {
            message: "Selecione pelo menos item da lista.",
            path: ["deficiency"],
        },
    )
    .refine(
        (data) => {
            if (data.isPcd) {
                return data.extraSupport && data.extraSupport.length >= 1;
            }
            return true;
        },
        {
            message: "Selecione pelo menos item da lista.",
            path: ["extraSupport"],
        },
    );

export const eventFormSchema = z.object({
    name: z
        .string()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres."),
    edition: z.coerce.number().min(1, "A edição deve ser maior que zero"),
    date: z.string().min(10, "Data inválida!"),
    state: z.string().min(1, "O campo estado não pode ser vazio!"),
    city: z.string().min(1, "O campo cidade não pode ser vazio!"),
    dateToOpen: z.string().min(10, "Data inválida!"),
    dateToClose: z.string().min(10, "Data inválida!"),
    eventSectors: z.array(z.string().min(1, "Selecione pelo menos um setor")),
});

export const sectorFormSchema = z.object({
    name: z
        .string()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres."),
    leaderId: z.string().min(1, "Selecione um líder"),
});

export const levelFormSchema = z.object({
    name: z
        .string()
        .min(5, "Nome muito curto! Mínimo 5 caracteres!")
        .max(100, "Nome muito longo! Máximo 100 caracteres."),
    isLcaApply: z.boolean(),
});

export const userEventApplyFormSchema = z
    .object({
        eventId: z.string().min(1, "Selecione um evento"),
        sector0: z.string().min(1, "Selecione pelo menos um setor"),
        sector1: z.string().min(1, "Selecione pelo menos um setor"),
        sector2: z.string().min(1, "Selecione pelo menos um setor"),
        sector3: z.string().min(1, "Selecione pelo menos um setor"),
    })
    .refine((data) => {
        const sectors = [
            data.sector0,
            data.sector1,
            data.sector2,
            data.sector3,
        ];

        const duplicates: Record<string, string[]> = {};

        sectors.forEach((value, index) => {
            if (value.trim() === "") return;
            if (!duplicates[value]) duplicates[value] = [];
            duplicates[value].push(`sector${index}`);
        });

        const duplicatedEntries = Object.entries(duplicates).filter(
            ([, fields]) => fields.length > 1,
        );

        if (duplicatedEntries.length === 0) return true;

        throw new z.ZodError(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            duplicatedEntries.flatMap(([value, fields]) =>
                fields.map((path) => ({
                    code: z.ZodIssueCode.custom,
                    message: `O setor está repetido`,
                    path: [path],
                })),
            ),
        );
    });
