import { Control } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import FormTooltip from "../user-form/user-form-tooltip";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { formSchema } from "@/app/_schemas/formSchema";

interface RadioGroupFieldProps {
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
    options: { value: string; label: string }[];
    tooltipMsg?: string;
}

export const RadioGroupField = ({
    control,
    name,
    label,
    options,
    tooltipMsg,
}: RadioGroupFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="space-y-3">
                <FormLabel>
                    <div className="flex items-center gap-2 space-y-1 leading-none">
                        {label}
                        {tooltipMsg && <FormTooltip msg={tooltipMsg} />}
                    </div>
                </FormLabel>
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
