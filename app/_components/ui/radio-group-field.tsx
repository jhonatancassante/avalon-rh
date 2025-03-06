import { Control, Path } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import FormTooltip from "../user-form/user-form-tooltip";
import { RadioGroup, RadioGroupItem } from "./radio-group";

interface RadioGroupFieldProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
    name: string;
    label: string;
    options: { value: string; label: string }[];
    tooltipMsg?: string;
}

export const RadioGroupField = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
    name,
    label,
    options,
    tooltipMsg,
}: RadioGroupFieldProps<T>) => (
    <FormField
        control={control}
        name={name as Path<z.infer<T>>}
        render={({ field }) => (
            <FormItem className="space-y-3">
                <div className="flex items-center gap-2">
                    <FormLabel>
                        <div>{label}</div>
                    </FormLabel>
                    {tooltipMsg && <FormTooltip msg={tooltipMsg} />}
                </div>
                <FormControl>
                    <RadioGroup
                        onValueChange={(value) => {
                            field.onChange(value === "true");
                        }}
                        defaultValue={field.value === true ? "true" : "false"}
                        className="flex flex-col space-y-1 px-4"
                    >
                        {options.map((option) => (
                            <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {option.label}
                                </FormLabel>
                            </FormItem>
                        ))}
                    </RadioGroup>
                </FormControl>
            </FormItem>
        )}
    />
);
