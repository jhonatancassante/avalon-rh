"use server";

import { db } from "../_lib/prisma";

export const getUserUpdate = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id: id,
            isDeleted: false,
        },
        select: {
            role: true,
            isComplete: true,
        },
    });

    if (!user) throw new Error("Usuário não encontrado!");

    return { role: user.role, isComplete: user.isComplete };
};
