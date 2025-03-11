import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { useMediaQuery } from "@react-hook/media-query";
import { useSelection } from "@/app/_hooks/useSelection";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import FormTooltip from "../form-fields/form-tooltip";
import { Selector } from "../ui/location-selector/selector";
import { Prisma } from "@prisma/client";
import { getUserLeaderList } from "@/app/_data/getUser";

interface SectorLeaderFieldProps<T extends ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
}

const SectorLeaderField = <T extends ZodTypeAny>({
    form,
}: SectorLeaderFieldProps<T>) => {
    const { isOpen, setIsOpen, selectedValue, handleSelect } = useSelection({
        form,
        fieldName: "leaderId",
    });
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [leaderList, setLeaderList] = useState<
        Prisma.UserGetPayload<{
            include: {
                profile: true;
            };
        }>[]
    >([]);

    const fetchLeaders = useCallback(async () => {
        try {
            const leaders = await getUserLeaderList();
            setLeaderList(leaders);
        } catch (error) {
            console.error("Erro ao buscar líderes:", error);
        }
    }, []);

    useEffect(() => {
        fetchLeaders();
    }, [fetchLeaders]);

    return (
        <FormItem className="flex w-full flex-col">
            <div className="flex items-center gap-2">
                <FormLabel>Líder</FormLabel>
                <FormTooltip msg="Selecione o líder do setor!" />
            </div>

            <FormControl>
                <Selector
                    isDesktop={isDesktop}
                    buttonLabel={
                        leaderList.find((leader) => leader.id === selectedValue)
                            ?.profile?.socialName ??
                        "Selecione o líder do setor"
                    }
                    items={leaderList}
                    selectedValue={selectedValue}
                    onSelect={handleSelect}
                    placeholder="Procure o líder do setor..."
                    emptyMessage="Nenhum líder encontrado."
                    getItemLabel={(item) => item.profile?.socialName ?? ""}
                    getItemValue={(item) => item.id}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </FormControl>

            <FormMessage />
        </FormItem>
    );
};

export default SectorLeaderField;
