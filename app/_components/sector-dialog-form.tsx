import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SectorDialogFormProps {
    isOpen: boolean;
    edit?: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SectorDialogForm = ({
    isOpen,
    edit = false,
    setIsOpen,
}: SectorDialogFormProps) => {
    const formType = edit ? "Editar" : "Adicionar Novo";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{`${formType} Setor`}</DialogTitle>
                    <DialogDescription>
                        {`Preencha o formulário para ${formType} setor`}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Digite o nome do setor."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"outline"}>Fechar</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button type="submit">Salvar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SectorDialogForm;
