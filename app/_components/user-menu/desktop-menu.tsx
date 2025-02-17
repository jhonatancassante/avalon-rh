import {
    EditIcon,
    NotebookPenIcon,
    FileSlidersIcon,
    LogOutIcon,
} from "lucide-react";
import MenuButton from "./menu-button";
import ThemeToggleButton from "./theme-toggle-button";
import { FunctionType } from "@/app/_types/functionType";

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
        <div className="flex gap-1">
            <MenuButton
                icon={<EditIcon size={18} />}
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
                    icon={<FileSlidersIcon size={18} />}
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
        </div>
    );
};

export default DesktopMenu;
