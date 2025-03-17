"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getConfigList = async () => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized!");

    const configs = await db.configs.findMany();

    return configs;
};
