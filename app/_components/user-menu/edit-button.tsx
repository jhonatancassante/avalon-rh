"use client";

import { EditIcon } from "lucide-react";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { useRouter } from "next/navigation";
import MenuButton from "../ui/menu-button";

interface EditButtonProps {
    userId: string;
}

const EditButton = ({ userId }: EditButtonProps) => {
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const editProfile = (userId: string) => {
        setIsLoading(true);
        router.push(`/pages/user/edit/${userId}`);
        setIsLoading(false);
    };

    return (
        <MenuButton
            icon={<EditIcon size={18} />}
            label={"Editar Perfil"}
            onClick={() => editProfile(userId)}
        />
    );
};

export default EditButton;
