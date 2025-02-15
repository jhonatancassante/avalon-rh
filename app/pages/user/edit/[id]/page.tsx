import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import UserEditForm from "@/app/_components/user-edit-form";
import { getUser } from "@/app/_data/getUser";
import formatCPF from "@/app/_utils/formatCPF";
import { redirect } from "next/navigation";

interface EditUserPageProps {
    params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
    try {
        const { id } = await params;
        const user = await getUser(id);

        if (!user) {
            throw new Error("User not found!");
        }

        if (user.profile) {
            user.profile.cpf = user.profile.cpf
                ? formatCPF(user.profile.cpf)
                : "";
        }

        return (
            <main className="flex justify-center p-5 lg:px-28">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Editar Perfil
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserEditForm user={user} />
                    </CardContent>
                </Card>
            </main>
        );
    } catch (error) {
        console.error(error);
        redirect("/pages/errors/500");
    }
};

export default EditUserPage;
