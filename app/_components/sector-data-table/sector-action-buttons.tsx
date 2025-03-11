"use client";

import { deleteSector } from "@/app/_actions/deleteSector";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { Sector } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "../ui/action-button";
import { ArrowBigLeft, Plus, Trash2 } from "lucide-react";
import DeleteDialog from "../delete-dialog";
import { useSectors } from "@/app/_contexts/SectorContext";
import { useRouter } from "next/navigation";

interface DataTableSectorActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    onActionCompleted: () => Promise<void>;
}

export const DataTableSectorActionButtons = <TData,>({
    selectedRows,
    onActionCompleted,
}: Readonly<DataTableSectorActionButtonsProps<TData>>) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const { setFormDialog } = useSectors();
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
                    const sector = row.original as Sector;
                    await deleteSector(sector.id);
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
