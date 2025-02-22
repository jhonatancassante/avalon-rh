import { useEvents } from "@/app/_contexts/EventContext";
import { DataTable } from "./data-table";
import { eventColumns } from "../data-table/event-columns";

const EventDataTable = () => {
    const { eventList, isLoading, refreshEvents } = useEvents();

    const columnsWithFilters = [
        { field: "name", label: "nome" },
        { field: "date", label: "data" },
        { field: "dateToClose", label: "data de encerramento" },
    ];

    return (
        <main className="flex flex-col items-center py-6">
            <h1 className="text-2xl font-bold">Lista de Eventos</h1>
            <div className="mx-auto w-full py-6 md:max-w-[80%]">
                <DataTable
                    columns={eventColumns}
                    itemList={eventList}
                    isLoading={isLoading}
                    columnsWithFilters={columnsWithFilters}
                    refreshList={refreshEvents}
                />
            </div>
        </main>
    );
};

export default EventDataTable;
