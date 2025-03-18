import { db } from "../app/_lib/prisma";

const exclude = async (email: string): Promise<void> => {
    try {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
            include: {
                profile: true,
                photo: true,
            },
        });

        if (!user || !user.profile || !user.photo) {
            console.log("Usuário não encontrado.");
            return;
        }

        const accounts = await db.account.findMany({
            where: {
                userId: user.id,
            },
        });

        accounts.forEach(async (account) => {
            await db.account.delete({
                where: {
                    id: account.id,
                },
            });
        });

        await db.profile.delete({
            where: {
                userId: user.id,
            },
        });

        await db.photo.delete({
            where: {
                userId: user.id,
            },
        });

        await db.user.delete({
            where: {
                id: user.id,
            },
        });
        console.log(`Usuário ${email} excluído com sucesso.`);
    } catch (error) {
        console.error("Erro durante a execução:", error);
        process.exit(1);
    }
};

const excludeMe = async (): Promise<void> => {
    console.log("Iniciando exclusão de usuário...");
    const emailList = [
        "games.avalon.eventos@gmail.com",
        "cassante.rose@gmail.com",
    ];

    for (const email of emailList) {
        await exclude(email);
    }
    console.log("Processo finalizado com sucesso!");
};

excludeMe();
