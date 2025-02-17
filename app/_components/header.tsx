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

const Header = () => {
    const { data: session } = useSession();
    const { theme } = useTheme();
    const logoTheme = theme ?? "light";
    const { isLoading, setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const isEditPage = pathname.includes("edit");

    const handleExit = async () => {
        try {
            setIsLoading(true);
            if (!session?.user.isComplete) return await signOut();
            router.replace(`/pages/user/${session?.user.id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="flex w-full items-center justify-center bg-secondary p-3 text-secondary-foreground">
            <div className="flex w-full items-center justify-between lg:w-[900px]">
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
                <div className="flex h-[36px] w-[162px]">
                    <Image
                        src={`/logos/logo-circuito-anime-fest-02-${logoTheme}.png`}
                        sizes="(max-height: 36px)"
                        width={162}
                        height={36}
                        alt="Logo do Circuito Anime Fest"
                    />
                </div>
                <UserMenuButtons
                    userId={session?.user.id ?? ""}
                    userRole={session?.user.role ?? ""}
                />
            </div>
        </header>
    );
};

export default Header;
