import { columns } from "@/app/_components/data-table/columns";
import { DataTable } from "@/app/_components/data-table/data-table";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { getEventList } from "@/app/_data/getEvent";

const EventListPage = async () => {
    const data = await getEventList();

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
                    <DataTable columns={columns} data={data} />
                </div>
            </main>
        </PageLayoutSidebar>
    );
};

export default EventListPage;
