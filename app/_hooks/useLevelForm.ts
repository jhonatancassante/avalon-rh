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
            isLcaApply: level?.isLcaApply ?? false,
            points: level?.points ?? 0,
            pointsLca: level?.pointsLca ?? 0,
        },
    });

    useEffect(() => {
        if (level) {
            form.reset({
                name: level.name,
                isLcaApply: level.isLcaApply,
                points: level.points,
                pointsLca: level.pointsLca,
            });
        } else {
            form.reset();
        }
    }, [level, form]);

    return form;
};
