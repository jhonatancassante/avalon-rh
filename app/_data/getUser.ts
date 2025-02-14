"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { decrypt } from "../_utils/crypto";

export const getUser = async (id: string) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
        where: {
            id: id,
            isDeleted: false,
        },
    });

    if (!user) {
        throw new Error("User not found!");
    }

    if (user.cpf) {
        user.cpf = decrypt(user.cpf);
    }

    return user;
};
