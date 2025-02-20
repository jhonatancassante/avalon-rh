import { NotebookPenIcon, LogOutIcon, User, SettingsIcon } from "lucide-react";
import ThemeToggleButton from "./theme-toggle-button";
import { FunctionType } from "@/app/_types/functionType";
import MenuButton from "../ui/menu-button";

interface DesktopMenuProps {
    userId: string;
    isAdmin: boolean;
    isLeader: boolean;
    buttonFuctions: (userId: string, functionType: FunctionType) => void;
}

const DesktopMenu = ({
    userId,
    isAdmin,
    isLeader,

    buttonFuctions,
}: DesktopMenuProps) => {
    return (
        <nav className="flex gap-1">
            <MenuButton
                icon={<User size={18} />}
                label={"Perfil"}
                onClick={() => buttonFuctions(userId, "profile")}
            />

            {isLeader && (
                <MenuButton
                    icon={<NotebookPenIcon size={18} />}
                    label="Dar Notas"
                    onClick={() => buttonFuctions(userId, "leaderPage")}
                />
            )}

            {isAdmin && (
                <MenuButton
                    icon={<SettingsIcon size={18} />}
                    label="Administração"
                    onClick={() => buttonFuctions(userId, "adminPage")}
                />
            )}

            <ThemeToggleButton />

            <MenuButton
                icon={<LogOutIcon size={18} />}
                label="Sair"
                onClick={() => buttonFuctions(userId, "signOut")}
            />
        </nav>
    );
};

export default DesktopMenu;
