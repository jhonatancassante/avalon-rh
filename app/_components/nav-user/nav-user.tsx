"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/app/_components/ui/sidebar";
import { useUser } from "@/app/_hooks/useUser";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { PATHS } from "@/app/_constants/paths";
import { signOut } from "next-auth/react";
import { UserDropdownMenu } from "./user-dropdown-menu";

export function NavUser() {
    const { isMobile } = useSidebar();
    const { user } = useUser();
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const handleProfile = () => {
        router.push(`${PATHS.USER}/${user?.id}`);
    };

    const handleEdit = () => {
        setIsLoading(true);
        router.push(`${PATHS.USER_EDIT}/${user?.id}`);
    };

    const handleLogout = useCallback(async () => {
        setIsLoading(true);
        await signOut();
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <UserDropdownMenu
                    user={user}
                    onLogout={handleLogout}
                    onProfile={handleProfile}
                    onEdit={handleEdit}
                    isMobile={isMobile}
                />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
