"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Roles } from "../_constants/roles";
import { db } from "../_lib/prisma";

export const updateEventAreInscriptionsOpen = async (
    id: string,
    value: boolean,
) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized: No session found.");
    }

    if (session.user.role !== Roles.Admin) {
        throw new Error(
            "Unauthorized: You do not have permission to create an event.",
        );
    }

    await db.event.update({
        where: {
            id: id,
            isDeleted: false,
        },
        data: {
            areInscriptionsOpen: value,
        },
    });
};

export const updateEventIsFinished = async (id: string) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized: No session found.");
    }

    if (session.user.role !== Roles.Admin) {
        throw new Error(
            "Unauthorized: You do not have permission to update event status.",
        );
    }

    try {
        const event = await db.event.findUnique({
            where: {
                id: id,
                isDeleted: false,
            },
            select: {
                isFinished: true,
            },
        });

        if (!event) {
            throw new Error("Event not found.");
        }

        const newIsFinished = !event.isFinished;

        await db.event.update({
            where: {
                id: id,
                isDeleted: false,
            },
            data: {
                isFinished: newIsFinished,
            },
        });
    } catch (error) {
        console.error("Error updating event status:", error);
        throw error;
    }
};
