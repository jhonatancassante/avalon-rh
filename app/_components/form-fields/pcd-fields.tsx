import { Control, Path, useWatch } from "react-hook-form";
import { PcdRadioGroup } from "./pcd-radio-group";
import { z } from "zod";
import { CheckboxList } from "../ui/checkbox-list";
import { deficiencysList } from "@/app/_constants/deficiencysList";
import { extraSupportsList } from "@/app/_constants/extraSupportsList";

interface PcdFieldsProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
}

export const PcdFields = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
}: PcdFieldsProps<T>) => {
    const isPcd = useWatch({ control, name: "isPcd" as Path<z.infer<T>> });

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
                        items={deficiencysList}
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
