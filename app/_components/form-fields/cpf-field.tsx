import formatCPF from "@/app/_utils/formatCPF";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormTooltip from "./form-tooltip";
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
                    <div className="flex items-center gap-2">
                        <FormLabel>CPF</FormLabel>
                        <FormTooltip msg="Digite somente os números." />
                    </div>
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
