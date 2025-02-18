import { Control, useWatch } from "react-hook-form";
import { PcdRadioGroup } from "./pcd-radio-group";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
import { CheckboxList } from "../../ui/checkbox-list";
import { DeficiencysList } from "@/app/_constants/deficiencysList";
import { extraSupportsList } from "@/app/_constants/extraSupportsList";

interface PcdFieldsProps {
    control: Control<z.infer<typeof formSchema>>;
}

export const PcdFields = ({ control }: PcdFieldsProps) => {
    const isPcd = useWatch({ control, name: "isPcd" });

    return (
        <>
            <PcdRadioGroup control={control} />
            {isPcd && (
                <>
                    <CheckboxList
                        control={control}
                        name="deficiency"
                        label="Conte-nos qual o tipo de deficiência você tem?"
                        tooltipMsg="Descreva aqui qual sua deficiência."
                        items={DeficiencysList}
                    />
                    <CheckboxList
                        control={control}
                        name="extraSupport"
                        label="Você precisa de algum tipo de acessibilidade para participar como staff?"
                        tooltipMsg="Descreva aqui qual sua deficiência."
                        items={extraSupportsList}
                    />
                </>
            )}
        </>
    );
};
