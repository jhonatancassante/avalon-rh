"use client";

import { Form } from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { UserComplete } from "../../_types/userComplete";
import UpdateUser from "../../_types/UpdateUser";
import { updateUser } from "../../_actions/updateUser";
import { useUserForm } from "@/app/_hooks/useUserForm";
import { useFileUpload } from "@/app/_hooks/useFileUpload";
import { z } from "zod";
import { FormFields } from "../form-fields/form-fields";
import { FormActions } from "../form-fields/form-actions";
import CpfField from "../form-fields/cpf-field";
import PronounField from "../form-fields/pronoun-field";
import PhoneField from "../form-fields/phone-field";
import LocationsFields from "../form-fields/locations-fields";
import PhotoField from "../form-fields/photo-field";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { PcdFields } from "../form-fields/pcd-fields";
import { PATHS } from "@/app/_constants/paths";
import { userFormSchema } from "@/app/_schemas/formSchema";
import { editUserFields } from "@/app/_constants/editUserFields";
import dateToIso from "@/app/_utils/dateToIso";

interface UserEditFormProps {
    user: UserComplete;
}

const UserEditForm = ({ user }: UserEditFormProps) => {
    const { update } = useSession();
    const router = useRouter();
    const { photoData, handleFileUpload } = useFileUpload();
    const { setIsLoading } = useLoading();
    const form = useUserForm({ user });
    const isActiveSaveButton =
        form.formState.isValid && (photoData !== null || user.isComplete);

    const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
        setIsLoading(true);
        try {
            const birthdateIso = dateToIso(values.birthdate);

            const updateData: UpdateUser = {
                isComplete: true,
                profile: {
                    ...values,
                    cpf: values.cpf.replace(/\D/g, ""),
                    birthdate: birthdateIso,
                    isPcd: values.isPcd ?? false,
                    deficiency:
                        values?.deficiency && values.isPcd
                            ? values.deficiency
                            : [],
                    extraSupport:
                        values.extraSupport && values.isPcd
                            ? values.extraSupport
                            : [],
                },
                photo: photoData || undefined,
            };

            await updateUser(user.id, updateData);
            await update({ user: updateData });

            toast.success("Sucesso!", {
                description: "Usuário atualizado com sucesso!",
            });

            router.push(`${PATHS.USER}/${user.id}`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            toast.error("Erro!", {
                description: `Erro ao atualizar o usuário. Tente novamente mais tarde!`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleExit = async () => {
        try {
            setIsLoading(true);
            if (!user.isComplete) return await signOut();
            router.push(`${PATHS.USER}/${user.id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CpfField<typeof userFormSchema> control={form.control} />
                <PronounField<typeof userFormSchema> control={form.control} />
                <FormFields
                    control={form.control}
                    formSchema={userFormSchema}
                    editFields={editUserFields}
                />
                <PhoneField<typeof userFormSchema> control={form.control} />
                <LocationsFields<typeof userFormSchema> form={form} />
                <PcdFields<typeof userFormSchema> control={form.control} />
                <PhotoField<typeof userFormSchema>
                    control={form.control}
                    handleFileUpload={handleFileUpload}
                    photoData={photoData}
                    isComplete={user.isComplete}
                />

                <FormActions
                    isActive={isActiveSaveButton}
                    isComplete={user.isComplete}
                    onExit={handleExit}
                />
            </form>
        </Form>
    );
};

export default UserEditForm;
