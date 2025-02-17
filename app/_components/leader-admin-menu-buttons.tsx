"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FileSlidersIcon, NotebookPenIcon } from "lucide-react";
import { Roles } from "../_constants/roles";
import { useLoading } from "../_contexts/LoadingContext";

interface LeaderAdminMenuButtonsProps {
    userRole: string;
}

const LeaderAdminMenuButtons = ({ userRole }: LeaderAdminMenuButtonsProps) => {
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const adminButton = userRole === Roles.Admin;
    const leaderButton = userRole === Roles.Admin || userRole === Roles.Leader;

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

    return (
        <div className="flex gap-2">
            {leaderButton && (
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={handlerLeaderPage}
                >
                    <NotebookPenIcon size="icon" />
                    Notas
                </Button>
            )}

            {adminButton && (
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={handlerAdminPage}
                >
                    <FileSlidersIcon size="ison" />
                    Administração
                </Button>
            )}
        </div>
    );
};

export default LeaderAdminMenuButtons;
