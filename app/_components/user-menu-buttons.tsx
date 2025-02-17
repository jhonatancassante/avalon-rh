"use client";

import { EditIcon, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLoading } from "../_contexts/LoadingContext";

interface UserMenuButtonsProps {
    userId: string;
}

const UserMenuButtons = ({ userId }: UserMenuButtonsProps) => {
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

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

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <TooltipProvider>
            <div className="flex gap-2">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={handlerEditProfile}
                        >
                            <EditIcon size={"icon"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="mb-2 text-sm">
                        Editar o perfil
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? (
                                <SunIcon size="icon" />
                            ) : (
                                <MoonIcon size="icon" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="mb-2 text-sm">
                        Alternar para {theme === "light" ? "Dark" : "Light"}{" "}
                        Mode
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={handlerSignOut}
                        >
                            <LogOutIcon size={"icon"} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="mb-2 text-sm">
                        Sair
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
};

export default UserMenuButtons;
