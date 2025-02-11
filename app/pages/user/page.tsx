"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const isLogged = session?.user;

    useEffect(() => {
        if (!isLogged) {
            router.push("/");
        }
    }, [isLogged, router]);

    if (!isLogged) {
        return null;
    }

    return (
        <div>
            <div className="p-5 lg:px-28">
                <h1>Página de User</h1>
                <p>Bem-vindo, usuário!</p>
            </div>
        </div>
    );
};

export default UserPage;
