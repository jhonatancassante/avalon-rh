import { Prisma } from "@prisma/client";
import EditButton from "@/app/_components/user-menu/edit-button";
import { StarIcon } from "lucide-react";
import { CardHeader, CardTitle } from "@/app/_components/ui/card";
import UserAvatarDialog from "./user-avatar-dialog";

interface UserProfileCardProps {
    user: Prisma.UserGetPayload<{
        include: { photo: true; profile: true };
    }>;
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
    return (
        <CardHeader className="flex w-full items-center justify-center pb-2">
            <UserAvatarDialog user={user} />
            <CardTitle className="line-clamp-3 flex items-center justify-center text-ellipsis pb-2 text-center text-2xl font-bold">
                {user.profile?.completeName}
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
                <div className="w-[130px]">
                    <EditButton userId={user.id} />
                </div>
            </div>
        </CardHeader>
    );
};

export default UserProfileCard;
