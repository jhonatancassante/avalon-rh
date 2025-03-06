import { Control, Path, ControllerRenderProps } from "react-hook-form";
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
import { EditFields } from "@/app/_types/editFields";

interface FormFieldsProps<T extends z.ZodObject<z.ZodRawShape>> {
    formSchema: T;
    control: Control<z.infer<T>>;
    editFields: EditFields[];
}

export const FormFields = <T extends z.ZodObject<z.ZodRawShape>>({
    formSchema,
    control,
    editFields,
}: FormFieldsProps<T>) => {
    return (
        <>
            {editFields.map((formField, index) => {
                if (!(formField.name in formSchema.shape)) {
                    console.warn(
                        `Campo "${formField.name}" não encontrado no schema.`,
                    );
                    return null;
                }

                return (
                    <FormField
                        key={`${index} - ${formField.name}`}
                        control={control}
                        name={formField.name as Path<z.infer<T>>}
                        render={({ field }) => {
                            const getFieldValue = (
                                field: ControllerRenderProps<
                                    z.infer<T>,
                                    Path<z.infer<T>>
                                >,
                            ) => {
                                if (formField.type === "number") {
                                    return field.value !== undefined
                                        ? Number(field.value)
                                        : "";
                                } else if (typeof field.value === "boolean") {
                                    return field.value.toString();
                                } else if (
                                    typeof File !== "undefined" &&
                                    (field.value as unknown) instanceof File
                                ) {
                                    return undefined;
                                } else {
                                    return field.value ?? "";
                                }
                            };

                            return (
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <FormLabel>{formField.label}</FormLabel>
                                        <FormTooltip msg={formField.tooltip} />
                                    </div>
                                    <FormControl>
                                        <Input
                                            type={formField.type}
                                            placeholder={formField.placeholder}
                                            {...field}
                                            disabled={formField.disabled}
                                            value={getFieldValue(field)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                );
            })}
        </>
    );
};
