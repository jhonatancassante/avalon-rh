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
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import convertUrl from "../_utils/convertUrl";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { formSchema } from "../_schemas/formSchema";
import { updateUser } from "../_actions/updateUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editUserFields } from "../_constants/editUserFields";
import formatPhone from "../_utils/formatPhone";

const UserEditForm = (user: User) => {
    const { update } = useSession();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: user?.cpf ?? "",
            completeName: user?.completeName
                ? user?.completeName
                : (user?.name ?? ""),
            socialName: user?.socialName
                ? user?.socialName
                : (user?.name ?? ""),
            nickname: user?.nickname ?? "",
            email: user?.email ?? "",
            contactEmail: user?.contactEmail
                ? user?.contactEmail
                : (user?.email ?? ""),
            phone: user?.phone ?? "",
            birthdate:
                format(user?.birthdate ?? new Date(), "yyyy-MM-dd", {
                    locale: ptBR,
                }).toString() ?? "",
            photoUrl: convertUrl(user?.photoUrl ?? ""),
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const [year, month, day] = values.birthdate.split("-");
        const birthdateIso = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
        );

        const data = {
            ...values,
            cpf: values.cpf.replace(/\D/g, ""),
            photoUrl: convertUrl(values.photoUrl),
            isComplete: true,
            birthdate: birthdateIso,
        };

        try {
            await updateUser(user.id, data);

            await update({ user: data });

            toast.success("Sucesso!", {
                description: "Usuário atualizado com sucesso!",
            });

            router.replace(`/pages/user/${user.id}`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            router.replace(`/pages/errors/500`);
        }
    };

    const handleExit = () => {
        if (!user.isComplete) return signOut();

        router.replace(`/pages/user/${user.id}`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormTooltip msg={formField.tooltip} />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type={formField.type}
                                            placeholder={formField.placeholder}
                                            {...field}
                                            disabled={formField.disabled}
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
                    name="photoUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                URL da Foto
                                <FormTooltip msg="Coloque um link de uma foto sua que esteja publica no seu Drive do Google. Se ainda tiver dúvidas, clique no link de ajuda." />
                                <Link
                                    href="/pages/help/photo-url"
                                    target="_blank"
                                    className="text-xs"
                                >
                                    Ajuda
                                </Link>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite a URL da foto"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-around">
                    <Button type="submit" className="w-40">
                        Salvar
                    </Button>
                    <Button
                        type={"button"}
                        onClick={handleExit}
                        className="w-40"
                    >
                        {user.isComplete ? "Voltar" : "Sair"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserEditForm;
