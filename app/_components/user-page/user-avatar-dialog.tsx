import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import UserPrismaComplete from "@/app/_types/userPrismaComplete";

const UserAvatarDialog = ({ user }: UserPrismaComplete) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative mb-4 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-foreground">
                    <Image
                        src={user.photo?.url ?? "/avatar-placeholder.jpg"}
                        alt={user.profile?.completeName ?? ""}
                        fill
                        sizes="max-h-28 max-w-28"
                        className="rounded-full object-cover"
                        priority
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="p-4 lg:max-h-[95%]">
                <DialogHeader>
                    <DialogTitle>Foto de Perfil</DialogTitle>
                </DialogHeader>
                <div className="flex h-[90vh] items-end justify-center">
                    <div className="relative flex h-full w-full items-center justify-center">
                        <Image
                            src={user.photo?.url ?? "/avatar-placeholder.jpg"}
                            alt={user.profile?.completeName ?? ""}
                            fill
                            sizes="max-h-[80vh]"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserAvatarDialog;
