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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { FormFields } from "../form-fields/form-fields";
import { FormActions } from "../form-fields/form-actions";
import { editLevelFields } from "@/app/_constants/editLevelFields";
import { Checkbox } from "../ui/checkbox";

interface LevelDialogFormProps {
    level?: Level | null;
    isOpenDialogForm: boolean;
    setLevel: (level: Level | null) => void;
    setIsOpenDialogForm: (isOpen: boolean) => void;
    refreshList: () => Promise<void>;
}

const LevelDialogForm = ({
    level,
    isOpenDialogForm,
    setLevel,
    setIsOpenDialogForm,
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
            setIsOpenDialogForm(false);
            setIsLoading(false);
        }
    };

    const handleExit = () => {
        form.reset();
        setLevel(null);
        setIsOpenDialogForm(false);
    };

    return (
        <Dialog open={isOpenDialogForm} onOpenChange={setIsOpenDialogForm}>
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
                        <FormField
                            control={form.control}
                            name="isLcaApply"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Aplicar Avaliação de Capacidade de
                                            Liderança (ACL)?
                                        </FormLabel>
                                        <FormDescription>
                                            Selecione este campo caso o nível
                                            deve ser aplicado a ACL
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
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
