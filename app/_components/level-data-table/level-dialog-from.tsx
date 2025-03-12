import { updateOrCreateLevel } from "@/app/_actions/updateLevel";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useLevelForm } from "@/app/_hooks/useLevelForm";
import { levelFormSchema } from "@/app/_schemas/formSchema";
import { Level } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { FormFields } from "../form-fields/form-fields";
import { FormActions } from "../form-fields/form-actions";
import { editLevelFields } from "@/app/_constants/editLevelFields";

interface LevelDialogFormProps {
    level?: Level | null;
    isOpen: boolean;
    setLevel: (level: Level | null) => void;
    setIsOpen: (isOpen: boolean) => void;
    refreshList: () => Promise<void>;
}

const LevelDialogForm = ({
    level,
    isOpen,
    setLevel,
    setIsOpen,
    refreshList,
}: LevelDialogFormProps) => {
    const { setIsLoading } = useLoading();
    const form = useLevelForm({ level });
    const formType = level ? "Editar" : "Adicionar Novo";

    const onSubmit = async (values: z.infer<typeof levelFormSchema>) => {
        setIsLoading(true);
        try {
            const updateData = {
                ...values,
            };

            await updateOrCreateLevel(level?.id ?? "", updateData);

            await refreshList();

            toast.success("Sucesso!", {
                description: `Setor ${level ? "atualizado" : "criado"} com sucesso!`,
            });

            form.reset();
            setLevel(null);
        } catch (error) {
            console.error(
                `Erro ao ${level ? "atualizar" : "criar"} setor: ${error}`,
            );
            toast.error("Erro!", {
                description: `Erro ao ${level ? "atualizar" : "criar"} setor.`,
            });
        } finally {
            setIsOpen(false);
            setIsLoading(false);
        }
    };

    const handleExit = () => {
        form.reset();
        setLevel(null);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{`${formType} Setor`}</DialogTitle>
                    <DialogDescription>
                        {`Preencha o formulário para ${formType} setor`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormFields
                            control={form.control}
                            formSchema={levelFormSchema}
                            editFields={editLevelFields}
                        />
                        <DialogFooter>
                            <FormActions onExit={handleExit} />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default LevelDialogForm;
