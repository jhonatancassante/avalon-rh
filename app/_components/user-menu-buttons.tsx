"use client";

import { EditIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuButtonsProps {
    userId: string;
}

const UserMenuButtons = ({ userId }: UserMenuButtonsProps) => {
    const router = useRouter();

    const handlerSignOut = () => signOut();

    const handlerEditProfile = () => {
        router.push(`/pages/user/edit/${userId}`);
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
