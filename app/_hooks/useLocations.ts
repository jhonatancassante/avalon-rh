import { useState, useCallback, useMemo } from "react";
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
    const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
    const [loadingCities, setLoadingCities] = useState(false);
    const { setIsLoading } = useLoading();

    const fetchCities = useCallback(
        async (stateId: number) => {
            try {
                setLoadingCities(true);
                const response = await fetch(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
                );
                const data = await response.json();
                const sortedCities = data.sort((a: City, b: City) =>
                    a.nome.localeCompare(b.nome),
                );

                await new Promise((resolve) => setTimeout(resolve, 300));

                setCities(sortedCities);
                setSelectedStateId(stateId);

                const currentCity = form.getValues("city" as Path<z.infer<T>>);
                if (
                    currentCity &&
                    !sortedCities.some((c: City) => c.nome === currentCity)
                ) {
                    form.setValue("city" as Path<z.infer<T>>, "" as never);
                }
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
            } finally {
                setLoadingCities(false);
            }
        },
        [form],
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

            const currentState = form.getValues("state" as Path<z.infer<T>>);
            const initialState = sortedStates.find(
                (state: State) => state.nome === currentState,
            );

            if (initialState) {
                await fetchCities(initialState.id);
            }
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [form, fetchCities, setIsLoading]);

    const memoizedStates = useMemo(() => states, [states]);
    const memoizedCities = useMemo(() => cities, [cities]);

    return {
        states: memoizedStates,
        cities: memoizedCities,
        fetchCities,
        fetchStates,
        selectedStateId,
        loadingCities,
    };
};
