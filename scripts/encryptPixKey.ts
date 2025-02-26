import { db } from "../app/_lib/prisma";
import { encrypt } from "../app/_utils/crypto"; // Ajuste o caminho conforme necessário

interface Profile {
    pixKey: string;
}

interface User {
    id: string;
    profile: Profile | null;
}

const encryptPixKey = async (): Promise<void> => {
    try {
        console.log("Iniciando encriptação da chave pix...");

        const usersList: User[] = await db.user.findMany({
            include: { profile: true },
        });

        console.log(`Encontrados ${usersList.length} usuários para atualizar`);

        for (const user of usersList) {
            if (!user.profile?.pixKey) continue;

            const encryptedPixKey = encrypt(user.profile.pixKey);

            await db.user.update({
                where: { id: user.id },
                data: {
                    profile: {
                        update: {
                            pixKey: encryptedPixKey,
                        },
                    },
                },
            });
        }

        console.log("Processo finalizado com sucesso!");
        process.exit(0);
    } catch (error) {
        console.error("Erro durante a execução:", error);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
};

encryptPixKey();
