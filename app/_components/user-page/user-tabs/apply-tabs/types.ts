import { Prisma, Sector } from "@prisma/client";

export interface SelectedSectors {
    0: Sector | null;
    1: Sector | null;
    2: Sector | null;
    3: Sector | null;
}

export type UserStaffApply = Prisma.UserEventApplyGetPayload<{
    include: {
        userEventSectors: true;
    };
}>;
