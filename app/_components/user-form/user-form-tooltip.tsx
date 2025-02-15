import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface FormTooltipProps {
    msg: string;
}

const FormTooltip = ({ msg }: FormTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        style={{
                            cursor: "pointer",
                            border: "1px solid rgb(107 114 128 / var(--tw-text-opacity, 1))",
                            borderRadius: "50%",
                            width: "0.9rem",
                            height: "0.9rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faQuestion}
                            className="text-gray-500"
                            style={{
                                fontSize: "0.65rem",
                            }}
                        />
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{msg}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default FormTooltip;
