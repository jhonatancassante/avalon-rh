"use client";

import { Form } from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { UserComplete } from "../../_types/userComplete";
import { UpdateUser } from "../../_types/updateUser";
import { updateUser } from "../../_actions/updateUser";
import { useUserForm } from "@/app/_hooks/useUserForm";
import { useFileUpload } from "@/app/_hooks/useFileUpload";
import { formSchema } from "@/app/_schemas/formSchema";
import { z } from "zod";
import { UserFormFields } from "./user-form-fields";
import { UserFormActions } from "./user-form-actions";
import CpfField from "./form-fields/cpf-field";
import PronounField from "./form-fields/pronoun-field";
import PhoneField from "./form-fields/phone-field";
import LocationsFields from "./form-fields/locations-fields";
import PcdFields from "./form-fields/pcd-fields";
import PhotoField from "./form-fields/photo-field";
import { useLoading } from "@/app/_contexts/LoadingContext";

const UserEditForm = ({ user }: UserComplete) => {
    const { update } = useSession();
    const router = useRouter();
    const { photoData, handleFileUpload } = useFileUpload();
    const { setIsLoading } = useLoading();
    const form = useUserForm({ user });
    const isAtctiveSaveButton =
        form.formState.isValid && (photoData !== null || user.isComplete);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
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
            router.replace(`/pages/user/${user.id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CpfField control={form.control} />
                <PronounField control={form.control} />
                <UserFormFields control={form.control} />
                <PhoneField control={form.control} />
                <LocationsFields form={form} />
                <PcdFields control={form.control} />
                <PhotoField
                    control={form.control}
                    handleFileUpload={handleFileUpload}
                    photoData={photoData}
                    isComplete={user.isComplete}
                />

                <UserFormActions
                    isActive={isAtctiveSaveButton}
                    isComplete={user.isComplete}
                    onExit={handleExit}
                />
            </form>
        </Form>
    );
};

export default UserEditForm;
