"use client";

import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { EventProvider } from "@/app/_contexts/EventContext";
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
        <EventProvider>
            <PageLayoutSidebar breadcrumbList={breadcrumbList}>
                <EventDataTable />
            </PageLayoutSidebar>
        </EventProvider>
    );
};

export default EventListPage;
