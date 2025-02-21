import { eventColumns } from "@/app/_components/data-table/event-columns";
import { DataTable } from "@/app/_components/data-table/data-table";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";

const EventListPage = async () => {
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
            <main className="flex flex-col items-center py-6">
                <h1 className="text-2xl font-bold">Lista de Eventos</h1>
                <div className="mx-auto w-full py-6 md:max-w-[90%]">
                    <DataTable columns={eventColumns} />
                </div>
            </main>
        </PageLayoutSidebar>
    );
};

export default EventListPage;
