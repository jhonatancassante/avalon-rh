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

interface CityFieldProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    cities: { nome: string }[];
    isDesktop: boolean;
}

const CityField = ({ form, cities, isDesktop }: CityFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel>Cidade</FormLabel>
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
                                            ? cities.find(
                                                  (city) =>
                                                      city.nome === field.value,
                                              )?.nome
                                            : "Selecione a cidade"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Procure a cidade..."
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            Nenhuma cidade encontrada.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {cities.map((city) => (
                                                <CommandItem
                                                    value={city.nome}
                                                    key={city.nome}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "city",
                                                            city.nome,
                                                        );
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {city.nome}
                                                    <Check
                                                        className={`ml-auto ${
                                                            city.nome ===
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
                                            ? cities.find(
                                                  (city) =>
                                                      city.nome === field.value,
                                              )?.nome
                                            : "Selecione a cidade"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </DrawerTrigger>
                            <DrawerContent>
                                <Command>
                                    <CommandInput
                                        placeholder="Procure a cidade..."
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            Nenhuma cidade encontrada.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {cities.map((city) => (
                                                <CommandItem
                                                    value={city.nome}
                                                    key={city.nome}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "city",
                                                            city.nome,
                                                        );
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {city.nome}
                                                    <Check
                                                        className={`ml-auto ${
                                                            city.nome ===
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

export default CityField;
