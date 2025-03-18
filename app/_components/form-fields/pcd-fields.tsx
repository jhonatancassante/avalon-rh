import { Control, Path, useWatch } from "react-hook-form";
import { PcdRadioGroup } from "./pcd-radio-group";
import { z, ZodTypeAny } from "zod";
import { CheckboxList } from "../ui/checkbox-list";
import { DEFICIENCYLIST } from "@/app/_constants/deficiencysList";
import { EXTRASUPPORTLIST } from "@/app/_constants/extraSupportsList";

interface PcdFieldsProps<T extends ZodTypeAny> {
    control: Control<z.infer<T>>;
}

export const PcdFields = <T extends ZodTypeAny>({
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
                        items={DEFICIENCYLIST}
                    />
                    <CheckboxList
                        control={control}
                        name="extraSupport"
                        label="Você precisa de algum tipo de acessibilidade para participar como staff?"
                        tooltipMsg="Descreva aqui qual sua deficiência."
                        items={EXTRASUPPORTLIST}
                    />
                </>
            )}
        </>
    );
};
