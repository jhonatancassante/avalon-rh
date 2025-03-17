import { Selector } from "../ui/location-selector/selector";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import FormTooltip from "./form-tooltip";
import { Path, PathValue, UseFormReturn } from "react-hook-form";
import { TypeOf, z } from "zod";
import { useSelection } from "@/app/_hooks/useSelection";

interface StateFieldProps<T extends z.ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    states: { id: number; nome: string }[];
    isDesktop: boolean;
    fetchCities: (stateId: number) => void;
}

const StateField = <T extends z.ZodTypeAny>({
    form,
    states,
    isDesktop,
    fetchCities,
}: StateFieldProps<T>) => {
    const { isOpen, setIsOpen, selectedValue, handleSelect } = useSelection({
        form,
        fieldName: "state",
        onSelect: (value) => {
            const state = states.find((s) => s.nome === value);
            if (state) {
                form.setValue(
                    "city" as Path<TypeOf<T>>,
                    "" as PathValue<TypeOf<T>, Path<TypeOf<T>>>,
                );
                fetchCities(state.id);
            }
        },
    });

    return (
        <FormField
            control={form.control}
            name={"state" as Path<TypeOf<T>>}
            render={() => (
                <FormItem className="flex w-full flex-col">
                    <div className="flex items-center gap-2">
                        <FormLabel>Estado</FormLabel>
                        <FormTooltip msg="Selecione seu estado!" />
                    </div>

                    <FormControl>
                        <Selector
                            isDesktop={isDesktop}
                            buttonLabel={selectedValue || "Selecione o estado"}
                            items={states}
                            selectedValue={selectedValue}
                            onSelect={handleSelect}
                            placeholder="Procure o estado..."
                            emptyMessage="Nenhum estado encontrado."
                            getItemLabel={(item) => item.nome}
                            getItemValue={(item) => item.nome}
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

export default StateField;
