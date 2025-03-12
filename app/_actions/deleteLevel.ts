"use server";

import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const deleteLevel = async (id: string) => {
    verifySessionAndRoleAdmin();

    await db.level.update({
        where: {
            id: id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
};
