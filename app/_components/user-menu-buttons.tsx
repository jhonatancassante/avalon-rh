"use client";

import {
    EditIcon,
    FileSlidersIcon,
    LogOutIcon,
    MenuIcon,
    MoonIcon,
    NotebookPenIcon,
    SunIcon,
    UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLoading } from "../_contexts/LoadingContext";
import { useMediaQuery } from "@react-hook/media-query";
import { Roles } from "../_constants/roles";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";

interface UserMenuButtonsProps {
    userId: string;
    userRole: string;
}

const UserMenuButtons = ({ userId, userRole }: UserMenuButtonsProps) => {
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const pathname = usePathname();

    const adminButton = userRole === Roles.Admin;
    const leaderButton = userRole === Roles.Admin || userRole === Roles.Leader;

    const handlerSignOut = async () => {
        setIsLoading(true);
        await signOut();
        setIsLoading(false);
    };

    const handlerEditProfile = () => {
        setIsLoading(true);
        router.push(`/pages/user/edit/${userId}`);
        setIsLoading(false);
    };

    const handlerProfile = () => {
        setIsLoading(true);
        router.push(`/pages/user/${userId}`);
        setIsLoading(false);
    };

    const handlerLeaderPage = async () => {
        setIsLoading(true);
        router.push(`/pages/leader`);
        setIsLoading(false);
    };

    const handlerAdminPage = async () => {
        setIsLoading(true);
        router.push(`/pages/admin`);
        setIsLoading(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isEditPage = pathname.includes("edit");

    return isDesktop ? (
        <div className="flex gap-1">
            <Button
                variant={"ghost"}
                onClick={isEditPage ? handlerProfile : handlerEditProfile}
                className="justify-start gap-2"
            >
                {isEditPage ? (
                    <UserIcon size={"icon"} />
                ) : (
                    <EditIcon size={"icon"} />
                )}

                {isEditPage ? "Perfil" : "Editar Perfil"}
            </Button>

            {leaderButton && (
                <Button
                    variant={"ghost"}
                    onClick={handlerLeaderPage}
                    className="justify-start gap-2"
                >
                    <NotebookPenIcon size="icon" />
                    Dar Notas
                </Button>
            )}

            {adminButton && (
                <Button
                    variant={"ghost"}
                    onClick={handlerAdminPage}
                    className="justify-start gap-2"
                >
                    <FileSlidersIcon size="icon" />
                    Administração
                </Button>
            )}

            <Button
                variant={"ghost"}
                onClick={toggleTheme}
                className="justify-start gap-2"
            >
                {theme === "light" ? (
                    <SunIcon size="icon" />
                ) : (
                    <MoonIcon size="icon" />
                )}
                Tema
            </Button>

            <Button
                variant={"ghost"}
                onClick={handlerSignOut}
                className="justify-start gap-2"
            >
                <LogOutIcon size={"icon"} />
                Sair
            </Button>
        </div>
    ) : (
        <div className="absolute right-10 top-10">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"icon"} className="p-0">
                        <MenuIcon size={"sm"} />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[200px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-2 border-b border-solid py-5">
                        <SheetClose asChild>
                            <Button
                                variant={"ghost"}
                                onClick={
                                    isEditPage
                                        ? handlerProfile
                                        : handlerEditProfile
                                }
                                className="justify-start gap-2"
                            >
                                {isEditPage ? (
                                    <UserIcon size={"icon"} />
                                ) : (
                                    <EditIcon size={"icon"} />
                                )}

                                {isEditPage ? "Perfil" : "Editar Perfil"}
                            </Button>
                        </SheetClose>

                        {leaderButton && (
                            <SheetClose asChild>
                                <Button
                                    variant={"ghost"}
                                    onClick={handlerLeaderPage}
                                    className="justify-start gap-2"
                                >
                                    <NotebookPenIcon size={18} />
                                    Dar Notas
                                </Button>
                            </SheetClose>
                        )}

                        {adminButton && (
                            <SheetClose asChild>
                                <Button
                                    variant={"ghost"}
                                    onClick={handlerAdminPage}
                                    className="justify-start gap-2"
                                >
                                    <FileSlidersIcon size={18} />
                                    Administração
                                </Button>
                            </SheetClose>
                        )}

                        <SheetClose asChild>
                            <Button
                                variant={"ghost"}
                                onClick={toggleTheme}
                                className="justify-start gap-2"
                            >
                                {theme === "light" ? (
                                    <SunIcon size={18} />
                                ) : (
                                    <MoonIcon size={18} />
                                )}
                                Tema
                            </Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <Button
                                variant={"ghost"}
                                onClick={handlerSignOut}
                                className="justify-start gap-2"
                            >
                                <LogOutIcon size={18} />
                                Sair
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default UserMenuButtons;
