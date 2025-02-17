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
import { Textarea } from "../../ui/textarea";

interface PcdFieldsProps {
    control: Control<z.infer<typeof formSchema>>;
}

const PcdFields = ({ control }: PcdFieldsProps) => {
    const isPcd = useWatch({ control, name: "isPcd" });

    return (
        <>
            <FormField
                control={control}
                name="isPcd"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                defaultChecked={false}
                            />
                        </FormControl>
                        <div className="flex items-center gap-2 space-y-1 leading-none">
                            <FormLabel>É Portador de Deficiencia?</FormLabel>
                            <FormTooltip msg="Marque aqui caso tenha alguma deficiência." />
                        </div>
                    </FormItem>
                )}
            />

            {isPcd && (
                <FormField
                    control={control}
                    name={"deficiency"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Qual sua deficiência?
                                <FormTooltip msg="Descreva aqui qual sua deficiência." />
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Digite sua deficiência"
                                    {...field}
                                    rows={5} // Define 5 linhas
                                    className="resize-none" // Impede o redimensionamento
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {isPcd && (
                <FormField
                    control={control}
                    name={"extraSupport"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Precisa de algum auxílio específico?
                                <FormTooltip msg="Descreva aqui se precisa de algum auxílio para executar os trabalhos. " />
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva caso precise de algum auxílio"
                                    {...field}
                                    rows={5} // Define 5 linhas
                                    className="resize-none" // Impede o redimensionamento
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </>
    );
};

export default PcdFields;
