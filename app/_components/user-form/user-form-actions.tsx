import { Button } from "@/app/_components/ui/button";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";

interface UserFormActionsProps {
    isActive: boolean;
    isComplete: boolean;
    onExit: () => void;
}

export const UserFormActions = ({
    isActive,
    isComplete,
    onExit,
}: UserFormActionsProps) => {
    const { isLoading } = useLoading();
    const isDisabled = isLoading || !isActive;
    return (
        <div className="flex justify-around">
            <Button type="submit" className="w-40" disabled={isDisabled}>
                {isLoading ? "Enviando..." : "Salvar"}
            </Button>
            <Button
                type="button"
                onClick={onExit}
                className="hidden w-40 md:inline-flex"
                disabled={isLoading}
            >
                {isComplete ? "Voltar" : "Sair"}
            </Button>

            <Button
                type="button"
                onClick={onExit}
                className="fixed left-10 top-10 inline-flex rounded-full p-0 md:hidden"
                disabled={isLoading}
                size="icon"
            >
                {isComplete ? (
                    <ArrowLeftIcon size="md" />
                ) : (
                    <LogOutIcon size="icon" />
                )}
            </Button>
        </div>
    );
};
