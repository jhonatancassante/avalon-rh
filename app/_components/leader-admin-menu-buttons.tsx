"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingIndicator from "./loading-indicator";
import { FileSlidersIcon, NotebookPenIcon } from "lucide-react";
import { Roles } from "../_constants/roles";

interface LeaderAdminMenuButtonsProps {
    userRole: string;
}

const LeaderAdminMenuButtons = ({ userRole }: LeaderAdminMenuButtonsProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const adminButton = userRole === Roles.Admin;
    const leaderButton = userRole === Roles.Admin || userRole === Roles.Leader;

    const handlerLeaderPage = () => {
        setLoading(true);
        router.push(`/pages/leader`);
    };

    const handlerAdminPage = () => {
        setLoading(true);
        router.push(`/pages/admin`);
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
            {loading && <LoadingIndicator />}
        </div>
    );
};

export default LeaderAdminMenuButtons;
