import { formSchema } from "@/app/_schemas/formSchema";
import { Control } from "react-hook-form";
import { z } from "zod";
import { RadioGroupField } from "../../ui/radio-group-field";

interface PcdRadioGroupProps {
    control: Control<z.infer<typeof formSchema>>;
}

export const PcdRadioGroup = ({ control }: PcdRadioGroupProps) => (
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
