"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import FormTooltip from "@/app/_components/form-tooltip";
import formatCPF from "@/app/_utils/formatCPF";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { formSchema } from "../_schemas/formSchema";
import { updateUser } from "../_actions/updateUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editUserFields } from "../_constants/editUserFields";
import formatPhone from "../_utils/formatPhone";
import { useState } from "react";
import { UserComplete } from "../_types/userComplete";
import { UpdateUser } from "../_types/updateUser";
import { UpdatePhoto } from "../_types/updatePhoto";
import LoadingIndicator from "./loading-indicator";

const UserEditForm = ({ user }: UserComplete) => {
    const { update } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [photoData, setPhotoData] = useState<UpdatePhoto | null>(null);

    if (!user) {
        throw new Error("User not found!");
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: user.profile?.cpf ?? "",
            completeName: user.profile?.completeName
                ? user.profile?.completeName
                : (user.name ?? ""),
            socialName: user.profile?.socialName
                ? user.profile?.socialName
                : (user?.name ?? ""),
            nickname: user.profile?.nickname ?? "",
            contactEmail: user.profile?.contactEmail
                ? user.profile?.contactEmail
                : (user?.email ?? ""),
            phone: user.profile?.phone ?? "",
            birthdate:
                format(user.profile?.birthdate ?? new Date(), "yyyy-MM-dd", {
                    locale: ptBR,
                }).toString() ?? "",
            photo: undefined,
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = e.target.files?.[0];

        if (!file) {
            throw new Error("Nenhum arquivo selecionado.");
        }

        form.setValue("photo", file);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const { result } = await response.json();

            const photoInfos: UpdatePhoto = {
                asset_id: result.asset_id,
                display_name: result.display_name,
                height: result.height,
                public_id: result.public_id,
                url: result.url,
                width: result.width,
            };

            setPhotoData(photoInfos);

            toast.success("Sucesso!", {
                description: "Upload de foto feito com sucesso!",
            });
        } catch (error) {
            console.error(error);
            toast.error("Erro!", {
                description:
                    "Erro ao tentar fazer upload da imagem. Tente novamente mais tarde!",
            });
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
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
            photo: {
                ...photoData,
            },
        };

        try {
            await updateUser(user.id, updateData);

            await update({ user: updateData });

            toast.success("Sucesso!", {
                description: "Usuário atualizado com sucesso!",
            });

            router.replace(`/pages/user/${user.id}`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            toast.error("Erro!", {
                description:
                    "Erro ao atualizar o usuário. Tente novamente mais tarde!",
            });
        }
    };

    const handleExit = () => {
        setLoading(true);

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
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    CPF
                                    <FormTooltip msg="Digite somente os números." />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite o CPF"
                                        {...field}
                                        onChange={(e) => {
                                            const formattedValue = formatCPF(
                                                e.target.value,
                                            );
                                            field.onChange(formattedValue);
                                        }}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {editUserFields.map((formField, index) => {
                        return (
                            <FormField
                                control={form.control}
                                name={
                                    formField.name as keyof z.infer<
                                        typeof formSchema
                                    >
                                }
                                key={`${index} - ${formField.name}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-2">
                                            {formField.label}
                                            <FormTooltip
                                                msg={formField.tooltip}
                                            />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type={formField.type}
                                                placeholder={
                                                    formField.placeholder
                                                }
                                                {...field}
                                                disabled={formField.disabled}
                                                value={
                                                    field.value instanceof File
                                                        ? undefined
                                                        : field.value || ""
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        );
                    })}

                    <FormField
                        control={form.control}
                        name={"phone"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    Celular / Whatsapp
                                    <FormTooltip
                                        msg={
                                            "Digite seu número de celular que utiliza Whatsapp. Somente os números!"
                                        }
                                    />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Digite o celular"}
                                        {...field}
                                        onChange={(e) => {
                                            const formattedValue = formatPhone(
                                                e.target.value,
                                            );
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"photo"}
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex gap-2">
                                    Foto de Perfil
                                    <FormTooltip
                                        msg={
                                            "Selecione uma foto de perfil. O arquivo deve ter no máximo 1MB e as dimensões devem ser entre 500x500 e 3036x3036."
                                        }
                                    />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-around">
                        <Button
                            type="submit"
                            className="w-40"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Salvar"}
                        </Button>
                        <Button
                            type={"button"}
                            onClick={handleExit}
                            className="w-40"
                            disabled={loading}
                        >
                            {user.isComplete ? "Voltar" : "Sair"}
                        </Button>
                    </div>
                </form>
            </Form>
            {loading && <LoadingIndicator />}
        </>
    );
};

export default UserEditForm;
