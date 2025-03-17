"use client";

import EditButton from "@/app/_components/user-menu/edit-button";
import { StarIcon } from "lucide-react";
import { CardHeader, CardTitle } from "@/app/_components/ui/card";
import UserAvatarDialog from "./user-avatar-dialog";
import UserPrismaComplete from "@/app/_types/userPrismaComplete";
import { useMediaQuery } from "@react-hook/media-query";

const UserProfileCard = ({ user }: UserPrismaComplete) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <CardHeader className="flex w-full items-center justify-center pb-2">
            <UserAvatarDialog user={user} />
            <CardTitle className="flex max-w-96 items-center justify-center pb-2">
                <p className="line-clamp-2 text-ellipsis text-wrap text-center text-2xl font-bold">
                    {user.profile?.socialName}
                </p>
            </CardTitle>
            <div className="flex h-10 w-full items-center justify-between gap-1 px-2 py-1">
                <div className="hidden w-[130px] lg:block"></div>
                <div className="flex h-full items-center justify-center gap-1 p-2">
                    <StarIcon size={18} />
                    <StarIcon size={18} />
                    <StarIcon size={18} />
                    <StarIcon size={18} />
                    <StarIcon size={18} />
                </div>
                <div className={`${isDesktop ? "w-[130px]" : ""} `}>
                    <EditButton userId={user.id} isDesktop={isDesktop} />
                </div>
            </div>
        </CardHeader>
    );
};

export default UserProfileCard;
