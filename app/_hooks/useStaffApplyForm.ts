import { UserEventApply } from "@prisma/client";
import { userEventApplyFormSchema } from "../_schemas/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseStaffApplyFormProps {
    staffEventApply?: UserEventApply | null;
}

export const useStaffApplyForm = ({
    staffEventApply,
}: UseStaffApplyFormProps) => {
    return useForm<z.infer<typeof userEventApplyFormSchema>>({
        resolver: zodResolver(userEventApplyFormSchema),
        mode: "onChange",
        defaultValues: {
            userId: staffEventApply?.userId ?? "",
            eventId: staffEventApply?.eventId ?? "",
            eventSectors: [],
        },
    });
};
