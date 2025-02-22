import { Control, Path } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel } from "./form";
import FormTooltip from "../user-form/user-form-tooltip";
import { CheckboxItem } from "./checkbox-item";

interface CheckboxListProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
    name: string;
    label: string;
    items: { label: string }[];
    tooltipMsg?: string;
}

export const CheckboxList = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
    name,
    label,
    items,
    tooltipMsg,
}: CheckboxListProps<T>) => (
    <FormField
        control={control}
        name={name as Path<z.infer<T>>}
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
                        name={name as Path<z.infer<T>>}
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
