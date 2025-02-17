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
    isEditPage: boolean;
    buttonFuctions: (userId: string, functionType: FunctionType) => void;
}

const DesktopMenu = ({
    userId,
    isAdmin,
    isLeader,
    isEditPage,
    buttonFuctions,
}: DesktopMenuProps) => {
    return (
        <div className="flex gap-1">
            <MenuButton
                icon={<EditIcon size="icon" />}
                label={isEditPage ? "Perfil" : "Editar Perfil"}
                onClick={
                    isEditPage
                        ? () => buttonFuctions(userId, "profile")
                        : () => buttonFuctions(userId, "editProfile")
                }
            />

            {isLeader && (
                <MenuButton
                    icon={<NotebookPenIcon size="icon" />}
                    label="Dar Notas"
                    onClick={() => buttonFuctions(userId, "leaderPage")}
                />
            )}

            {isAdmin && (
                <MenuButton
                    icon={<FileSlidersIcon size="icon" />}
                    label="Administração"
                    onClick={() => buttonFuctions(userId, "adminPage")}
                />
            )}

            <ThemeToggleButton />

            <MenuButton
                icon={<LogOutIcon size="icon" />}
                label="Sair"
                onClick={() => buttonFuctions(userId, "signOut")}
            />
        </div>
    );
};

export default DesktopMenu;
