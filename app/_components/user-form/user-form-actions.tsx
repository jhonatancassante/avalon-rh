import { Button } from "@/app/_components/ui/button";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";

interface UserFormActionsProps {
    loading: boolean;
    isActive: boolean;
    isComplete: boolean;
    onExit: () => void;
}

export const UserFormActions = ({
    loading,
    isActive,
    isComplete,
    onExit,
}: UserFormActionsProps) => {
    const isDisabled = loading || !isActive;
    return (
        <div className="flex justify-around">
            <Button type="submit" className="w-40" disabled={isDisabled}>
                {loading ? "Enviando..." : "Salvar"}
            </Button>
            <Button
                type="button"
                onClick={onExit}
                className="hidden w-40 md:inline-flex"
                disabled={loading}
            >
                {isComplete ? "Voltar" : "Sair"}
            </Button>

            <Button
                type="button"
                onClick={onExit}
                className="fixed left-2 top-2 inline-flex rounded-full p-0 md:hidden"
                disabled={loading}
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
