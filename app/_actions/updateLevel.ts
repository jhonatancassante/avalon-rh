"use server";

import { ERRORSMSG } from "../_constants/errorsMessages";
import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const updateOrCreateLevel = async (
    id: string,
    data: { name: string },
) => {
    verifySessionAndRoleAdmin();

    try {
        const level = id
            ? await db.level.update({
                  where: { id: id, isDeleted: false },
                  data: data,
              })
            : await db.level.create({ data: data });

        return level;
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.LEVEL, error);
        throw error;
    }
};
