"use server";

import { getServerSession } from "next-auth";
import CreateEvent from "../_types/createOrUpdateEvent";
import { authOptions } from "../_lib/auth";
import { Roles } from "../_constants/roles";
import { db } from "../_lib/prisma";

export const createEvent = async (data: CreateEvent) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized: No session found.");
    }

    if (session.user.role !== Roles.Admin) {
        throw new Error(
            "Unauthorized: You do not have permission to create an event.",
        );
    }

    const event = await db.event.findFirst({
        where: {
            date: data.date,
            city: data.city,
        },
    });

    if (event) {
        throw new Error("Event already registered.");
    }

    await db.event.create({
        data: data,
    });
};
