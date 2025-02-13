import { z } from "zod";
import { formSchema } from "../_schemas/formSchema";
import UpdateUser from "../_types/UpdateUser";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const validateUserData = (data: UpdateUser) => {
    try {
        const dataToValidade =
            typeof data.birthdate === "string"
                ? data
                : {
                      ...data,
                      birthdate: format(data.birthdate, "yyyy/MM/dd", {
                          locale: ptBR,
                      }),
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
