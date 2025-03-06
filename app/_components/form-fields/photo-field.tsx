import { Control, Path } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { z, ZodTypeAny } from "zod";
import UpdatePhoto from "@/app/_types/updatePhoto";
import FormTooltip from "./form-tooltip";
import { Input } from "../ui/input";

interface UserFormFieldsProps<T extends ZodTypeAny> {
    control: Control<z.infer<T>>;
    handleFileUpload: (file: File) => void;
    photoData: UpdatePhoto | null;
    isComplete: boolean;
}

const PhotoField = <T extends ZodTypeAny>({
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
                    <div className="flex items-center gap-2">
                        <FormLabel>Foto de Perfil</FormLabel>
                        <FormTooltip msg="Selecione uma foto de perfil. O arquivo deve ter no máximo 1MB e as dimensões devem ser entre 500x500 e 3036x3036." />
                    </div>
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
