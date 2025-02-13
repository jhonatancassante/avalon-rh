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
import isDateValidAndOver18 from "@/app/_utils/isDateValidAndOver18";
import isValidCPF from "@/app/_utils/isValidCPF";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import convertUrl from "../_utils/convertUrl";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const formSchema = z.object({
    cpf: z.string().refine((value) => isValidCPF(value), "CPF inválido!"),
    completeName: z.string().trim().min(5, "Nome muito curto!"),
    secondaryEmail: z.string().email("Email inválido!"),
    birthdate: z
        .string()
        .min(10, "Data inválida!")
        .refine(
            (value) => isDateValidAndOver18(value),
            "Você deve ter pelo menos 18 anos!",
        ),
    photoUrl: z
        .string()
        .url("URL inválida!")
        .refine(
            (value) => value.startsWith("https://drive.google.com/file/d/"),
            "O link da imagem deve ser do Google Drive!",
        ),
});

const UserEditForm = (user: User) => {
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
            photoUrl: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            ...values,
            cpf: values.cpf.replace(/\D/g, ""),
            photoUrl: convertUrl(values.photoUrl),
        };
        console.log(data);
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
                <Button type="submit">Salvar</Button>
                <Button onClick={handleLogout}>Sair</Button>
            </form>
        </Form>
    );
};

export default UserEditForm;
