"use client";

import { deleteSector } from "@/app/_actions/deleteSector";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { getSectorList } from "@/app/_data/getSector";
import { Sector } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "../ui/action-button";
import { Plus, Trash2 } from "lucide-react";
import DeleteDialog from "../delete-dialog";
import SectorDialogForm from "../sector-dialog-form";

interface DataTableSectorActionButtonsProps<TData> {
    selectedRows: Row<TData>[];
    setSectorList: (sectors: Sector[]) => void;
}

export const DataTableSectorActionButtons = <TData,>({
    selectedRows,
    setSectorList,
}: Readonly<DataTableSectorActionButtonsProps<TData>>) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();

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

            const sectors = await getSectorList();
            setSectorList(sectors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ml-20 flex gap-2">
            <TooltipProvider>
                <ActionButton
                    icon={<Plus />}
                    tooltipText="Criar Novo Setor"
                    onClick={() => setFormDialogOpen(true)}
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
            <SectorDialogForm
                isOpen={formDialogOpen}
                setIsOpen={setFormDialogOpen}
            />
        </div>
    );
};
