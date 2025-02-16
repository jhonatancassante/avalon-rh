import { Button } from "@/app/_components/ui/button";

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
                className="w-40"
                disabled={loading}
            >
                {isComplete ? "Voltar" : "Sair"}
            </Button>
        </div>
    );
};
