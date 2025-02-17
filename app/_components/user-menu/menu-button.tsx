import { ReactNode } from "react";
import { Button } from "../ui/button";

interface MenuButtonProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}

const MenuButton = ({ icon, label, onClick }: MenuButtonProps) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className="items-center justify-start gap-2"
        >
            {icon}
            {label}
        </Button>
    );
};

export default MenuButton;
