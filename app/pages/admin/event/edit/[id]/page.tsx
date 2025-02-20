"use client";

import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { useSession } from "next-auth/react";

const EventListPage = () => {
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
            label: "Editar",
            url: PATHS.EVENT_EDIT,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <h1>Página de Edit Evento</h1>
        </PageLayoutSidebar>
    );
};

export default EventListPage;
