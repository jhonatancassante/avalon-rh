"use client";

import { deleteSector } from "@/app/_actions/deleteSector";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { Sector } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import DeleteDialog from "../delete-dialog";
import { useSectors } from "@/app/_contexts/SectorContext";

interface SectorRowActionsProps {
    sector: Sector;
}

const SectorRowActions = ({ sector }: SectorRowActionsProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const { setSector, setFormDialog, refreshSectors } = useSectors();

    const handleEditEvent = async () => {
        setIsLoading(true);
        setSector(sector);

        await new Promise((resolve) => setTimeout(resolve, 50));

        setFormDialog(true);
        setIsLoading(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteSector(sector.id);
        await refreshSectors();
        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button onClick={handleEditEvent}>
                    <Edit />
                </Button>
                <Button onClick={() => setDeleteDialogOpen(true)}>
                    <Trash2 />
                </Button>
            </div>
            <DeleteDialog
                itemType="setor"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default SectorRowActions;
