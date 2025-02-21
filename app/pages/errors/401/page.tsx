import Link from "next/link";
import { Button } from "../../../_components/ui/button"; // Componente de botão do shadcn/ui
import { AlertTriangle } from "lucide-react"; // Ícone de alerta
import { PATHS } from "@/app/_constants/paths";

const UnauthorizedPage = () => {
    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="space-y-6 text-center">
                {/* Ícone de alerta */}
                <div className="flex justify-center">
                    <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>

                {/* Título */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    401 - Não Autorizado
                </h1>

                {/* Mensagem de erro */}
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Você não tem permissão para acessar esta página.
                </p>

                {/* Botão para voltar à página inicial */}
                <Button className="mt-6" asChild>
                    <Link href={PATHS.HOME}>Voltar à página inicial</Link>
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
