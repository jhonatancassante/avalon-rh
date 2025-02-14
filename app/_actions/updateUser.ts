"use server";

import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { authorizedRoles } from "../_constants/roles";
import { validateUserData } from "../_utils/validateUserData";
import UpdateUser from "../_types/UpdateUser";
import { revalidatePath } from "next/cache";
import { encrypt } from "../_utils/crypto";

export const updateUser = async (id: string, data: UpdateUser) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized: No session found.");
    }

    const isUserOwner = session.user.id === id;
    const isUserAdmin = authorizedRoles.includes(session.user.role);

    if (!isUserOwner && !isUserAdmin) {
        throw new Error(
            "Unauthorized: You do not have permission to update this user.",
        );
    }

    const validation = validateUserData(data);

    if (!validation.isValid) {
        throw new Error("Invalid data: " + JSON.stringify(validation.errors));
    }

    if (data.cpf) {
        data.cpf = encrypt(data.cpf);
    }

    revalidatePath("/pages/user/[id]", "page");

    return await db.user.update({
        where: {
            id: id,
        },
        data: data,
    });
};
