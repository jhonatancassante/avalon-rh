import { useState } from "react";
import { Path, PathValue, UseFormReturn } from "react-hook-form";
import { TypeOf, z } from "zod";

interface UseSelectionProps<T extends z.ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    fieldName: string;
    onSelect?: (value: string) => void;
}

export const useSelection = <T extends z.ZodTypeAny>({
    form,
    fieldName,
    onSelect,
}: UseSelectionProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedValue = form.watch(fieldName as Path<z.infer<T>>);

    const handleSelect = (value: string) => {
        form.setValue(
            fieldName as Path<z.infer<T>>,
            value as PathValue<TypeOf<T>, Path<TypeOf<T>>>,
        );
        form.clearErrors(fieldName as Path<TypeOf<T>>);
        onSelect?.(value);
        setIsOpen(false);
    };

    return { isOpen, setIsOpen, selectedValue, handleSelect };
};
