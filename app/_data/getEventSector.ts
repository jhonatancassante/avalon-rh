"use server";

import verifySessionAndRoleAdmin from "../_actions/verifySessionAndRoleAdmin";
import { db } from "../_lib/prisma";

export const getEventSectorsLastUpdated = async () => {
    await verifySessionAndRoleAdmin();

    const lastUpdated = await db.eventSector.findFirst({
        where: {},
        orderBy: {
            updatedAt: "desc",
        },
    });

    return await db.eventSector.findMany({
        where: {
            eventId: lastUpdated?.eventId,
        },
        include: {
            sector: {
                include: {
                    leader: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
        },
    });
};
