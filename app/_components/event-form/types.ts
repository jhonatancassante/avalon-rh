import { Prisma } from "@prisma/client";

export type EventSectorComplete = Prisma.EventSectorGetPayload<{
    include: {
        sector: {
            include: {
                leader: {
                    include: {
                        profile: true;
                    };
                };
            };
        };
    };
}>;

export type EventComplete = Prisma.EventGetPayload<{
    include: {
        eventSectors: {
            include: {
                sector: {
                    include: {
                        leader: {
                            include: {
                                profile: true;
                            };
                        };
                    };
                };
            };
        };
    };
}>;
