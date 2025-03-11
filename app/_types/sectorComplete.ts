import { Prisma } from "@prisma/client";

export type SectorComplete = Prisma.SectorGetPayload<{
    include: {
        leader: {
            include: { profile: true };
        };
    };
}>;
