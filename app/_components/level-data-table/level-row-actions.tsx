"use client";

import { deleteLevel } from "@/app/_actions/deleteLevel";
import { useLevels } from "@/app/_contexts/LevelContext";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { Level } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Edit, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import DeleteDialog from "../delete-dialog";
import { updateIsLcaApplyLevel } from "@/app/_actions/updateLevel";

interface LevelRowActionsProps {
    level: Level;
}

const LevelRowActions = ({ level }: LevelRowActionsProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { setIsLoading } = useLoading();
    const { setLevel, setFormDialog, refreshLevels } = useLevels();

    const handleEditEvent = async () => {
        setIsLoading(true);
        setLevel(level);

        await new Promise((resolve) => setTimeout(resolve, 50));

        setFormDialog(true);
        setIsLoading(false);
    };

    const handleIsLcaApplyToggle = async () => {
        setIsLoading(true);
        await updateIsLcaApplyLevel(level.id, !level.isLcaApply);
        await refreshLevels();
        setIsLoading(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteLevel(level.id);
        await refreshLevels();
        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <Button
                    onClick={handleIsLcaApplyToggle}
                    className="flex h-7 w-7 items-center justify-center rounded-full p-0"
                    variant={level.isLcaApply ? "default" : "outline"}
                >
                    {level.isLcaApply ? <ToggleLeft /> : <ToggleRight />}
                </Button>
                <Button
                    onClick={handleEditEvent}
                    className="flex h-7 w-7 items-center justify-center rounded-full p-0"
                    variant={"outline"}
                >
                    <Edit />
                </Button>
                <Button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="flex h-7 w-7 items-center justify-center rounded-full p-0"
                    variant={"outline"}
                >
                    <Trash2 />
                </Button>
            </div>
            <DeleteDialog
                itemType="nível"
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default LevelRowActions;
