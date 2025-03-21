import { cn } from "@/app/_lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ApplyStatusProps = {
    lastUpdate?: Date;
    className?: string;
};

export const ApplyStatus = ({ lastUpdate, className }: ApplyStatusProps) => {
    if (!lastUpdate) return null;

    return (
        <div className={cn("text-sm text-muted-foreground", className)}>
            Última atualização:{" "}
            {format(new Date(lastUpdate), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
            })}
        </div>
    );
};
