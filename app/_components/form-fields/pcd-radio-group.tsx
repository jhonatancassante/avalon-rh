import { Control } from "react-hook-form";
import { z } from "zod";
import { RadioGroupField } from "../ui/radio-group-field";

interface PcdRadioGroupProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
}

export const PcdRadioGroup = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
}: PcdRadioGroupProps<T>) => (
    <RadioGroupField
        control={control}
        name="isPcd"
        label="Você é pessoa com deficiência?"
        tooltipMsg="Marque este campo caso seja pessoa com deficiência."
        options={[
            { value: "false", label: "Não" },
            { value: "true", label: "Sim" },
        ]}
    />
);
