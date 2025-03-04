import { Button } from "@/app/_components/ui/button";
import { useLoading } from "@/app/_contexts/LoadingContext";

interface UserFormActionsProps {
    isActive: boolean;
    isComplete: boolean;
    onExit: () => void;
}

export const FormActions = ({
    isActive,
    isComplete,
    onExit,
}: UserFormActionsProps) => {
    const { isLoading } = useLoading();
    const isDisabled = isLoading || !isActive;
    return (
        <div className="flex justify-around">
            <Button
                type="submit"
                className="w-32 lg:w-40"
                disabled={isDisabled}
            >
                {isLoading ? "Enviando..." : "Salvar"}
            </Button>
            <Button
                type="button"
                onClick={onExit}
                className="w-32 lg:w-40"
                disabled={isLoading}
            >
                {isComplete ? "Voltar" : "Sair"}
            </Button>
        </div>
    );
};
