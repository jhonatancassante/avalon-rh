"use client";

import {
    ArrowBigLeftDash,
    Award,
    CalendarCog,
    Folder,
    House,
    Settings2,
    TrendingUp,
    UserCog,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import { NavEvents } from "@/app/_components/nav-events/nav-events";
import { NavUser } from "@/app/_components/nav-user/nav-user";
import { SidebarHeaderLogo } from "@/app/_components/siderbar-header-logo";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/app/_components/ui/sidebar";
import { ComponentProps } from "react";
import { PATHS } from "../_constants/paths";
import { usePathname } from "next/navigation";

const navMain = [
    {
        title: "Voltar ao Perfil",
        url: PATHS.HOME,
        icon: ArrowBigLeftDash,
        plus: false,
    },
    {
        title: "Administração",
        url: PATHS.ADMIN,
        icon: House,
        plus: false,
    },
    {
        title: "Eventos",
        url: PATHS.EVENTS,
        icon: CalendarCog,
        plus: true,
    },
    {
        title: "Staffs",
        url: "#",
        icon: UserCog,
        plus: false,
    },
    {
        title: "Configurações",
        url: "#",
        icon: Settings2,
        plus: false,
        isActive: false,
        items: [
            {
                title: "Cargos",
                url: PATHS.POSITIONS,
                icon: Award,
            },
            {
                title: "Níveis",
                url: PATHS.LEVELS,
                icon: TrendingUp,
            },
            {
                title: "Setores",
                url: PATHS.SECTORS,
                icon: Folder,
            },
        ],
    },
];

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
    const pathname = usePathname();

    const processedNavMain = navMain.map((item) => {
        if (item.title === "Configurações") {
            const hasActiveSubitem = item.items?.some(
                (subItem) => subItem.url === pathname,
            );
            return { ...item, isActive: hasActiveSubitem };
        }
        return item;
    });

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHeaderLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={processedNavMain} />
                <NavEvents />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
