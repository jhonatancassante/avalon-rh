"use client";

import { Roles } from "@/app/_constants/roles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const isLogged = session?.user;
    const isRole = session?.user?.role === Roles.Admin;

    useEffect(() => {
        if (!isLogged || !isRole) {
            router.push("/pages/401");
        }
    }, [isLogged, isRole, router]);

    if (!isLogged || !isRole) {
        return null;
    }

    return (
        <div>
            <div className="p-5 lg:px-28">
                <h1>Página de Administração</h1>
                <p>Bem-vindo, administrador!</p>
            </div>
        </div>
    );
};

export default AdminPage;
