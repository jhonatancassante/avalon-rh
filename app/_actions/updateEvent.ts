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
            include: {
                eventSectors: {
                    include: {
                        sector: {
                            include: {
                                leader: {
                                    include: {
                                        profile: true,
                                    },
                                },
                            },
                        },
                    },
                },
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
            include: {
                eventSectors: {
                    include: {
                        sector: {
                            include: {
                                leader: {
                                    include: {
                                        profile: true,
                                    },
                                },
                            },
                        },
                    },
                },
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
                  where: { id: id, isDeleted: false },
                  data: {
                      ...data,
                      eventSectors: {
                          deleteMany: {},
                          create: data.eventSectors.map((sectorId) => ({
                              sectorId,
                          })),
                      },
                  },
                  include: { eventSectors: true },
              })
            : await db.event.create({
                  data: {
                      ...data,
                      eventSectors: {
                          create: data.eventSectors.map((sectorId) => ({
                              sectorId,
                          })),
                      },
                  },
                  include: { eventSectors: true },
              });

        return event;
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.EVENT, error);
        throw error;
    }
};
