import { EventWithSectors } from "@/app/_components/event-form/types";
import FormTooltip from "@/app/_components/form-fields/form-tooltip";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Selector } from "@/app/_components/ui/location-selector/selector";
import { useIsMobile } from "@/app/_hooks/useMobile";
import { useSelection } from "@/app/_hooks/useSelection";
import { Sector } from "@prisma/client";
import { Path, UseFormReturn } from "react-hook-form";
import { TypeOf, z, ZodTypeAny } from "zod";
import { UserStaffApply } from "./types";

interface EventFieldSelectProps<T extends ZodTypeAny> {
    form: UseFormReturn<z.infer<T>>;
    eventList: EventWithSectors[];
    applyList: UserStaffApply[] | null;
    selectedEvent?: EventWithSectors | null;
    setSelectedEvent: (event: EventWithSectors) => void;
    setSectorList: (sectors: Sector[]) => void;
}

const EventFieldSelect = <T extends ZodTypeAny>({
    form,
    eventList,
    applyList,
    selectedEvent,
    setSelectedEvent,
    setSectorList,
}: EventFieldSelectProps<T>) => {
    const isMobile = useIsMobile();
    const { isOpen, setIsOpen, selectedValue, handleSelect } = useSelection({
        form,
        fieldName: "eventId",
        onSelect: (value) => {
            const event = eventList.find((event) => event.id === value);
            if (event) {
                setSelectedEvent(event);
                const sectors = event.eventSectors.map(
                    (eventSector) => eventSector.sector,
                );
                sectors.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setSectorList(sectors);
            }
        },
    });
    const buttonLabel = selectedEvent
        ? `${selectedEvent.edition}º ${selectedEvent.name}`
        : "Selecione o Evento";

    const eventApplyList = applyList?.map((apply) => apply.eventId);

    return (
        <FormField
            control={form.control}
            name={"eventId" as Path<TypeOf<T>>}
            render={() => (
                <FormItem className="flex w-full flex-col">
                    <div className="flex items-center gap-2">
                        <FormLabel>Evento</FormLabel>
                        <FormTooltip msg="Selecione um evento" />
                    </div>

                    <FormControl>
                        <Selector
                            isDesktop={!isMobile}
                            buttonLabel={buttonLabel}
                            items={eventList}
                            badgeList={eventApplyList}
                            badgeLabel={"Aplicado"}
                            selectedValue={selectedValue}
                            onSelect={handleSelect}
                            placeholder="Procure o evento..."
                            emptyMessage="Nenhum evento encontrado"
                            getItemLabel={(item) =>
                                `${item.edition}º ${item.name}`
                            }
                            getItemValue={(item) => item.id}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default EventFieldSelect;
