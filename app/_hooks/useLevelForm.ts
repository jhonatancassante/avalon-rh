import { Level } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { levelFormSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface UseLevelFormProps {
    level?: Level | null;
}

export const useLevelForm = ({ level }: UseLevelFormProps) => {
    const form = useForm<z.infer<typeof levelFormSchema>>({
        resolver: zodResolver(levelFormSchema),
        mode: "onChange",
        defaultValues: {
            name: level?.name ?? "",
        },
    });

    useEffect(() => {
        if (level) {
            form.reset({
                name: level.name,
            });
        } else {
            form.reset();
        }
    }, [level, form]);

    return form;
};
