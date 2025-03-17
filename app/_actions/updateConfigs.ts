"use server";

import { ERRORSMSG } from "../_constants/errorsMessages";
import { db } from "../_lib/prisma";
import verifySessionAndRoleAdmin from "./verifySessionAndRoleAdmin";

export const updateOrCreateConfig = async (key: string, value: boolean) => {
    verifySessionAndRoleAdmin();

    if (typeof value !== "boolean") {
        throw new Error("Valor inválido para configuração");
    }

    try {
        const configExists = await db.configs.findUnique({
            where: { key: key },
        });

        const config = configExists
            ? await db.configs.update({
                  where: { id: configExists.id },
                  data: {
                      value: value,
                  },
              })
            : await db.configs.create({
                  data: {
                      key: key,
                      value: value,
                  },
              });

        return config;
    } catch (error) {
        console.error(ERRORSMSG.UPDATING.CONFIG, error);
        throw error;
    }
};
