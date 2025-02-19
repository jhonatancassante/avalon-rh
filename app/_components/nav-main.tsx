"use client";

import { Plus, type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

export function NavMain({
    items,
}: {
    readonly items: {
        title: string;
        url: string;
        icon: LucideIcon;
    }[];
}) {
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
                        {item.title !== "Configurações" && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant={"ghost"}
                                            className="flex h-4 w-4 items-center justify-center rounded-full"
                                            asChild
                                        >
                                            <Link href={`${item.url}/add`}>
                                                <Plus className="text-muted-foreground" />
                                            </Link>
                                        </Button>
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
}
