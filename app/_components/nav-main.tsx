"use client";

import { Plus, type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

export const NavMain = ({
    items,
}: {
    readonly items: {
        title: string;
        url: string;
        icon: LucideIcon;
        plus: boolean;
    }[];
}) => {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Eventos</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem
                        key={item.title}
                        className="flex items-center"
                    >
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        {item.plus && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={`${item.url}/add`}
                                            className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground"
                                        >
                                            <Plus className="h-4 w-4 stroke-background text-muted-foreground" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Criar Novo</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
