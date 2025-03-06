import { Control } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { RadioGroupField } from "../ui/radio-group-field";

interface PcdRadioGroupProps<T extends ZodTypeAny> {
    control: Control<z.infer<T>>;
}

export const PcdRadioGroup = <T extends ZodTypeAny>({
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
