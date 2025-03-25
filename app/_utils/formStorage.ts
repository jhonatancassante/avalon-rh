import { z } from "zod";

export const saveFormToLocalStorage = <T extends z.ZodTypeAny>(
    key: string,
    data: z.infer<T>,
) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const loadFormFromLocalStorage = <T extends z.ZodTypeAny>(
    key: string,
) => {
    const savedData = localStorage.getItem(key);
    return savedData ? (JSON.parse(savedData) as z.infer<T>) : null;
};

export const clearFormFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

export type FormStorage<T extends z.ZodTypeAny> = {
    save: (data: z.infer<T>) => void;
    load: () => z.infer<T> | null;
    clear: () => void;
};

export const createFormStorage = <T extends z.ZodTypeAny>(
    key: string,
): FormStorage<T> => ({
    save: (data) => saveFormToLocalStorage<T>(key, data),
    load: () => loadFormFromLocalStorage<T>(key),
    clear: () => clearFormFromLocalStorage(key),
});
