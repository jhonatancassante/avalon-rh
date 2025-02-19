"use client";

import { signOut, useSession } from "next-auth/react";
import UserMenuButtons from "./user-menu/user-menu-buttons";
import Image from "next/image";
import { Button } from "./ui/button";
import { useLoading } from "../_contexts/LoadingContext";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import Link from "next/link";
import useThemeDetector from "../_hooks/useThemeDetector";
import { PATHS } from "../_constants/paths";

const Header = () => {
    const { data: session } = useSession();
    const { isLoading, setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { logoTheme } = useThemeDetector(); // Usando o hook customizado

    const isEditPage = pathname.includes("edit");

    const handleExit = async () => {
        try {
            setIsLoading(true);
            if (!session?.user.isComplete) return await signOut();
            router.replace(`${PATHS.USER}/${session?.user.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        !pathname.startsWith(PATHS.ADMIN) && (
            <header className="flex w-full items-center justify-center bg-secondary p-5 text-secondary-foreground">
                <div
                    className={`flex w-full items-center lg:max-w-[900px] ${session ? "justify-between" : "justify-center"}`}
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
                        <Link href={PATHS.HOME}>
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
        )
    );
};

export default Header;
