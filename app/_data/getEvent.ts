"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Roles } from "../_constants/roles";
import { db } from "../_lib/prisma";

const _verifySession = async () => {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Roles.Admin)
        throw new Error("Unauthorized!");
};

export const getEventList = async () => {
    await _verifySession();

    return await db.event.findMany({
        where: {
            isDeleted: false,
        },
    });
};

export const getEventListNotFinished = async () => {
    await _verifySession();

    return await db.event.findMany({
        where: {
            isDeleted: false,
            isFinished: false,
        },
        orderBy: {
            date: "asc",
        },
    });
};

export const getEventListFinished = async () => {
    await _verifySession();

    return await db.event.findMany({
        where: {
            isDeleted: false,
            isFinished: true,
        },
        orderBy: {
            date: "asc",
        },
    });
};

export const getEventById = async (id: string) => {
    await _verifySession();

    return await db.event.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
};
