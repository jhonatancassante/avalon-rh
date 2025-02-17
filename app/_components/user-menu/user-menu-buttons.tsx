"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import { Roles } from "@/app/_constants/roles";
import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { signOut } from "next-auth/react";
import { FunctionType } from "@/app/_types/functionType";

interface UserMenuButtonsProps {
    userId: string;
    userRole: string;
}

const UserMenuButtons = ({ userId, userRole }: UserMenuButtonsProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const pathname = usePathname();
    const router = useRouter();
    const { setIsLoading } = useLoading();

    const isAdmin = userRole === Roles.Admin;
    const isLeader = userRole === Roles.Admin || userRole === Roles.Leader;
    const isEditPage = pathname.includes("edit");

    const handleMenuButtons = (userId: string, functionType: FunctionType) => {
        const buttonsFunctions = {
            editProfile: (userId: string) => {
                setIsLoading(true);
                router.push(`/pages/user/edit/${userId}`);
                setIsLoading(false);
            },
            profile: (userId: string) => {
                setIsLoading(true);
                router.push(`/pages/user/${userId}`);
                setIsLoading(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            leaderPage: (userId: string) => {
                setIsLoading(true);
                router.push(`/pages/leader`);
                setIsLoading(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            adminPage: (userId: string) => {
                setIsLoading(true);
                router.push(`/pages/admin`);
                setIsLoading(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            signOut: async (userId: string) => {
                setIsLoading(true);
                await signOut();
                setIsLoading(false);
            },
        };

        return buttonsFunctions[functionType](userId);
    };

    return isDesktop ? (
        <DesktopMenu
            userId={userId}
            isAdmin={isAdmin}
            isLeader={isLeader}
            isEditPage={isEditPage}
            buttonFuctions={handleMenuButtons}
        />
    ) : (
        <MobileMenu
            userId={userId}
            isAdmin={isAdmin}
            isLeader={isLeader}
            isEditPage={isEditPage}
            buttonFuctions={handleMenuButtons}
        />
    );
};

export default UserMenuButtons;
