"use client";

import { signOut, useSession } from "next-auth/react";
import UserMenuButtons from "./user-menu/user-menu-buttons";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useLoading } from "../_contexts/LoadingContext";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const { data: session } = useSession();
    const { theme } = useTheme();
    const { isLoading, setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [systemTheme, setSystemTheme] = useState<string>("");
    const [logoTheme, setLogoTheme] = useState<string>("");

    const isEditPage = pathname.includes("edit");

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

    const handleExit = async () => {
        try {
            setIsLoading(true);
            if (!session?.user.isComplete) return await signOut();
            router.replace(`/pages/user/${session?.user.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="flex w-full items-center justify-center bg-secondary p-5 text-secondary-foreground">
            <div
                className={`flex w-full items-center lg:w-[900px] ${session ? "justify-between" : "justify-center"}`}
            >
                {!isDesktop && (
                    <div className="h-[36px] w-[36px]">
                        <Button
                            type="button"
                            onClick={handleExit}
                            className={`inline-flex rounded-full p-0 ${!isEditPage && "hidden"}`}
                            disabled={isLoading}
                            size="icon"
                        >
                            {session?.user.isComplete ? (
                                <ArrowLeftIcon size={18} />
                            ) : (
                                <LogOutIcon size={18} />
                            )}
                        </Button>
                    </div>
                )}
                <div className="flex h-[50px] w-[225px]">
                    <Link href={`/`}>
                        <Image
                            src={`/logos/logo-circuito-anime-fest-02-${logoTheme ?? "light"}.png`}
                            sizes="(max-height: 50px)"
                            alt="Logo do Circuito Anime Fest"
                            width={225}
                            height={50}
                            loading="lazy"
                        />
                    </Link>
                </div>
                {session && (
                    <UserMenuButtons
                        userId={session?.user.id ?? ""}
                        userRole={session?.user.role ?? ""}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
