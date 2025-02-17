import { useCallback, useEffect, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
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
import { useMediaQuery } from "@react-hook/media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "../../ui/drawer";
import { useLoading } from "@/app/_contexts/LoadingContext";

interface LocationsFieldsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

interface State {
    id: number;
    nome: string;
}

interface City {
    nome: string;
}

const LocationsFields = ({ form }: LocationsFieldsProps) => {
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [states, setStates] = useState<State[]>([]);
    const [citys, setCitys] = useState<City[]>([]);
    const { setIsLoading } = useLoading();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const fetchCitys = useCallback(
        async (stateId: number) => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
                );
                const data = await response.json();

                const sortedCitys = data.sort((a: City, b: City) =>
                    a.nome.localeCompare(b.nome),
                );

                setCitys(sortedCitys);
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading],
    );

    const fetchStates = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
            );
            const data = await response.json();

            const sortedStates = data.sort((a: State, b: State) =>
                a.nome.localeCompare(b.nome),
            );

            setStates(sortedStates);

            if (form.getValues("state")) {
                const selectedState = sortedStates.find(
                    (sortedState: State) =>
                        sortedState.nome === form.getValues("state"),
                );

                if (selectedState) {
                    fetchCitys(selectedState.id);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [form, fetchCitys, setIsLoading]);

    useEffect(() => {
        fetchStates();
    }, [fetchStates]);

    return (
        <>
            {isDesktop ? (
                <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
                    {/* States Field Desktop */}
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Estado</FormLabel>
                                <Popover
                                    open={isStateOpen}
                                    onOpenChange={setIsStateOpen}
                                >
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
                                                                fetchCitys(
                                                                    state.id,
                                                                );
                                                                setIsStateOpen(
                                                                    false,
                                                                );
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Citys Field Desktop */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Cidade</FormLabel>
                                <Popover
                                    open={isCityOpen}
                                    onOpenChange={setIsCityOpen}
                                >
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
                                                    ? citys.find(
                                                          (city) =>
                                                              city.nome ===
                                                              field.value,
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
                                                    {citys.map((city) => (
                                                        <CommandItem
                                                            value={city.nome}
                                                            key={city.nome}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "city",
                                                                    city.nome,
                                                                );
                                                                setIsCityOpen(
                                                                    false,
                                                                );
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ) : (
                <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
                    {/* States Field Mobile */}
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Estado</FormLabel>
                                <Drawer
                                    open={isStateOpen}
                                    onOpenChange={setIsStateOpen}
                                >
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
                                                                fetchCitys(
                                                                    state.id,
                                                                );
                                                                setIsStateOpen(
                                                                    false,
                                                                );
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Citys Field Mobile */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Cidade</FormLabel>
                                <Drawer
                                    open={isCityOpen}
                                    onOpenChange={setIsCityOpen}
                                >
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
                                                    ? citys.find(
                                                          (city) =>
                                                              city.nome ===
                                                              field.value,
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
                                                    {citys.map((city) => (
                                                        <CommandItem
                                                            value={city.nome}
                                                            key={city.nome}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "city",
                                                                    city.nome,
                                                                );
                                                                setIsCityOpen(
                                                                    false,
                                                                );
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}
        </>
    );
};

export default LocationsFields;
