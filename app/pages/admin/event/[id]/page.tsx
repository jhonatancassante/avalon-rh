import EventPageActions from "@/app/_components/event-pages/event-page-actions";
import EventPageFields from "@/app/_components/event-pages/event-page-fields";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { PATHS } from "@/app/_constants/paths";
import { getEventById } from "@/app/_data/getEvent";
import { formatEventFields } from "@/app/_utils/formatEventFields";
import { redirect } from "next/navigation";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

const EventPage = async ({ params }: EventPageProps) => {
    try {
        const { id } = await params;
        const event = await getEventById(id);

        if (!event) {
            throw new Error("Evento não encontrado");
        }

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
                label: `${event.edition}º ${event.name}`,
                url: PATHS.EVENTS,
            },
        ] as const;

        const eventFields = formatEventFields(event);

        return (
            <PageLayoutSidebar breadcrumbList={breadcrumbList}>
                <div className="flex w-full justify-center">
                    <Card className="mb-8 mt-4 grid w-full lg:max-w-2xl">
                        <CardHeader className="pb-0">
                            <CardTitle className="flex w-full justify-center text-2xl font-bold">
                                {`${event.edition}º ${event.name}`}
                            </CardTitle>
                            <div className="flex w-full justify-end">
                                <EventPageActions event={event} />
                            </div>
                        </CardHeader>
                        <div className="flex w-full items-center justify-center px-4 py-2">
                            <Separator />
                        </div>
                        <CardContent>
                            <EventPageFields eventFields={eventFields} />
                        </CardContent>
                    </Card>
                </div>
            </PageLayoutSidebar>
        );
    } catch (error) {
        console.error(error);
        redirect(`${PATHS.ERROR_500}`);
    }
};

export default EventPage;
