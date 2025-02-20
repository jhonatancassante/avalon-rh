"use client";

import * as React from "react";
import {
    Calendar,
    CalendarCog,
    FolderCog,
    House,
    Settings,
    Settings2,
    UserCog,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import { NavEvents } from "@/app/_components/nav-events";
import { NavUser } from "@/app/_components/nav-user";
import { SidebarHeaderLogo } from "@/app/_components/siderbar-header-logo";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/app/_components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "/",
            icon: House,
            plus: false,
        },
        {
            title: "Administração",
            url: "/pages/admin",
            icon: Settings,
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
            plus: true,
        },
        {
            title: "Setores",
            url: "#",
            icon: FolderCog,
            plus: true,
        },
        {
            title: "Configurações",
            url: "#",
            icon: Settings2,
            plus: false,
        },
    ],
    events: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Calendar,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: Calendar,
        },
        {
            name: "Travel",
            url: "#",
            icon: Calendar,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHeaderLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavEvents projects={data.events} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
