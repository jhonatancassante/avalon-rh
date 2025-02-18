import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface ThemeToggleButtonProps {
    onClick?: () => void; // Adicionando uma prop opcional para onClick
}

const ThemeToggleButton = ({ onClick }: ThemeToggleButtonProps) => {
    const { theme, setTheme } = useTheme();

    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light"); // Alterna o tema
        onClick?.(); // Executa a função onClick, se fornecida
    };

    const nextTheme = theme === "light" ? "dark" : "light";

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        variant="ghost"
                        onClick={handleClick}
                        className="w-full items-center justify-start gap-2"
                    >
                        {theme === "light" ? (
                            <SunIcon size={18} />
                        ) : (
                            <MoonIcon size={18} />
                        )}{" "}
                        Tema
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        Altere o tema para{" "}
                        <strong className="capitalize">{nextTheme}</strong>
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ThemeToggleButton;
