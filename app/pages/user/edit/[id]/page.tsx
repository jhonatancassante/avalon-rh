import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import UserEditForm from "@/app/_components/user-edit-form";
import { getUser } from "@/app/_data/getUser";

interface EditUserPageProps {
    params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
    const { id } = await params;
    const user = await getUser(id);

    if (!user) {
        return <div>User not found</div>;
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
                    <UserEditForm
                        id={user.id || ""}
                        name={user.name ?? null}
                        cpf={user.cpf ?? null}
                        completeName={user.completeName || null}
                        email={user.email ?? null}
                        secondaryEmail={user.secondaryEmail || null}
                        birthdate={user.birthdate || null}
                        role={user.role || ""}
                        createdAt={user.createdAt || new Date()}
                        updatedAt={user.updatedAt || new Date()}
                        image={user.image ?? null}
                        photoUrl={user.photoUrl || null}
                        emailVerified={user.emailVerified || new Date()}
                        isComplete={user.isComplete || false}
                        isDeleted={user.isDeleted || false}
                    />
                </CardContent>
            </Card>
        </main>
    );
};

export default EditUserPage;
