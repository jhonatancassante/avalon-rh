"use server";

import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const deleteSector = async (id: string) => {
    verifySessionAndRoleAdmin();

    await db.sector.update({
        where: {
            id: id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
};
