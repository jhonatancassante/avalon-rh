import PageLayout from "@/app/_components/page-layout";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import UserFormEdit from "@/app/_components/user-form/user-form-edit";
import UserMenuButtons from "@/app/_components/user-menu-buttons";
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
            <PageLayout>
                <div className="grid w-full lg:max-w-xl">
                    <CardHeader>
                        <CardTitle className="flex w-full justify-center text-2xl font-bold">
                            Editar Perfil
                        </CardTitle>
                        <div className="flex h-10 w-full items-center justify-center gap-1 px-2 py-1">
                            <UserMenuButtons userId={id} userRole={user.role} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <UserFormEdit user={user} />
                    </CardContent>
                </div>
            </PageLayout>
        );
    } catch (error) {
        console.error(error);
        redirect("/pages/errors/500");
    }
};

export default EditUserPage;
