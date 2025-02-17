import { Control, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/app/_components/ui/input";
import FormTooltip from "@/app/_components/user-form/user-form-tooltip";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/app/_components/ui/form";
import { editUserFields } from "../../_constants/editUserFields";
import formatCPF from "../../_utils/formatCPF";
import formatPhone from "../../_utils/formatPhone";
import { formSchema } from "@/app/_schemas/formSchema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Pronouns } from "@/app/_constants/pronouns";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { UpdatePhoto } from "@/app/_types/updatePhoto";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { cn } from "@/app/_lib/utils";
import { useEffect, useState } from "react";

interface State {
    id: number;
    nome: string;
}

interface City {
    nome: string;
}

interface UserFormFieldsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    control: Control<z.infer<typeof formSchema>>;
    handleFileUpload: (file: File) => void;
    photoData: UpdatePhoto | null;
}

export const UserFormFields = ({
    form,
    control,
    handleFileUpload,
    photoData,
}: UserFormFieldsProps) => {
    const isPcd = useWatch({ control, name: "isPcd" });
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [states, setStates] = useState<State[]>([]);
    const [citys, setCitys] = useState<City[]>([]);

    const fetchStates = async () => {
        try {
            const response = await fetch(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
            );
            const data = await response.json();

            const sortedStates = data.sort((a: State, b: State) =>
                a.nome.localeCompare(b.nome),
            );

            setStates(sortedStates);
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        }
    };

    const fetchCitys = async (stateId: number) => {
        try {
            const response = await fetch(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
            );
            const data = await response.json();

            const sortedCitys = data.sort((a: State, b: State) =>
                a.nome.localeCompare(b.nome),
            );

            setCitys(sortedCitys);
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    return (
        <>
            <FormField
                control={control}
                name="cpf"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex gap-2">
                            CPF
                            <FormTooltip msg="Digite somente os números." />
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o CPF"
                                {...field}
                                onChange={(e) => {
                                    const formattedValue = formatCPF(
                                        e.target.value,
                                    );
                                    field.onChange(formattedValue);
                                }}
                                value={field.value || ""}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="pronoun"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pronome</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione seu pronome" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Pronouns.map((pronoun) => {
                                    return (
                                        <SelectItem
                                            key={pronoun}
                                            value={pronoun}
                                        >
                                            {pronoun}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {editUserFields.map((formField, index) => (
                <FormField
                    key={`${index} - ${formField.name}`}
                    control={control}
                    name={formField.name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                {formField.label}
                                <FormTooltip msg={formField.tooltip} />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type={formField.type}
                                    placeholder={formField.placeholder}
                                    {...field}
                                    disabled={formField.disabled}
                                    value={(() => {
                                        if (typeof field.value === "boolean") {
                                            return field.value.toString();
                                        } else if (
                                            field.value instanceof File
                                        ) {
                                            return undefined;
                                        } else {
                                            return field.value ?? "";
                                        }
                                    })()}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex gap-2">
                            Celular / Whatsapp
                            <FormTooltip msg="Digite seu número de celular que utiliza Whatsapp. Somente os números!" />
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o celular"
                                {...field}
                                onChange={(e) => {
                                    const formattedValue = formatPhone(
                                        e.target.value,
                                    );
                                    field.onChange(formattedValue);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Estado</FormLabel>
                        <Popover
                            open={isStateOpen}
                            onOpenChange={setIsStateOpen}
                        >
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
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
                            <PopoverContent className="w-full p-0">
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
                                                        fetchCitys(state.id);
                                                        setIsStateOpen(false);
                                                    }}
                                                >
                                                    {state.nome}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            state.nome ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        )}
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

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Cidade</FormLabel>
                        <Popover open={isCityOpen} onOpenChange={setIsCityOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        {field.value
                                            ? citys.find(
                                                  (city) =>
                                                      city.nome === field.value,
                                              )?.nome
                                            : "Selecione a cidade"}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
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
                                                        setIsCityOpen(false);
                                                    }}
                                                >
                                                    {city.nome}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            city.nome ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        )}
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

            <FormField
                control={control}
                name="isPcd"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                defaultChecked={false}
                            />
                        </FormControl>
                        <div className="flex items-center gap-2 space-y-1 leading-none">
                            <FormLabel>É Portador de Deficiencia?</FormLabel>
                            <FormTooltip msg="Marque aqui caso tenha alguma deficiência." />
                        </div>
                    </FormItem>
                )}
            />

            {isPcd && (
                <FormField
                    control={control}
                    name={"deficiency"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Qual sua deficiência?
                                <FormTooltip msg="Descreva aqui qual sua deficiência." />
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Digite sua deficiência"
                                    {...field}
                                    rows={5} // Define 5 linhas
                                    className="resize-none" // Impede o redimensionamento
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {isPcd && (
                <FormField
                    control={control}
                    name={"extraSupport"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Precisa de algum auxílio específico?
                                <FormTooltip msg="Descreva aqui se precisa de algum auxílio para executar os trabalhos. " />
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva caso precise de algum auxílio"
                                    {...field}
                                    rows={5} // Define 5 linhas
                                    className="resize-none" // Impede o redimensionamento
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            <FormField
                control={control}
                name="photo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex gap-2">
                            Foto de Perfil
                            <FormTooltip msg="Selecione uma foto de perfil. O arquivo deve ter no máximo 1MB e as dimensões devem ser entre 500x500 e 3036x3036." />
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="photo-field"
                                type="file"
                                accept="image/jpeg, image/jpg"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleFileUpload(file); // Chama a função de upload
                                        field.onChange(file); // Atualiza o valor do campo
                                    }
                                }}
                                required={!photoData} // Obrigatório se não houver foto
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
