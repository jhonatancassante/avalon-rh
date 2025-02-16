import { Button } from "@/app/_components/ui/button";

interface UserFormActionsProps {
    loading: boolean;
    isValid: boolean;
    isComplete: boolean;
    onExit: () => void;
}

export const UserFormActions = ({
    loading,
    isValid,
    isComplete,
    onExit,
}: UserFormActionsProps) => {
    return (
        <div className="flex justify-around">
            <Button
                type="submit"
                className="w-40"
                disabled={loading || !isValid}
            >
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
