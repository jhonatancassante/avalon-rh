"use client";

import * as React from "react";
import {
    AudioWaveform,
    Calendar,
    CalendarCog,
    Command,
    FolderCog,
    GalleryVerticalEnd,
    Settings2,
    UserCog,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import { NavEvents } from "@/app/_components/nav-events";
import { NavUser } from "@/app/_components/nav-user";
import { TeamSwitcher } from "@/app/_components/team-switcher";
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
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Eventos",
            url: "/pages/admin/event",
            icon: CalendarCog,
        },
        {
            title: "Usuários",
            url: "#",
            icon: UserCog,
        },
        {
            title: "Setores",
            url: "#",
            icon: FolderCog,
        },
        {
            title: "Configurações",
            url: "#",
            icon: Settings2,
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
                <TeamSwitcher teams={data.teams} />
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
