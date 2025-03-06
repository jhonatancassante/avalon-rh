import EventFormEdit from "@/app/_components/event-form/event-form-edit";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { PATHS } from "@/app/_constants/paths";
import { getEventById } from "@/app/_data/getEvent";
import { redirect } from "next/navigation";

interface EditEventPageProps {
    params: Promise<{ id: string }>;
}

const EventListPage = async ({ params }: EditEventPageProps) => {
    const breadcrumbList = [
        {
            label: "Administração",
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

    try {
        const { id } = await params;
        const event = await getEventById(id);

        if (!event) {
            throw new Error("Event not found!");
        }

        return (
            <PageLayoutSidebar breadcrumbList={breadcrumbList}>
                <div className="flex w-full justify-center py-4">
                    <Card className="mx-4 grid w-full lg:max-w-2xl">
                        <CardHeader>
                            <CardTitle className="flex w-full justify-center text-2xl font-bold">
                                Editar Evento
                            </CardTitle>
                            <div className="flex h-10 w-full items-center justify-center gap-1 px-2 py-1"></div>
                        </CardHeader>
                        <CardContent>
                            <EventFormEdit event={event} />
                        </CardContent>
                    </Card>
                </div>
            </PageLayoutSidebar>
        );
    } catch (error) {
        console.error(error);
        redirect(PATHS.ERROR_500);
    }
};

export default EventListPage;
