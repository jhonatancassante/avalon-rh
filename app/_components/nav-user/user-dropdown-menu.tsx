import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { UserComplete } from "@/app/_types/userComplete";
import { Bell, ChevronsUpDown, LogOut, User } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { ThemeToggle } from "./theme-toggle";
import { SidebarMenuButton } from "../ui/sidebar";

interface UserDropdownMenuProps {
    user: UserComplete | null;
    onLogout: () => void;
    onProfile: () => void;
    isMobile: boolean;
}

export const UserDropdownMenu = ({
    user,
    onLogout,
    onProfile,
    isMobile,
}: UserDropdownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <UserAvatar user={user} />
                    <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <UserAvatar user={user} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onProfile}>
                        <User className="mr-2" />
                        Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell className="mr-2" />
                        Notificações
                    </DropdownMenuItem>
                    <ThemeToggle />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
