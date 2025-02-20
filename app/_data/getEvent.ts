"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Roles } from "../_constants/roles";
import { db } from "../_lib/prisma";

export const getEventList = async () => {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Roles.Admin)
        throw new Error("Unauthorized!");

    const eventList = await db.event.findMany({
        where: {
            isDeleted: false,
        },
    });

    return eventList;
};

export const getEventListNonFinished = async () => {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Roles.Admin)
        throw new Error("Unauthorized!");

    const eventList = await db.event.findMany({
        where: {
            isDeleted: false,
            isFinished: false,
        },
        orderBy: {
            date: "asc",
        },
        take: 5,
    });

    return eventList;
};
