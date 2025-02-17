"use client";

import { Form } from "@/app/_components/ui/form";
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
        console.log(values);
        console.log(photoData);
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
                    isPcd: values.isPcd ?? false,
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
                    <UserFormFields
                        form={form}
                        control={form.control}
                        handleFileUpload={handleFileUpload}
                        photoData={photoData}
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
