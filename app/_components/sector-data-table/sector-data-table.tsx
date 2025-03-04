"use client";

import { PATHS } from "@/app/_constants/paths";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { getSectorList } from "@/app/_data/getSector";
import { Sector } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "../data-table/data-table";
import { DataTableSectorActionButtons } from "./sector-action-buttons";
import { columnsNames, sectorColumns } from "./sector-columns";

const SectorDataTable = () => {
    const [sectorList, setSectorList] = useState<Sector[]>([]);
    const router = useRouter();
    const { isLoading, setIsLoading } = useLoading();

    const fetchSectors = useCallback(async () => {
        try {
            setIsLoading(true);

            const sectors = await getSectorList();

            if (sectors.length === 0) {
                return <h1>Nenhum setor encontrado!</h1>;
            }

            setSectorList(sectors);
        } catch (error) {
            console.error(error);
            router.push(PATHS.ERROR_500);
        } finally {
            setIsLoading(false);
        }
    }, [router, setSectorList, setIsLoading]);

    useEffect(() => {
        fetchSectors();
    }, [fetchSectors]);

    return (
        <main className="flex flex-col items-center py-6">
            <h1 className="text-2xl font-bold">Lista de Setores</h1>
            <div className="mt-6 w-[70%]">
                <DataTable
                    columns={sectorColumns}
                    itemList={sectorList}
                    isLoading={isLoading}
                    columnsNames={columnsNames}
                    actionButtons={
                        <DataTableSectorActionButtons
                            selectedRows={[]}
                            setSectorList={setSectorList}
                        />
                    }
                />
            </div>
        </main>
    );
};

export default SectorDataTable;
