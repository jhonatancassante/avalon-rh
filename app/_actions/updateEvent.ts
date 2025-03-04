"use server";

import { db } from "../_lib/prisma";
import CreateOrUpdateEvent from "../_types/createOrUpdateEvent";
import { ERRORSMSG } from "../_constants/errorsMessages";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const updateEventAreInscriptionsOpen = async (
    id: string,
    value: boolean,
) => {
    verifySessionAndRoleAdmin();

    try {
        return await db.event.update({
            where: {
                id: id,
                isDeleted: false,
            },
            data: {
                areInscriptionsOpen: value,
            },
        });
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.EVENT, error);
        throw error;
    }
};

export const updateEventIsFinished = async (
    id: string,
    isFinished: boolean,
) => {
    verifySessionAndRoleAdmin();

    try {
        return await db.event.update({
            where: {
                id: id,
                isDeleted: false,
            },
            data: {
                isFinished: isFinished,
            },
        });
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.EVENT, error);
        throw error;
    }
};

export const updateOrCreateEvent = async (
    id: string,
    data: CreateOrUpdateEvent,
) => {
    verifySessionAndRoleAdmin();

    try {
        const event = id
            ? await db.event.update({
                  where: {
                      id: id,
                      isDeleted: false,
                  },
                  data: data,
              })
            : await db.event.create({
                  data: data,
              });

        return event;
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.EVENT, error);
        throw error;
    }
};
