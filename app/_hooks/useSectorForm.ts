import { Sector } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sectorFormSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseSectorFormProps {
    sector?: Sector;
}

export const useSectorForm = ({ sector }: UseSectorFormProps) => {
    return useForm<z.infer<typeof sectorFormSchema>>({
        resolver: zodResolver(sectorFormSchema),
        mode: "onChange",
        defaultValues: {
            name: sector?.name ?? "",
        },
    });
};
