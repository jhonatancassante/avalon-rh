import { Sector } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sectorFormSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface UseSectorFormProps {
    sector?: Sector | null;
}

export const useSectorForm = ({ sector }: UseSectorFormProps) => {
    const form = useForm<z.infer<typeof sectorFormSchema>>({
        resolver: zodResolver(sectorFormSchema),
        mode: "onChange",
        defaultValues: {
            name: sector?.name ?? "",
        },
    });

    useEffect(() => {
        if (sector) {
            form.reset({
                name: sector.name,
            });
        } else {
            form.reset();
        }
    }, [sector, form]);

    return form;
};
