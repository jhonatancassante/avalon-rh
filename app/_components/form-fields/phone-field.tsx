import { Control, Path } from "react-hook-form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import FormTooltip from "../user-form/user-form-tooltip";
import { Input } from "../ui/input";
import formatPhone from "@/app/_utils/formatPhone";

interface PhoneFieldProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
}

const PhoneField = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
}: PhoneFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={"phone" as Path<z.infer<T>>}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>Celular / Whatsapp</FormLabel>
                        <FormTooltip msg="Digite seu número de celular que utiliza Whatsapp com o DDD. Somente os números!" />
                    </div>
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
