import PageLayout from "@/app/_components/page-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import EditButton from "@/app/_components/user-menu/edit-button";
import { getUser } from "@/app/_data/getUser";
import formatCPF from "@/app/_utils/formatCPF";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

interface UserPageProps {
    params: Promise<{ id: string }>;
}

const fields = [
    "CPF:",
    "Pronome",
    "Nome Completo:",
    "Nome Social:",
    "Apelido:",
    "Chave Pix",
    "Data de Nascimento:",
    "Email do Google Account",
    "Email de Contato:",
    "Celular / Whatsapp:",
    "Estado",
    "Cidade",
    "É Portador de Deficiencia?",
    "Qual sua deficiência?",
    "Precisa de algum auxílio específico?",
];

const UserPage = async ({ params }: UserPageProps) => {
    try {
        const { id } = await params;
        const user = await getUser(id);

        if (!user) {
            throw new Error("User not found!");
        }

        const userFields: { [key: string]: string | string[] } = {
            cpf: user.profile?.cpf ? formatCPF(user.profile?.cpf) : "",
            pronoun: user.profile?.pronoun ?? "",
            completeName: user.profile?.completeName ?? "",
            socialName: user.profile?.socialName ?? "",
            nickname: user.profile?.nickname ?? "",
            pixKey: user.profile?.pixKey ?? "",
            birthdate: format(
                user.profile?.birthdate ?? new Date(),
                "dd/MM/yyyy",
                {
                    locale: ptBR,
                },
            ),
            email: user.email ?? "",
            contactEmail: user.profile?.contactEmail ?? "",
            phone: user.profile?.phone ?? "",
            state: user.profile?.state ?? "",
            city: user.profile?.city ?? "",
            isPcd: user.profile?.isPcd ? "Sim" : "Não",
            deficiency: user.profile?.deficiency ?? [],
            extraSupport: user.profile?.extraSupport ?? [],
        };

        return (
            <PageLayout>
                <CardHeader className="flex w-full items-center justify-center pb-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="relative mb-4 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-foreground">
                                <Image
                                    src={
                                        user.photo?.url ??
                                        "/avatar-placeholder.jpg"
                                    }
                                    alt={user.profile?.completeName ?? ""}
                                    fill
                                    sizes="max-h-28 max-w-28"
                                    className="rounded-full object-cover"
                                    priority
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="p-4 lg:max-h-[95%]">
                            <DialogHeader>
                                <DialogTitle>Foto de Perfil</DialogTitle>
                                <DialogDescription className="hidden">
                                    Foto de Perfil Ampliada
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex h-[90vh] items-end justify-center">
                                <div className="relative flex h-full w-full items-center justify-center">
                                    <Image
                                        src={
                                            user.photo?.url ??
                                            "/avatar-placeholder.jpg"
                                        }
                                        alt={user.profile?.completeName ?? ""}
                                        fill
                                        sizes="max-h-[80vh]"
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <CardTitle className="line-clamp-3 flex items-center justify-center text-ellipsis pb-2 text-center text-2xl font-bold">
                        {user.profile?.completeName}
                    </CardTitle>
                    <div className="flex h-10 w-full items-center justify-between gap-1 px-2 py-1">
                        <div className="hidden w-[130px] lg:block"></div>
                        <div className="flex h-full items-center justify-center gap-1 p-2">
                            <StarIcon size={18} />
                            <StarIcon size={18} />
                            <StarIcon size={18} />
                            <StarIcon size={18} />
                            <StarIcon size={18} />
                        </div>
                        <div className="w-[130px]">
                            <EditButton userId={id} />
                        </div>
                    </div>
                </CardHeader>
                <div className="flex w-full items-center justify-center">
                    <Separator className="w-[90%]" />
                </div>
                <CardContent className="flex w-full flex-col items-center p-0 py-6 lg:px-6">
                    <Tabs
                        defaultValue="profile"
                        className="sm:w-[100%] sm:p-0 lg:w-[80%]"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="profile">Perfil</TabsTrigger>
                            <TabsTrigger value="notes">Notas</TabsTrigger>
                            <TabsTrigger value="apply">
                                Candidatar-se
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <Card className="border-none shadow-none">
                                <CardHeader className="px-0 lg:px-6">
                                    <CardTitle>Dados</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 p-0 lg:px-6">
                                    {Object.keys(userFields).map(
                                        (field, index) => {
                                            if (
                                                userFields["isPcd"] === "Não" &&
                                                (field === "deficiency" ||
                                                    field === "extraSupport")
                                            ) {
                                                return null;
                                            }

                                            if (
                                                userFields["isPcd"] === "Sim" &&
                                                (field === "deficiency" ||
                                                    field === "extraSupport")
                                            ) {
                                                const fieldValue =
                                                    userFields[field];

                                                if (Array.isArray(fieldValue)) {
                                                    return (
                                                        <div
                                                            className="space-y-1"
                                                            key={`${index} - ${fieldValue}`}
                                                        >
                                                            <Label
                                                                htmlFor={
                                                                    fields[
                                                                        index
                                                                    ]
                                                                }
                                                            >
                                                                {fields[index]}
                                                            </Label>
                                                            <ul
                                                                className={
                                                                    "px-4"
                                                                }
                                                            >
                                                                {fieldValue.map(
                                                                    (
                                                                        item: string,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                item
                                                                            }
                                                                            className={`before:mr-2 before:content-["🌟"]`}
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    );
                                                }

                                                return null;
                                            }

                                            return (
                                                <div
                                                    className="space-y-1"
                                                    key={`${index} - ${userFields[field]}`}
                                                >
                                                    <Label
                                                        htmlFor={fields[index]}
                                                    >
                                                        {fields[index]}
                                                    </Label>
                                                    <Input
                                                        id={fields[index]}
                                                        defaultValue={
                                                            userFields[field]
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            );
                                        },
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="notes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vazio</CardTitle>
                                    <CardDescription>
                                        Ainda não temos nada por aqui!
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2"></CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="apply">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vazio</CardTitle>
                                    <CardDescription>
                                        Ainda não temos nada por aqui!
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2"></CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </PageLayout>
        );
    } catch (error) {
        console.error(error);
        redirect("/pages/errors/500");
    }
};

export default UserPage;
