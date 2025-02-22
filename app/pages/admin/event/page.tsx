"use client";

import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import EventDataTable from "@/app/_components/event-data-table/event-data-table";

const EventListPage = () => {
    const breadcrumbList = [
        {
            label: "Home",
            url: PATHS.HOME,
        },
        {
            label: "Administração",
            url: PATHS.ADMIN,
        },
        {
            label: "Eventos",
            url: PATHS.EVENTS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <EventDataTable />
        </PageLayoutSidebar>
    );
};

export default EventListPage;
