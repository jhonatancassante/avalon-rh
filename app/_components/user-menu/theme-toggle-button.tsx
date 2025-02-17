import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

interface ThemeToggleButtonProps {
    onClick?: () => void; // Adicionando uma prop opcional para onClick
}

const ThemeToggleButton = ({ onClick }: ThemeToggleButtonProps) => {
    const { theme, setTheme } = useTheme();

    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light"); // Alterna o tema
        onClick?.(); // Executa a função onClick, se fornecida
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className="justify-start gap-2"
        >
            {theme === "light" ? (
                <SunIcon size="icon" />
            ) : (
                <MoonIcon size="icon" />
            )}
            Tema
        </Button>
    );
};

export default ThemeToggleButton;
