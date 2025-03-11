import { EventComplete } from "../event-form/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface EventPageSectorsProps {
    event: EventComplete;
}

const EventPageSectors = ({ event }: EventPageSectorsProps) => {
    const eventSectors = event.eventSectors;
    const sectors = eventSectors.map((sector) => sector.sector);

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Setores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {sectors.map((sector) => (
                    <div
                        key={sector.id}
                        className="flex items-center gap-2 pl-4"
                    >
                        <Checkbox id={sector.id} checked />
                        <label
                            htmlFor={sector.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {`${sector.name} - Líder: ${sector.leader.profile?.socialName}`}
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default EventPageSectors;
