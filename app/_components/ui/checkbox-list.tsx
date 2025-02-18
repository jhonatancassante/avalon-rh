import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
import { FormField, FormItem, FormLabel } from "./form";
import FormTooltip from "../user-form/user-form-tooltip";
import { CheckboxItem } from "./checkbox-item";

interface CheckboxListProps {
    control: Control<z.infer<typeof formSchema>>;
    name:
        | "cpf"
        | "completeName"
        | "socialName"
        | "nickname"
        | "pronoun"
        | "pixKey"
        | "contactEmail"
        | "phone"
        | "birthdate"
        | "city"
        | "state"
        | "isPcd"
        | "deficiency"
        | "extraSupport"
        | "photo";
    label: string;
    items: { label: string }[];
    tooltipMsg?: string;
}

export const CheckboxList = ({
    control,
    name,
    label,
    items,
    tooltipMsg,
}: CheckboxListProps) => (
    <FormField
        control={control}
        name={name}
        render={() => (
            <FormItem>
                <FormLabel className="flex gap-2">
                    {label}
                    {tooltipMsg && <FormTooltip msg={tooltipMsg} />}
                </FormLabel>
                {items.map((item) => (
                    <FormField
                        key={item.label}
                        control={control}
                        name={name}
                        render={({ field: checkboxField }) => {
                            const value = Array.isArray(checkboxField.value)
                                ? checkboxField.value
                                : [];

                            return (
                                <CheckboxItem
                                    key={item.label}
                                    value={value}
                                    itemLabel={item.label}
                                    onChange={checkboxField.onChange}
                                />
                            );
                        }}
                    />
                ))}
            </FormItem>
        )}
    />
);
