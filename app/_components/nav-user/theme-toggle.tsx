import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const nextTheme = theme === "light" ? "dark" : "light";

    const handleThemeChange = () => {
        setTheme(nextTheme);
    };

    return (
        <DropdownMenuItem
            onClick={handleThemeChange}
            className="flex cursor-pointer items-center"
        >
            {nextTheme === "light" ? <Sun /> : <Moon />}
            <span className="ml-2">
                Tema <strong className="capitalize">{nextTheme}</strong>
            </span>
        </DropdownMenuItem>
    );
};
