import { Prisma } from "@prisma/client";

export default interface UserPrismaComplete {
    user: Prisma.UserGetPayload<{
        include: { photo: true; profile: true };
    }>;
}
