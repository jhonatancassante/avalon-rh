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
import UserMenuButtons from "@/app/_components/user-menu-buttons";
import { getUser } from "@/app/_data/getUser";
import formatCPF from "@/app/_utils/formatCPF";
import { randomUUID } from "crypto";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { redirect } from "next/navigation";

interface UserPageProps {
    params: Promise<{ id: string }>;
}

const fields = [
    "Nome Completo:",
    "CPF:",
    "Data de Nascimento:",
    "Email de Contato:",
];

const UserPage = async ({ params }: UserPageProps) => {
    try {
        const { id } = await params;
        const user = await getUser(id);

        if (!user) {
            throw new Error("User not found!");
        }

        const userFields: { [key: string]: string } = {
            completeName: user.completeName ?? "",
            cpf: user.cpf ? formatCPF(user.cpf) : "",
            birthdate: format(user.birthdate ?? new Date(), "dd/MM/yyyy", {
                locale: ptBR,
            }),
            contactEmail: user.contactEmail ?? "",
        };

        return (
            <main className="flex justify-center p-5 lg:px-28">
                <Card className="mx-4 my-1 w-full max-w-2xl p-2">
                    <CardHeader className="flex w-full items-center justify-center pb-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="relative mb-4 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-foreground">
                                    <Image
                                        src={
                                            user.photoUrl ??
                                            "/avatar-placeholder.jpg"
                                        }
                                        alt={user.completeName ?? ""}
                                        fill
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="p-4 sm:max-w-[90%] lg:max-h-[95%] lg:max-w-[70%]">
                                <DialogHeader>
                                    <DialogTitle>Foto de Perfil</DialogTitle>
                                </DialogHeader>
                                <div className="flex h-[90vh] items-end justify-center p-5">
                                    <div className="flex max-h-[70%] items-center justify-center p-5">
                                        <Image
                                            src={
                                                user.photoUrl ??
                                                "/avatar-placeholder.jpg"
                                            }
                                            alt={user.completeName ?? ""}
                                            fill
                                            objectFit="contain"
                                            className="p-5 pt-12"
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <CardTitle className="flex justify-center text-2xl font-bold">
                            {user.completeName}
                        </CardTitle>
                        <div className="flex w-full justify-end gap-1">
                            <UserMenuButtons userId={id} />
                        </div>
                    </CardHeader>
                    <div className="flex items-center justify-center">
                        <Separator className="w-[90%]" />
                    </div>
                    <CardContent className="mt-4 flex w-full flex-col items-center">
                        <Tabs defaultValue="profile" className="w-[80%]">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="profile">
                                    Perfil
                                </TabsTrigger>
                                <TabsTrigger value="notes">Notas</TabsTrigger>
                                <TabsTrigger value="apply">
                                    Candidatar-se
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Dados</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {Object.keys(userFields).map(
                                            (field, index) => (
                                                <div
                                                    className="space-y-1"
                                                    key={`${index} - ${randomUUID()}`}
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
                                            ),
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
                </Card>
            </main>
        );
    } catch (error) {
        console.error(error);
        redirect("/pages/errors/500");
    }
};

export default UserPage;
