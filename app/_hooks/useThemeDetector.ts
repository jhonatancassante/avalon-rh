import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const useThemeDetector = () => {
    const { theme } = useTheme();
    const [systemTheme, setSystemTheme] = useState<string>("");
    const [logoTheme, setLogoTheme] = useState<string>("");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setSystemTheme(mediaQuery.matches ? "dark" : "light");

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);

        setLogoTheme(theme === "system" ? systemTheme : (theme ?? "light"));
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [systemTheme, theme]);

    return { logoTheme };
};

export default useThemeDetector;
