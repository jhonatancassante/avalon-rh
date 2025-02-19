import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("##########################################");
    console.log("Rodou o agendamento. Teste bem sucedido! Uhul!");

    try {
        const now = new Date();
        const offset = -3; // UTC-3 (São Paulo)
        const today = new Date(now.getTime() + offset * 60 * 60 * 1000);
        today.setHours(0, 0, 0, 0); // Define o horário para meia-noite no fuso de São Paulo

        const updatedEvents = await db.event.updateMany({
            where: {
                dateToClose: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                },
                areInscriptionsOpen: true,
            },
            data: {
                areInscriptionsOpen: false,
            },
        });

        return NextResponse.json({
            message: "Inscrições atualizadas com sucesso!",
            updatedEvents,
        });
    } catch (error) {
        console.error("Erro ao atualizar inscrições:", error);
        return NextResponse.json(
            { message: "Erro ao atualizar inscrições" },
            { status: 500 },
        );
    }
}
