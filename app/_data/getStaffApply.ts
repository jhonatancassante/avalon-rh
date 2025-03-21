"use server";

import { db } from "../_lib/prisma";

export const getStaffApplyList = async (userId: string) => {
    if (!userId) return;

    return await db.userEventApply.findMany({
        where: {
            userId: userId,
        },
        include: {
            userEventSectors: true,
        },
    });
};
