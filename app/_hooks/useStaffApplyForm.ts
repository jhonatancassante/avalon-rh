import { userEventApplyFormSchema } from "../_schemas/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserStaffApply } from "../_components/user-page/user-tabs/apply-tabs/types";

interface UseStaffApplyFormProps {
    staffApply?: UserStaffApply | null;
}

export const useStaffApplyForm = ({ staffApply }: UseStaffApplyFormProps) => {
    const sectors = staffApply?.userEventSectors;

    return useForm<z.infer<typeof userEventApplyFormSchema>>({
        resolver: zodResolver(userEventApplyFormSchema),
        mode: "onChange",
        defaultValues: {
            eventId: staffApply?.eventId ?? "",
            sector0:
                sectors?.find((sector) => sector.optionOrder === 0)?.id ?? "",
            sector1:
                sectors?.find((sector) => sector.optionOrder === 1)?.id ?? "",
            sector2:
                sectors?.find((sector) => sector.optionOrder === 2)?.id ?? "",
            sector3:
                sectors?.find((sector) => sector.optionOrder === 3)?.id ?? "",
        },
    });
};
