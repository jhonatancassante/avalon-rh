import { useState, useCallback } from "react";
import { Path, UseFormReturn } from "react-hook-form";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { z } from "zod";

interface State {
    id: number;
    nome: string;
}

interface City {
    nome: string;
}

export const useLocations = <T extends z.ZodObject<z.ZodRawShape>>(
    form: UseFormReturn<z.infer<T>>,
) => {
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const { setIsLoading } = useLoading();

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
                (state: State) =>
                    state.nome === form.getValues("state" as Path<z.infer<T>>),
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

    return {
        states,
        cities,
        fetchCities,
        fetchStates,
    };
};
