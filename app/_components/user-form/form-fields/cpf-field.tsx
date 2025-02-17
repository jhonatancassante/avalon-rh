import formatCPF from "@/app/_utils/formatCPF";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import FormTooltip from "../user-form-tooltip";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";

interface CpfFieldProps {
    control: Control<z.infer<typeof formSchema>>;
}

const CpfField = ({ control }: CpfFieldProps) => {
    return (
        <FormField
            control={control}
            name="cpf"
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
