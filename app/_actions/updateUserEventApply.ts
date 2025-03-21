"use server";

import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { AUTHORIZEDROLES } from "../_constants/roles";

export const updateOrCreateUserEventApply = async (
    id: string | undefined,
    data: {
        userId: string;
        eventId: string;
        userEventSectors: Array<{
            sectorId: string;
            optionOrder: number;
        }>;
    },
) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized: No session found.");
    }

    const isUserOwner = session.user.id === data.userId;
    const isUserAdmin = AUTHORIZEDROLES.includes(session.user.role);

    if (!isUserOwner && !isUserAdmin) {
        throw new Error(
            "Unauthorized: You do not have permission to update this user.",
        );
    }

    try {
        const userEventApply = id
            ? await db.userEventApply.update({
                  where: { id },
                  data: {
                      ...data,
                      userEventSectors: {
                          deleteMany: {},
                          create: data.userEventSectors.map((sector) => ({
                              sectorId: sector.sectorId,
                              optionOrder: sector.optionOrder,
                          })),
                      },
                  },
                  include: { userEventSectors: true },
              })
            : await db.userEventApply.create({
                  data: {
                      ...data,
                      userEventSectors: {
                          create: data.userEventSectors.map((sector) => ({
                              sectorId: sector.sectorId,
                              optionOrder: sector.optionOrder,
                          })),
                      },
                  },
                  include: { userEventSectors: true },
              });

        return userEventApply;
    } catch (error) {
        console.error("Erro ao criar/atualizar inscrição:", error);
        throw error;
    }
};
