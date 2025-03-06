"use client";

import { ChevronRight, Plus, type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";

export const NavMain = ({
    items,
}: {
    readonly items: {
        title: string;
        url: string;
        icon: LucideIcon;
        plus: boolean;
        isActive?: boolean;
        items?:
            | {
                  title: string;
                  url: string;
                  icon: LucideIcon;
              }[]
            | null;
    }[];
}) => {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Menu de Navegação</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                {item.items?.length ? (
                                    <CollapsibleTrigger>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </CollapsibleTrigger>
                                ) : (
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                )}
                            </SidebarMenuButton>
                            {item.plus && (
                                <div className="absolute right-2 top-0 z-10 flex h-full items-center">
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
                                </div>
                            )}
                            {item.items?.length && (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">
                                                Alternar
                                            </span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                        >
                                                            <subItem.icon />
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
