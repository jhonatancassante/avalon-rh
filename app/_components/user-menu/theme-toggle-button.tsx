import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
