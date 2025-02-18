import { formSchema } from "@/app/_schemas/formSchema";
import { Control, useWatch } from "react-hook-form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";
import FormTooltip from "../user-form-tooltip";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

interface PcdFieldsProps {
    control: Control<z.infer<typeof formSchema>>;
}

const deficiencys = [
    {
        label: "Visual",
    },
    {
        label: "Física",
    },
    {
        label: "Auditiva",
    },
    {
        label: "Mental/Intelectual",
    },
    {
        label: "Neurodiversidade",
    },
] as const;

const extraSupports = [
    {
        label: "Descrição de imagens e audiodescrição de vídeos",
    },
    {
        label: "Intérprete de Libras ou Legenda",
    },
    {
        label: "Dificuldade na fala (exemplo: gagueira, disartria.)",
    },
    {
        label: "Digital (exemplo: aumento de tela do computador, mudanças de contraste)",
    },
    {
        label: "Elevador/Rampa",
    },
    {
        label: "Local silencioso e com baixa luminosidade",
    },
    {
        label: "Não necessito de nenhuma acessibilidade",
    },
] as const;

const PcdFields = ({ control }: PcdFieldsProps) => {
    const isPcd = useWatch({ control, name: "isPcd" });

    return (
        <>
            <FormField
                control={control}
                name="isPcd"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>
                            <div className="flex items-center gap-2 space-y-1 leading-none">
                                Você é pessoa com deficiencia?
                                <FormTooltip msg="Marque este campo caso seja pessoa com deficiência." />
                            </div>
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value === "true");
                                }}
                                defaultValue={
                                    field.value === true ? "true" : "false"
                                }
                                className="flex flex-col space-y-1 px-4"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="false" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Não
                                    </FormLabel>
                                </FormItem>

                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="true" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Sim
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />

            {isPcd && (
                <>
                    <FormField
                        control={control}
                        name={"deficiency"}
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    Conte-nos qual o tipo de deficiência você
                                    tem?
                                    <FormTooltip msg="Descreva aqui qual sua deficiência." />
                                </FormLabel>
                                {deficiencys.map((deficiency) => (
                                    <FormField
                                        key={deficiency.label}
                                        control={control}
                                        name="deficiency"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={deficiency.label}
                                                    className="flex flex-row items-center space-x-3 space-y-0 px-4"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                deficiency.label,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...(field.value ||
                                                                                  []),
                                                                              deficiency.label,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  deficiency.label,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {deficiency.label}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={"extraSupport"}
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    Você precisa de algum tipo de acessibilidade
                                    para participar como staff?
                                    <FormTooltip msg="Descreva aqui qual sua deficiência." />
                                </FormLabel>
                                {extraSupports.map((extraSupport) => (
                                    <FormField
                                        key={extraSupport.label}
                                        control={control}
                                        name="extraSupport"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={extraSupport.label}
                                                    className="flex flex-row items-center space-x-3 space-y-0 px-4"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                extraSupport.label,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...(field.value ||
                                                                                  []),
                                                                              extraSupport.label,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  extraSupport.label,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {extraSupport.label}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
        </>
    );
};

export default PcdFields;
