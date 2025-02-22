import { Control, Path } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { z } from "zod";
import UpdatePhoto from "@/app/_types/updatePhoto";
import FormTooltip from "../user-form/user-form-tooltip";
import { Input } from "../ui/input";

interface UserFormFieldsProps<T extends z.ZodObject<z.ZodRawShape>> {
    control: Control<z.infer<T>>;
    handleFileUpload: (file: File) => void;
    photoData: UpdatePhoto | null;
    isComplete: boolean;
}

const PhotoField = <T extends z.ZodObject<z.ZodRawShape>>({
    control,
    handleFileUpload,
    photoData,
    isComplete,
}: UserFormFieldsProps<T>) => {
    return (
        <FormField
            control={control}
            name={"photo" as Path<z.infer<T>>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex gap-2">
                        Foto de Perfil
                        <FormTooltip msg="Selecione uma foto de perfil. O arquivo deve ter no máximo 1MB e as dimensões devem ser entre 500x500 e 3036x3036." />
                    </FormLabel>
                    <FormControl>
                        <Input
                            id="photo-field"
                            type="file"
                            accept="image/jpeg, image/jpg"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleFileUpload(file);
                                    field.onChange(file);
                                }
                            }}
                            required={!photoData && !isComplete}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PhotoField;
