import { Button } from "@/app/_components/ui/button";
import { useLoading } from "@/app/_contexts/LoadingContext";

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
        </div>
    );
};
