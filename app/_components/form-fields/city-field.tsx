import { Selector } from "../ui/location-selector/selector";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import FormTooltip from "./form-tooltip";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useSelection } from "@/app/_hooks/useSelection";

interface CityFieldProps<T extends z.ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    cities: { nome: string }[];
    isDesktop: boolean;
    loadingCities: boolean;
}

const CityField = <T extends z.ZodTypeAny>({
    form,
    cities,
    isDesktop,
    loadingCities,
}: CityFieldProps<T>) => {
    const { isOpen, setIsOpen, selectedValue, handleSelect } = useSelection({
        form,
        fieldName: "city",
    });

    return (
        <FormItem className="flex w-full flex-col">
            <div className="flex items-center gap-2">
                <FormLabel>Cidade</FormLabel>
                <FormTooltip msg="Selecione sua cidade!" />
            </div>

            <FormControl>
                <Selector
                    isDesktop={isDesktop}
                    buttonLabel={
                        loadingCities
                            ? "Carregando..."
                            : selectedValue || "Selecione a cidade"
                    }
                    items={cities}
                    selectedValue={selectedValue}
                    onSelect={handleSelect}
                    placeholder="Procure a cidade..."
                    emptyMessage="Nenhuma cidade encontrada."
                    getItemLabel={(item) => item.nome}
                    getItemValue={(item) => item.nome}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </FormControl>

            <FormMessage />
        </FormItem>
    );
};

export default CityField;
