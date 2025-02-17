import { formSchema } from "@/app/_schemas/formSchema";
import { Control } from "react-hook-form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Pronouns } from "@/app/_constants/pronouns";

interface PronounFieldProps {
    control: Control<z.infer<typeof formSchema>>;
}

const PronounField = ({ control }: PronounFieldProps) => {
    return (
        <FormField
            control={control}
            name="pronoun"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Pronome</FormLabel>
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
