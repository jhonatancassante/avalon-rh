import { Button } from "@/app/_components/ui/button";

interface UserFormActionsProps {
    loading: boolean;
    isComplete: boolean;
    onExit: () => void;
}

export const UserFormActions = ({
    loading,
    isComplete,
    onExit,
}: UserFormActionsProps) => {
    return (
        <div className="flex justify-around">
            <Button type="submit" className="w-40" disabled={loading}>
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
