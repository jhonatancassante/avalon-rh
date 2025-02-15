import { Control } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/app/_components/ui/input";
import FormTooltip from "@/app/_components/form-tooltip";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/app/_components/ui/form";
import { editUserFields } from "../../_constants/editUserFields";
import formatCPF from "../../_utils/formatCPF";
import formatPhone from "../../_utils/formatPhone";
import { formSchema } from "@/app/_schemas/formSchema";

interface UserFormFieldsProps {
    control: Control<z.infer<typeof formSchema>>;
}

export const UserFormFields = ({ control }: UserFormFieldsProps) => {
    return (
        <>
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
            {editUserFields.map((formField, index) => (
                <FormField
                    key={`${index} - ${formField.name}`}
                    control={control}
                    name={formField.name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                {formField.label}
                                <FormTooltip msg={formField.tooltip} />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={formField.type}
                                    placeholder={formField.placeholder}
                                    {...field}
                                    disabled={formField.disabled}
                                    value={
                                        field.value instanceof File
                                            ? undefined
                                            : field.value || ""
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex gap-2">
                            Celular / Whatsapp
                            <FormTooltip msg="Digite seu número de celular que utiliza Whatsapp. Somente os números!" />
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o celular"
                                {...field}
                                onChange={(e) => {
                                    const formattedValue = formatPhone(
                                        e.target.value,
                                    );
                                    field.onChange(formattedValue);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
