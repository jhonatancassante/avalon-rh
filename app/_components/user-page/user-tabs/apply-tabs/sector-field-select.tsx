import { Sector } from "@prisma/client";
import { Path, UseFormReturn } from "react-hook-form";
import { TypeOf, z, ZodTypeAny } from "zod";
import { SelectedSectors, UserStaffApply } from "./types";
import { useIsMobile } from "@/app/_hooks/useMobile";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import FormTooltip from "@/app/_components/form-fields/form-tooltip";
import { Selector } from "@/app/_components/ui/location-selector/selector";
import { useSelection } from "@/app/_hooks/useSelection";

interface SectorFieldSelectProps<T extends ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    sectorList: Sector[];
    apply: UserStaffApply | null;
    fieldIndex: number;
    sectorLabel: string;
    selectedSectors?: SelectedSectors;
    setSelectedSectors: (sectors: SelectedSectors) => void;
}

const SectorFieldSelect = <T extends ZodTypeAny>({
    form,
    sectorList,
    apply,
    fieldIndex,
    sectorLabel,
    selectedSectors,
    setSelectedSectors,
}: SectorFieldSelectProps<T>) => {
    const isMobile = useIsMobile();

    const helperSetSelectedSectors = (
        selectedSectors: SelectedSectors,
        index: number,
        sector: Sector,
    ) => {
        if (index < 0 || index > 3) {
            throw new Error("Index must be between 0 and 3");
        }

        const newSelectedSectors = { ...selectedSectors };
        const key = index as keyof SelectedSectors;
        newSelectedSectors[key] = sector;
        return newSelectedSectors;
    };
    const { isOpen, setIsOpen, selectedValue, handleSelect } = useSelection({
        form,
        fieldName: `sector${fieldIndex}`,
        onSelect: (value) => {
            const sector = sectorList.find((sector) => sector.id === value);
            if (sector && selectedSectors) {
                const newSelectedSectors = helperSetSelectedSectors(
                    selectedSectors,
                    fieldIndex,
                    sector,
                );
                setSelectedSectors(newSelectedSectors);
            }
        },
    });

    const selectedSectorId =
        apply &&
        apply.userEventSectors.find(
            (sector) => sector.optionOrder === fieldIndex,
        )?.sectorId;

    const buttonLabel = sectorList?.find(
        (sector) => sector.id === selectedSectorId,
    )?.name;

    return (
        <FormField
            control={form.control}
            name={`sector${fieldIndex}` as Path<TypeOf<T>>}
            render={() => (
                <FormItem className="flex w-full flex-col">
                    <div className="flex items-center gap-2">
                        <FormLabel>{`${sectorLabel} opção`}</FormLabel>
                        <FormTooltip
                            msg={`Selecione um setor para a ${fieldIndex + 1}ª opção`}
                        />
                    </div>

                    <FormControl>
                        <Selector
                            isDesktop={!isMobile}
                            buttonLabel={buttonLabel ?? "Selecione o Setor"}
                            items={sectorList}
                            selectedValue={selectedValue}
                            onSelect={handleSelect}
                            placeholder="Procure o setor..."
                            emptyMessage="Nenhum setor encontrado"
                            getItemLabel={(item) => item.name}
                            getItemValue={(item) => item.id}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SectorFieldSelect;
