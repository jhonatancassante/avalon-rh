"use server";

import verifySessionAndRoleAdmin from "../_actions/verifySessionAndRoleAdmin";
import { db } from "../_lib/prisma";

export const getSectorList = async () => {
    await verifySessionAndRoleAdmin();

    return await db.sector.findMany({
        where: {
            isDeleted: false,
        },
    });
};
