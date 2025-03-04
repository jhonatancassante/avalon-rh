import { Sector } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useLoading } from "../_contexts/LoadingContext";
import { useSectorForm } from "../_hooks/useSectorForm";
import { z } from "zod";
import { sectorFormSchema } from "../_schemas/formSchema";
import { updateOrCreateSector } from "../_actions/updateSector";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { FormFields } from "./form-fields/form-fields";
import { editSectorFields } from "../_constants/editSectorFields";
import { FormActions } from "./form-fields/form-actions";

interface SectorDialogFormProps {
    sector?: Sector | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refreshList: () => Promise<void>;
}

const SectorDialogForm = ({
    sector,
    isOpen,
    setIsOpen,
    refreshList,
}: SectorDialogFormProps) => {
    const { setIsLoading } = useLoading();
    const form = useSectorForm({ sector });
    const formType = sector ? "Editar" : "Adicionar Novo";

    const onSubmit = async (values: z.infer<typeof sectorFormSchema>) => {
        setIsLoading(true);
        try {
            const updateData = {
                ...values,
            };

            await updateOrCreateSector(sector?.id ?? "", updateData);

            await refreshList();

            toast.success("Sucesso!", {
                description: `Setor ${sector ? "atualizado" : "criado"} com sucesso!`,
            });

            form.reset();
        } catch (error) {
            console.error(
                `Erro ao ${sector ? "atualizar" : "criar"} setor: ${error}`,
            );
            toast.error("Erro!", {
                description: `Erro ao ${sector ? "atualizar" : "criar"} setor.`,
            });
        } finally {
            setIsOpen(false);
            setIsLoading(false);
        }
    };

    const handleExit = () => {
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
                            formSchema={sectorFormSchema}
                            editFields={editSectorFields}
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

export default SectorDialogForm;
