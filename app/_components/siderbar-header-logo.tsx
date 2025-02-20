"use client";

import * as React from "react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import Image from "next/image";
import useThemeDetector from "../_hooks/useThemeDetector";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { PATHS } from "../_constants/paths";

export function SidebarHeaderLogo() {
    const { logoTheme, isThemeLoaded } = useThemeDetector();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    asChild
                >
                    <Link href={PATHS.HOME}>
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            {isThemeLoaded ? (
                                <Image
                                    height={16}
                                    width={16}
                                    sizes="max-h-[16px] max-w-[16px]"
                                    src={`/logos/logo-avalon-a-${logoTheme}.png`}
                                    alt="Logo da avalon, um A com olhinhos"
                                />
                            ) : (
                                <Skeleton className="h-4 w-4" />
                            )}
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                Avalon Eventos
                            </span>
                            <span className="truncate text-xs">
                                Gerenciamento de Staffs
                            </span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
