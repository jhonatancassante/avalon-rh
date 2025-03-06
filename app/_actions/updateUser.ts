"use server";

import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { authorizedRoles } from "../_constants/roles";
import { revalidatePath } from "next/cache";
import { validateUserData } from "../_utils/validateUserData";
import { encrypt } from "../_utils/crypto";
import UpdateUser from "../_types/updateUser";
import { PATHS } from "../_constants/paths";

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

    const user = await db.user.findUnique({
        where: {
            id: id,
            isDeleted: false,
        },
        include: { profile: true, photo: true },
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (!data.profile) {
        throw new Error("Invalid data: Profile is required.");
    }

    const validation = validateUserData(data);

    if (!validation.isValid) {
        throw new Error(
            JSON.stringify({
                message: "Dados inválidos",
                errors: validation.errors,
            }),
        );
    }

    if (data.profile.cpf) {
        data.profile.cpf = encrypt(data.profile.cpf);
    }

    if (data.profile.pixKey) {
        data.profile.pixKey = encrypt(data.profile.pixKey);
    }

    if (data.profile.phone) {
        data.profile.phone = encrypt(data.profile.phone);
    }

    const updatedUser = await db.user.update({
        where: { id },
        data: {
            isComplete: data.isComplete,
            profile: data.profile
                ? {
                      [user.profile ? "update" : "create"]: {
                          cpf: data.profile.cpf,
                          completeName: data.profile.completeName,
                          socialName: data.profile.socialName,
                          nickname: data.profile.nickname,
                          pronoun: data.profile.pronoun,
                          pixKey: data.profile.pixKey,
                          contactEmail: data.profile.contactEmail,
                          phone: data.profile.phone,
                          birthdate: data.profile.birthdate,
                          isPcd: data.profile.isPcd,
                          deficiency: data.profile.deficiency,
                          extraSupport: data.profile.extraSupport,
                          city: data.profile.city,
                          state: data.profile.state,
                      },
                  }
                : undefined,
            photo: data.photo
                ? {
                      [user.photo ? "update" : "create"]: {
                          asset_id: data.photo.asset_id,
                          display_name: data.photo.display_name,
                          height: data.photo.height,
                          public_id: data.photo.public_id,
                          url: data.photo.url,
                          width: data.photo.width,
                      },
                  }
                : undefined,
        },
        include: {
            profile: true,
            photo: true,
        },
    });

    revalidatePath(`${PATHS.USER}/[id]`, "page");

    return updatedUser;
};
