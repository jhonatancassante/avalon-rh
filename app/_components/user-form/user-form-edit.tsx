"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { UserComplete } from "../../_types/userComplete";
import { UpdateUser } from "../../_types/updateUser";
import { updateUser } from "../../_actions/updateUser";
import LoadingIndicator from "../loading-indicator";
import { useUserForm } from "@/app/_hooks/useUserForm";
import { useFileUpload } from "@/app/_hooks/useFileUpload";
import { formSchema } from "@/app/_schemas/formSchema";
import { z } from "zod";
import { UserFormFields } from "./user-form-fields";
import FormTooltip from "./user-form-tooltip";
import { Input } from "../ui/input";
import { UserFormActions } from "./user-form-actions";
import { useEffect, useState } from "react";

const UserEditForm = ({ user }: UserComplete) => {
    const { update } = useSession();
    const router = useRouter();
    const { photoData, loading, handleFileUpload } = useFileUpload();
    const [loadingPage, setLoadingPage] = useState(false);
    const form = useUserForm({ user });
    const isAtctiveSaveButton =
        form.formState.isValid && (photoData !== null || user.isComplete);

    useEffect(() => {
        setLoadingPage(loading);
    }, [loading]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoadingPage(true);
        try {
            const [year, month, day] = values.birthdate.split("-");
            const birthdateIso = new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
            );

            const updateData: UpdateUser = {
                isComplete: true,
                profile: {
                    ...values,
                    cpf: values.cpf.replace(/\D/g, ""),
                    birthdate: birthdateIso,
                },
                photo: photoData || undefined,
            };

            await updateUser(user.id, updateData);
            await update({ user: updateData });

            toast.success("Sucesso!", {
                description: "Usuário atualizado com sucesso!",
            });

            router.replace(`/pages/user/${user.id}`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            toast.error("Erro!", {
                description: `Erro ao atualizar o usuário. Tente novamente mais tarde!\nMensagem de erro: ${error}`,
            });
        }
    };

    const handleExit = () => {
        setLoadingPage(true);
        if (!user.isComplete) return signOut();
        router.replace(`/pages/user/${user.id}`);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <UserFormFields control={form.control} />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    Foto de Perfil
                                    <FormTooltip msg="Selecione uma foto de perfil. O arquivo deve ter no máximo 1MB e as dimensões devem ser entre 500x500 e 3036x3036." />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="photo-field"
                                        type="file"
                                        accept="image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleFileUpload(file);
                                                form.setValue("photo", file);
                                            }
                                        }}
                                        required={!user.isComplete}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <UserFormActions
                        loading={loadingPage}
                        isActive={isAtctiveSaveButton}
                        isComplete={user.isComplete}
                        onExit={handleExit}
                    />
                </form>
            </Form>
            {loadingPage && <LoadingIndicator />}
        </>
    );
};

export default UserEditForm;
