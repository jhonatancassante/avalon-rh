"use client";

import {
    ArrowBigLeftDash,
    CalendarCog,
    CircleDollarSign,
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

const navMain = [
    {
        title: "Voltar ao Perfil",
        url: "/",
        icon: ArrowBigLeftDash,
        plus: false,
    },
    {
        title: "Administração",
        url: "/pages/admin",
        icon: House,
        plus: false,
    },
    {
        title: "Eventos",
        url: "/pages/admin/event",
        icon: CalendarCog,
        plus: true,
    },
    {
        title: "Usuários",
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
                title: "Financeiro",
                url: "#",
                icon: CircleDollarSign,
            },
            {
                title: "Níveis",
                url: "#",
                icon: TrendingUp,
            },
            {
                title: "Setores",
                url: "#",
                icon: Folder,
            },
        ],
    },
];

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHeaderLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavEvents />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
