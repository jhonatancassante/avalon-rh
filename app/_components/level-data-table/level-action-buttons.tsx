"use client";

import { deleteLevel } from "@/app/_actions/deleteLevel";
import { useLevels } from "@/app/_contexts/LevelContext";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { Level } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "../ui/action-button";
import { ArrowBigLeft, Plus, Trash2 } from "lucide-react";
import DeleteDialog from "../delete-dialog";

interface DataTableLevelActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    onActionCompleted: () => Promise<void>;
}

export const DataTableLevelActionButtons = <TData,>({
    selectedRows,
    onActionCompleted,
}: Readonly<DataTableLevelActionButtonsProps<TData>>) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const { setFormDialog } = useLevels();
    const router = useRouter();

    const handleReturn = () => {
        router.back();
    };

    const handleDeleteDialogOpen = () => {
        if (selectedRows.length === 0) return;
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (selectedRows.length === 0) return;
        setIsLoading(true);
        try {
            await Promise.all(
                selectedRows.map(async (row) => {
                    const level = row.original as Level;
                    await deleteLevel(level.id);
                    row.toggleSelected();
                }),
            );

            await onActionCompleted();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center gap-2">
            <TooltipProvider>
                <ActionButton
                    icon={<ArrowBigLeft />}
                    tooltipText="Voltar a Página Anterior"
                    onClick={handleReturn}
                />
                <ActionButton
                    icon={<Plus />}
                    tooltipText="Criar Novo Setor"
                    onClick={() => setFormDialog(true)}
                />
                <ActionButton
                    icon={<Trash2 />}
                    tooltipText="Deletar"
                    onClick={handleDeleteDialogOpen}
                />
            </TooltipProvider>
            <DeleteDialog
                itemType="setor"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </div>
    );
};
