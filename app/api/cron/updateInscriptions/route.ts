import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log("Iniciando função de atualização das inscrições...");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const updatedOpenEvents = await db.event.updateMany({
            where: {
                dateToOpen: {
                    lte: today,
                },
                areInscriptionsOpen: false,
                dateToClose: {
                    gt: today,
                },
            },
            data: {
                areInscriptionsOpen: true,
            },
        });

        const updatedClosedEvents = await db.event.updateMany({
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
            message: "Inscrições atualizadas com sucesso!",
            updatedOpenEvents,
            updatedClosedEvents,
        });
    } catch (error) {
        console.error("Erro ao atualizar inscrições:", error);
        return NextResponse.json(
            { message: "Erro ao atualizar inscrições" },
            { status: 500 },
        );
    }
}
