import { db } from "../_lib/prisma";

export const getUser = async (id: string) => {
    return await db.user.findUnique({
        where: {
            id: id,
            isDeleted: false,
        },
    });
};
