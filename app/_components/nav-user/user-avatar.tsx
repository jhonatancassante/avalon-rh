import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar";
import { UserComplete } from "@/app/_types/userComplete";

interface UserAvatarProps {
    user: UserComplete | null;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                    src={user?.photo?.url}
                    alt={user?.profile?.socialName}
                />
                <AvatarFallback className="rounded-lg">
                    {user?.profile?.socialName?.[0] ?? "U"}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    {user?.profile?.socialName ?? "Usuário"}
                </span>
                <span className="truncate text-xs">
                    {user?.profile?.contactEmail ?? "email@example.com"}
                </span>
            </div>
        </div>
    );
};
