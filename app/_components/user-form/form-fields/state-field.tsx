import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "../../ui/drawer";
import { Button } from "../../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { formSchema } from "@/app/_schemas/formSchema";
import { z } from "zod";

interface StateFieldProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    states: { id: number; nome: string }[];
    isDesktop: boolean;
    fetchCities: (stateId: number) => void;
}

const StateField = ({
    form,
    states,
    isDesktop,
    fetchCities,
}: StateFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel>Estado</FormLabel>
                    {isDesktop ? (
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-between lg:w-auto ${
                                            !field.value &&
                                            "text-muted-foreground"
                                        }`}
                                    >
                                        {field.value
                                            ? states.find(
                                                  (state) =>
                                                      state.nome ===
                                                      field.value,
                                              )?.nome
                                            : "Selecione o estado"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Procure o estado..."
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            Nenhum estado encontrado.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {states.map((state) => (
                                                <CommandItem
                                                    value={state.nome}
                                                    key={state.nome}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "state",
                                                            state.nome,
                                                        );
                                                        fetchCities(state.id);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {state.nome}
                                                    <Check
                                                        className={`ml-auto ${
                                                            state.nome ===
                                                            field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        }`}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Drawer open={isOpen} onOpenChange={setIsOpen}>
                            <DrawerTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-between lg:w-auto ${
                                            !field.value &&
                                            "text-muted-foreground"
                                        }`}
                                    >
                                        {field.value
                                            ? states.find(
                                                  (state) =>
                                                      state.nome ===
                                                      field.value,
                                              )?.nome
                                            : "Selecione o estado"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </DrawerTrigger>
                            <DrawerContent>
                                <Command>
                                    <CommandInput
                                        placeholder="Procure o estado..."
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            Nenhum estado encontrado.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {states.map((state) => (
                                                <CommandItem
                                                    value={state.nome}
                                                    key={state.nome}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "state",
                                                            state.nome,
                                                        );
                                                        fetchCities(state.id);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {state.nome}
                                                    <Check
                                                        className={`ml-auto ${
                                                            state.nome ===
                                                            field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        }`}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DrawerContent>
                        </Drawer>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default StateField;
