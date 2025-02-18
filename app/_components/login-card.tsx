"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useLoading } from "../_contexts/LoadingContext";

const LoginCard = () => {
    const { setIsLoading } = useLoading();

    const handleLoginWithGoogle = async () => {
        try {
            setIsLoading(true);
            return await signIn("google");
        } catch (error) {
            console.error(error);
            toast.error("Erro", {
                description:
                    "Ocorreu algum erro ao fazer login, tente novamente mais tarde.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex w-full max-w-xs flex-col p-4">
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl font-bold">Bem-vindo</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6 text-center text-secondary-foreground">
                    Faça login para continuar
                </p>
                <Button
                    className="flex w-full items-center justify-center gap-2"
                    onClick={handleLoginWithGoogle}
                >
                    <FontAwesomeIcon icon={faGoogle} />
                    <span>Google</span>
                </Button>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
