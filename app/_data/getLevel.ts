"use server";

import verifySessionAndRoleAdmin from "../_actions/verifySessionAndRoleAdmin";
import { db } from "../_lib/prisma";

export const getLevelList = async () => {
    await verifySessionAndRoleAdmin();

    return await db.level.findMany({
        where: {
            isDeleted: false,
        },
    });
};
