"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { decrypt } from "../_utils/crypto";
import { Prisma } from "@prisma/client";
import verifySessionAndRoleAdmin from "../_actions/verifySessionAndRoleAdmin";
import { ROLES } from "../_constants/roles";

const decryptUserData = (
    user?: Prisma.UserGetPayload<{
        include: {
            photo: true;
            profile: true;
        };
    }> | null,
) => {
    if (!user) {
        throw new Error("User not found!");
    }

    const decryptedUser = { ...user };

    if (decryptedUser.profile?.cpf) {
        decryptedUser.profile.cpf = decrypt(decryptedUser.profile?.cpf);
    }

    if (decryptedUser.profile?.pixKey) {
        decryptedUser.profile.pixKey = decrypt(decryptedUser.profile?.pixKey);
    }

    if (decryptedUser.profile?.phone) {
        decryptedUser.profile.phone = decrypt(decryptedUser.profile.phone);
    }

    return decryptedUser;
};

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

    return decryptUserData(user);
};

export const getUserLeaderList = async () => {
    await verifySessionAndRoleAdmin();

    return await db.user.findMany({
        where: {
            OR: [
                {
                    role: ROLES.LEADER,
                },
                {
                    role: ROLES.ADMIN,
                },
                {
                    role: ROLES.OWNER,
                },
            ],
            isDeleted: false,
        },
        include: {
            profile: true,
        },
    });
};
