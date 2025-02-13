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

const UserEditForm = (user: User) => {
    const { update } = useSession();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: user?.cpf ?? "",
            completeName: user?.name ?? "",
            secondaryEmail: user?.email ?? "",
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

            router.replace(`/pages/user`);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            router.replace(`/pages/errors/500`);
        }
    };

    const handleLogout = () => signOut();

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

                <FormField
                    control={form.control}
                    name="completeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Nome Completo
                                <FormTooltip msg="Verifique e digite seu nome completo, caso seja o mesmo da conta Google, não precisa alterar." />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite o nome completo"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="secondaryEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Email de Contato
                                <FormTooltip msg="Verifique e digite seu email, caso seja o mesmo da conta Google, não precisa alterar." />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite o email de contato"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">
                                Data de Nascimento
                                <FormTooltip msg="Coloque sua data de nascimento, lembrando que precisa ter 18 anos para participar como staff." />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Digite a data de nascimento"
                                    {...field}
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
                    <Button onClick={handleLogout} className="w-40">
                        Sair
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserEditForm;
