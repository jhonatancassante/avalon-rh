import { useEvents } from "@/app/_contexts/EventContext";
import { DataTable } from "../data-table/data-table";
import { columnsNames, eventColumns } from "./event-columns";
import { DataTableEventActionButtons } from "./event-action-buttons";
import { DataTableEventFinishedActionButtons } from "./event-finished-action-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const EventDataTable = () => {
    const {
        eventListNotFinished,
        eventListFinished,
        isLoading,
        refreshEvents,
    } = useEvents();

    return (
        <main className="flex flex-col items-center py-6">
            <h1 className="text-2xl font-bold">Lista de Eventos</h1>
            <Tabs defaultValue="notFinished" className="mt-6 w-[90%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="notFinished">
                        Não Finalizados
                    </TabsTrigger>
                    <TabsTrigger value="finished">Finalizados</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="notFinished"
                    className="mx-auto w-[90%] py-3"
                >
                    <DataTable
                        columns={eventColumns}
                        itemList={eventListNotFinished}
                        isLoading={isLoading}
                        columnsNames={columnsNames}
                        actionButtons={
                            <DataTableEventActionButtons
                                selectedRows={[]}
                                onActionCompleted={refreshEvents}
                            />
                        }
                    />
                </TabsContent>
                <TabsContent value="finished" className="mx-auto w-[90%] py-3">
                    <DataTable
                        columns={eventColumns}
                        itemList={eventListFinished}
                        isLoading={isLoading}
                        columnsNames={columnsNames}
                        actionButtons={
                            <DataTableEventFinishedActionButtons
                                selectedRows={[]}
                                onActionCompleted={refreshEvents}
                            />
                        }
                    />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default EventDataTable;
