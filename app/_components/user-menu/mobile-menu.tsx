import {
    EditIcon,
    NotebookPenIcon,
    FileSlidersIcon,
    LogOutIcon,
    MenuIcon,
} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import ThemeToggleButton from "./theme-toggle-button";
import { FunctionType } from "@/app/_types/functionType";
import MenuButton from "../ui/menu-button";

interface MobileMenuProps {
    userId: string;
    isAdmin: boolean;
    isLeader: boolean;
    buttonFuctions: (userId: string, functionType: FunctionType) => void;
}

const MobileMenu = ({
    userId,
    isAdmin,
    isLeader,
    buttonFuctions,
}: MobileMenuProps) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" className="p-0">
                        <MenuIcon size={18} />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[200px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-2 border-b border-solid py-5">
                        <SheetClose asChild>
                            <MenuButton
                                icon={<EditIcon size={18} />}
                                label={"Perfil"}
                                onClick={() =>
                                    buttonFuctions(userId, "profile")
                                }
                            />
                        </SheetClose>

                        {isLeader && (
                            <SheetClose asChild>
                                <MenuButton
                                    icon={<NotebookPenIcon size={18} />}
                                    label="Dar Notas"
                                    onClick={() =>
                                        buttonFuctions(userId, "leaderPage")
                                    }
                                />
                            </SheetClose>
                        )}

                        {isAdmin && (
                            <SheetClose asChild>
                                <MenuButton
                                    icon={<FileSlidersIcon size={18} />}
                                    label="Administração"
                                    onClick={() =>
                                        buttonFuctions(userId, "adminPage")
                                    }
                                />
                            </SheetClose>
                        )}

                        <SheetClose asChild>
                            <ThemeToggleButton
                                onClick={() => {
                                    // Fecha o Sheet ao alternar o tema
                                    document.dispatchEvent(
                                        new KeyboardEvent("keydown", {
                                            key: "Escape", // Simula o pressionamento da tecla "Escape" para fechar o Sheet
                                        }),
                                    );
                                }}
                            />
                        </SheetClose>

                        <SheetClose asChild>
                            <MenuButton
                                icon={<LogOutIcon size={18} />}
                                label="Sair"
                                onClick={() =>
                                    buttonFuctions(userId, "signOut")
                                }
                            />
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileMenu;
