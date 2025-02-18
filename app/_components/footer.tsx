"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Footer = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
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

    return (
        <footer className="bg-primary py-8 text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center text-center text-2xl font-bold md:text-left">
                        <Link href={`/`}>
                            <Image
                                src={`/logos/logo-avalon-eventos-${logoTheme ?? "light"}.png`}
                                sizes="(max-height: 100px)"
                                alt="Logo Avalon Eventos"
                                width={200}
                                height={100}
                                loading="lazy"
                            />
                        </Link>

                        <p className="text-center text-xs text-gray-400 md:text-left">
                            © {new Date().getFullYear()} Todos os direitos
                            reservados.
                        </p>
                    </div>

                    <div className="flex h-full w-full items-center justify-center">
                        <Separator
                            orientation={`${isDesktop ? "vertical" : "horizontal"}`}
                            className="my-4 h-1 w-full rounded-full bg-gray-700 lg:h-full lg:w-1"
                        />
                    </div>

                    {/* Redes sociais */}
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">Redes Sociais</h2>
                        <div className="mt-2 flex justify-center space-x-4">
                            <Link
                                href="https://www.facebook.com/CircuitoAnimeFest/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary transition-colors hover:text-background hover:drop-shadow-lg"
                            >
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/animefest/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary transition-colors hover:text-background hover:drop-shadow-lg"
                            >
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
