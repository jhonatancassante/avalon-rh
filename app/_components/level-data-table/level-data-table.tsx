"use client";

import { useLevels } from "@/app/_contexts/LevelContext";
import { DataTable } from "../data-table/data-table";
import { columnsNames, levelColumns } from "./level-columns";
import { DataTableLevelActionButtons } from "./level-action-buttons";
import LevelDialogForm from "./level-dialog-from";

const LevelDataTable = () => {
    const {
        levelList,
        level,
        isLoading,
        formDialog,
        setLevel,
        setFormDialog,
        refreshLevels,
    } = useLevels();

    return (
        <main className="flex flex-col items-center py-6">
            <h1 className="text-2xl font-bold">Lista de Níveis</h1>
            <div className="mt-6 w-[70%]">
                <DataTable
                    columns={levelColumns}
                    itemList={levelList}
                    isLoading={isLoading}
                    columnsNames={columnsNames}
                    actionButtons={
                        <DataTableLevelActionButtons
                            selectedRows={[]}
                            onActionCompleted={refreshLevels}
                        />
                    }
                />
                <LevelDialogForm
                    key={level?.id ?? "new-level"}
                    level={level}
                    setLevel={setLevel}
                    isOpen={formDialog}
                    setIsOpen={setFormDialog}
                    refreshList={refreshLevels}
                />
            </div>
        </main>
    );
};

export default LevelDataTable;
