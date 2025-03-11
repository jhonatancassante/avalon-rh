import { Control, Path } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { FormField, FormItem, FormLabel, FormMessage } from "./form";
import FormTooltip from "../form-fields/form-tooltip";
import { CheckboxItem } from "./checkbox-item";

interface CheckboxListProps<T extends ZodTypeAny> {
    control: Control<z.infer<T>>;
    name: string;
    label: string;
    items: { label: string; value: string }[];
    tooltipMsg?: string;
}

export const CheckboxList = <T extends ZodTypeAny>({
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
                <div className="flex items-center gap-2">
                    <FormLabel>{label}</FormLabel>
                    {tooltipMsg && <FormTooltip msg={tooltipMsg} />}
                </div>
                {items.map((item) => (
                    <FormField
                        key={item.value}
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
                                    itemValue={item.value}
                                    itemLabel={item.label}
                                    onChange={checkboxField.onChange}
                                />
                            );
                        }}
                    />
                ))}
                <FormMessage />
            </FormItem>
        )}
    />
);
