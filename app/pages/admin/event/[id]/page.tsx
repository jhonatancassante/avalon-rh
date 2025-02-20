"use client";

import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { useSession } from "next-auth/react";

const EventPage = () => {
    const { data: session } = useSession();

    const breadcrumbList = [
        {
            label: "Perfil",
            url: `${PATHS.USER}/${session?.user.id}`,
        },
        {
            label: "Admin",
            url: PATHS.ADMIN,
        },
        {
            label: "Eventos",
            url: PATHS.EVENTS,
        },
        {
            label: "Nome do Evento Aqui",
            url: PATHS.EVENTS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <h1>Página de Evento</h1>
        </PageLayoutSidebar>
    );
};

export default EventPage;
