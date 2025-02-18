import { Control, useWatch } from "react-hook-form";
import { PcdRadioGroup } from "./pcd-radio-group";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
import { CheckboxList } from "../../ui/checkbox-list";

const deficiencys = [
    { label: "Visual" },
    { label: "Física" },
    { label: "Auditiva" },
    { label: "Mental/Intelectual" },
    { label: "Neurodiversidade" },
];

const extraSupports = [
    { label: "Descrição de imagens e audiodescrição de vídeos" },
    { label: "Intérprete de Libras ou Legenda" },
    { label: "Dificuldade na fala (exemplo: gagueira, disartria.)" },
    {
        label: "Digital (exemplo: aumento de tela do computador, mudanças de contraste)",
    },
    { label: "Elevador/Rampa" },
    { label: "Local silencioso e com baixa luminosidade" },
    { label: "Não necessito de nenhuma acessibilidade" },
];

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
                        items={deficiencys}
                    />
                    <CheckboxList
                        control={control}
                        name="extraSupport"
                        label="Você precisa de algum tipo de acessibilidade para participar como staff?"
                        tooltipMsg="Descreva aqui qual sua deficiência."
                        items={extraSupports}
                    />
                </>
            )}
        </>
    );
};
