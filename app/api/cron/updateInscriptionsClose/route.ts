import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log("Iniciando função de fechamento das inscrições...");

        const now = new Date();
        const today = new Date(now.getTime());
        today.setHours(0, 0, 0, 0);

        const updatedEvents = await db.event.updateMany({
            where: {
                dateToClose: {
                    lt: today,
                },
                areInscriptionsOpen: true,
            },
            data: {
                areInscriptionsOpen: false,
            },
        });

        return NextResponse.json({
            message: "Inscrições fechadas com sucesso!",
            updatedEvents,
        });
    } catch (error) {
        console.error("Erro ao fechar inscrições:", error);
        return NextResponse.json(
            { message: "Erro ao fechar inscrições" },
            { status: 500 },
        );
    }
}
