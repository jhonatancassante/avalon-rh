"use server";

import { ERRORSMSG } from "../_constants/errorsMessages";
import { db } from "../_lib/prisma";
import CreateOrUpdateSector from "../_types/createOrUpdateSector";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const updateOrCreateSector = async (
    id: string,
    data: CreateOrUpdateSector,
) => {
    verifySessionAndRoleAdmin();

    try {
        const sector = id
            ? await db.sector.update({
                  where: { id: id, isDeleted: false },
                  data: data,
              })
            : await db.sector.create({ data: data });

        return sector;
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.SECTOR, error);
        throw error;
    }
};
