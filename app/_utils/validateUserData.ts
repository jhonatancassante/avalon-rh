import { z } from "zod";
import { formSchema } from "../_schemas/formSchema";
import { User } from "@prisma/client";

export const validateUserData = (data: User) => {
    try {
        formSchema.parse(data);
        return { isValid: true, errors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { isValid: false, errors: error.flatten().fieldErrors };
        }
        throw error;
    }
};
