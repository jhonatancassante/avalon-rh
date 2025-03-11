"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { z, ZodTypeAny } from "zod";
import { Control } from "react-hook-form";
import { getSectorList } from "@/app/_data/getSector";
import { CheckboxList } from "../ui/checkbox-list";
import { PATHS } from "@/app/_constants/paths";
import Link from "next/link";

interface EventSectorSelectionProps<T extends ZodTypeAny> {
    control: Control<z.infer<T>>;
}

type SectorWithLeader = {
    id: string;
    name: string;
    leader: {
        profile: {
            socialName: string;
        } | null;
    } | null;
};

const EventSectorSelection = <T extends ZodTypeAny>({
    control,
}: EventSectorSelectionProps<T>) => {
    const [sectorList, setSectorList] = useState<SectorWithLeader[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSectors = useCallback(async () => {
        try {
            setIsLoading(true);
            const sectors = await getSectorList();
            setSectorList(sectors);
        } catch (error) {
            console.error("Erro ao buscar setores:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSectors();
    }, [fetchSectors]);

    const getLeaderName = (sector: SectorWithLeader) => {
        return sector.leader?.profile?.socialName ?? "Sem líder definido";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Setores do Evento</CardTitle>
                <CardDescription>
                    Selecione quais setores estarão disponíveis no evento e os
                    seus respectivos líderes. Caso precise alterar os líderes
                    dos setores, clique <Link href={PATHS.SECTORS}>aqui</Link> e
                    depois retorne para cadastrar o evento.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Carregando setores...</div>
                ) : (
                    <CheckboxList
                        control={control}
                        name="eventSectors"
                        label="Setores selecionados"
                        items={sectorList.map((sector) => ({
                            label: `${sector.name} - ${getLeaderName(sector)}`,
                            value: sector.id,
                        }))}
                        tooltipMsg="Selecione os setores que participarão do evento"
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default EventSectorSelection;
