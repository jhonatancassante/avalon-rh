import { db } from "../app/_lib/prisma";
import { encrypt } from "../app/_utils/crypto";

const encryptPixKey = async () => {
    try {
        console.log("Iniciando encriptação da chave pix...")
        const usersList = await db.user.findMany(
            {
                include: { profile: true }
            }
        );

        for (const user of usersList) {
            const encryptedPixKey = encrypt(user.profile.pixKey);
            await db.user.update({
                where: { id: user.id },
                data: { profile: { pixKey: encryptedPixKey } }
            });
        }

        console.log("Processo finalizado com sucesso!")
    } catch (error) {
        console.error(error)
    }
}

encryptPixKey();