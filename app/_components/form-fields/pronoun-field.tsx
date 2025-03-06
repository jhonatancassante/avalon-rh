import { Control, Path } from "react-hook-form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Pronouns } from "@/app/_constants/pronouns";
import FormTooltip from "./form-tooltip";

interface PronounFieldProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
}

const PronounField = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
}: PronounFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={"pronoun" as Path<z.infer<T>>}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>Pronome</FormLabel>
                        <FormTooltip msg="Selecione seu pronome!" />
                    </div>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione seu pronome" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Pronouns.map((pronoun) => {
                                return (
                                    <SelectItem key={pronoun} value={pronoun}>
                                        {pronoun}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PronounField;
