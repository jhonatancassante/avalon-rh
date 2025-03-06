import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import isValidCPF from "./isValidCPF";
import isValidPhone from "./isValidPhone";
import isDateValidAndOver18 from "./isDateValidAndOver18";
import UpdateUser from "../_types/updateUser";
import isValidPix from "./isValidPix";

const lettersAndNumbersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'\-\s]+$/;

export const validadeUserFormSchema = z
    .object({
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
        pronoun: z.string().min(1, "Pronome é obrigatório"),
        pixKey: z
            .string()
            .trim()
            .refine((value) => isValidPix(value), {
                message: "Chave Pix inválida!",
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
            required_error: "Informe se é pessoa com deficiência",
            invalid_type_error: "Valor inválido para PCD",
        }),
        deficiency: z.array(z.string()).optional(),
        extraSupport: z.array(z.string()).optional(),
        city: z.string().min(1, "Cidade é obrigatória"),
        state: z.string().min(1, "Estado é obrigatório"),
    })
    .refine(
        (data) => {
            if (data.isPcd) {
                return data.deficiency && data.deficiency.length >= 1;
            }
            return true;
        },
        {
            message: "Selecione pelo menos uma deficiência",
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
            message: "Selecione pelo menos um suporte adicional",
            path: ["extraSupport"],
        },
    );

export const validateUserData = (data: UpdateUser) => {
    try {
        const dataToValidate = {
            ...data.profile,
            birthdate:
                data.profile?.birthdate instanceof Date
                    ? format(data.profile.birthdate, "dd/MM/yyyy", {
                          locale: ptBR,
                      })
                    : data.profile?.birthdate,
        };

        validadeUserFormSchema.parse(dataToValidate);

        return { isValid: true, errors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                isValid: false,
                errors: error.flatten().fieldErrors,
            };
        }
        return {
            isValid: false,
            errors: { general: ["Erro desconhecido na validação"] },
        };
    }
};
