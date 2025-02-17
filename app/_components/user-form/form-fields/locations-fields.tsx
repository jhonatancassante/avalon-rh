import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useMediaQuery } from "@react-hook/media-query";
import StateField from "./state-field";
import CityField from "./city-field";

interface State {
    id: number;
    nome: string;
}

interface City {
    nome: string;
}

interface LocationsFieldsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

const LocationsFields = ({ form }: LocationsFieldsProps) => {
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const { setIsLoading } = useLoading();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const fetchCities = useCallback(
        async (stateId: number) => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
                );
                const data = await response.json();
                const sortedCities = data.sort((a: City, b: City) =>
                    a.nome.localeCompare(b.nome),
                );
                setCities(sortedCities);
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

            const selectedState = sortedStates.find(
                (state: State) => state.nome === form.getValues("state"),
            );
            if (selectedState) {
                fetchCities(selectedState.id);
            }
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [form, fetchCities, setIsLoading]);

    useEffect(() => {
        fetchStates();
    }, [fetchStates]);

    return (
        <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
            <StateField
                form={form}
                states={states}
                isDesktop={isDesktop}
                fetchCities={fetchCities}
            />
            <CityField form={form} cities={cities} isDesktop={isDesktop} />
        </div>
    );
};

export default LocationsFields;
