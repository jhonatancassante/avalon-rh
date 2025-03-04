"use server";

import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const deleteEvent = async (id: string) => {
    verifySessionAndRoleAdmin();

    await db.event.update({
        where: {
            id: id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
};
