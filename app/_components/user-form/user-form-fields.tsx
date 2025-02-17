import { Control } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/app/_components/ui/input";
import FormTooltip from "@/app/_components/user-form/user-form-tooltip";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/app/_components/ui/form";
import { editUserFields } from "../../_constants/editUserFields";
import { formSchema } from "@/app/_schemas/formSchema";

interface UserFormFieldsProps {
    control: Control<z.infer<typeof formSchema>>;
}

export const UserFormFields = ({ control }: UserFormFieldsProps) => {
    return (
        <>
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
                                    value={(() => {
                                        if (typeof field.value === "boolean") {
                                            return field.value.toString();
                                        } else if (
                                            field.value instanceof File
                                        ) {
                                            return undefined;
                                        } else {
                                            return field.value ?? "";
                                        }
                                    })()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </>
    );
};
