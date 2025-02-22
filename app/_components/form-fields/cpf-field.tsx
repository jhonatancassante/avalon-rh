import formatCPF from "@/app/_utils/formatCPF";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormTooltip from "../user-form/user-form-tooltip";
import { Control, Path } from "react-hook-form";
import { z } from "zod";

interface CpfFieldProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
}

const CpfField = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
}: CpfFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={"cpf" as Path<z.infer<T>>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex gap-2">
                        CPF
                        <FormTooltip msg="Digite somente os números." />
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Digite o CPF"
                            {...field}
                            onChange={(e) => {
                                const formattedValue = formatCPF(
                                    e.target.value,
                                );
                                field.onChange(formattedValue);
                            }}
                            value={field.value || ""}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CpfField;
