"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getUser = async (id: string) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized!");

    return await db.user.findUnique({
        where: {
            id: id,
            isDeleted: false,
        },
    });
};
