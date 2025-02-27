import EventFormEdit from "@/app/_components/event-form/event-form-edit";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { PATHS } from "@/app/_constants/paths";

const EventAddPage = () => {
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
        {
            label: "Adicionar",
            url: PATHS.EVENT_ADD,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <div className="flex w-full justify-center">
                <div className="grid w-full lg:max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex w-full justify-center text-2xl font-bold">
                            Adicionar Novo Evento
                        </CardTitle>
                        <div className="flex h-10 w-full items-center justify-center gap-1 px-2 py-1"></div>
                    </CardHeader>
                    <CardContent>
                        <EventFormEdit />
                    </CardContent>
                </div>
            </div>
        </PageLayoutSidebar>
    );
};

export default EventAddPage;
