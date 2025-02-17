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
import FormTooltip from "../user-form-tooltip";
import { Input } from "../../ui/input";
import formatPhone from "@/app/_utils/formatPhone";

interface PhoneFieldProps {
    control: Control<z.infer<typeof formSchema>>;
}

const PhoneField = ({ control }: PhoneFieldProps) => {
    return (
        <FormField
            control={control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex gap-2">
                        Celular / Whatsapp
                        <FormTooltip msg="Digite seu número de celular que utiliza Whatsapp. Somente os números!" />
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Digite o celular"
                            {...field}
                            onChange={(e) => {
                                const formattedValue = formatPhone(
                                    e.target.value,
                                );
                                field.onChange(formattedValue);
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PhoneField;
