"use client";

import { DataTable } from "../data-table/data-table";
import { DataTableSectorActionButtons } from "./sector-action-buttons";
import { columnsNames, sectorColumns } from "./sector-columns";
import SectorDialogForm from "../sector-dialog-form";
import { useSectors } from "@/app/_contexts/SectorContext";

const SectorDataTable = () => {
    const {
        sectorList,
        sector,
        isLoading,
        formDialog,
        setFormDialog,
        refreshSectors,
    } = useSectors();

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
                            onActionCompleted={refreshSectors}
                        />
                    }
                />
                <SectorDialogForm
                    key={sector?.id ?? "new-sector"}
                    sector={sector}
                    isOpen={formDialog}
                    setIsOpen={setFormDialog}
                    refreshList={refreshSectors}
                />
            </div>
        </main>
    );
};

export default SectorDataTable;
