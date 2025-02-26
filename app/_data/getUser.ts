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
        include: {
            photo: true,
            profile: true,
        },
    });

    if (!user) {
        throw new Error("User not found!");
    }

    if (user.profile?.cpf) {
        user.profile.cpf = decrypt(user.profile?.cpf);
    }

    if (user.profile?.pixKey) {
        user.profile.pixKey = decrypt(user.profile?.pixKey);
    }

    if (user.profile?.phone) {
        user.profile.phone = decrypt(user.profile.phone);
    }

    return user;
};
