import { Dispatch, SetStateAction } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

interface DeleteDialogProps {
    isOpen: boolean;
    idEvent: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onDelete: (idEvent: string) => void;
}

const DeleteDialog = ({
    isOpen,
    idEvent,
    setIsOpen,
    onDelete,
}: DeleteDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá
                        permanentemente o evento e todos os dados associados a
                        ele.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onDelete(idEvent);
                        }}
                    >
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
