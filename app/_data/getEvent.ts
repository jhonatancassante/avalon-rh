"use server";

import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "../_actions/verifySessionAndRoleAdmin";

export const getEventList = async () => {
    await verifySessionAndRoleAdmin();

    return await db.event.findMany({
        where: {
            isDeleted: false,
        },
    });
};

export const getEventListNotFinished = async () => {
    await verifySessionAndRoleAdmin();

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
    await verifySessionAndRoleAdmin();

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
    await verifySessionAndRoleAdmin();

    return await db.event.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
};
