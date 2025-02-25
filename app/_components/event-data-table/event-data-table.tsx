import { useEvents } from "@/app/_contexts/EventContext";
import { DataTable } from "../data-table/data-table";
import { eventColumns } from "../data-table/event-columns";
import { DataTableEventActionButtons } from "./event-action-buttons";

const EventDataTable = () => {
    const { eventList, isLoading, refreshEvents } = useEvents();

    const columnsWithFilters = [
        { field: "name", label: "nome" },
        { field: "date", label: "data" },
        { field: "dateToOpen", label: "data de abertura" },
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
                    actionButtons={
                        <DataTableEventActionButtons
                            selectedRows={[]}
                            onActionCompleted={refreshEvents}
                        />
                    }
                />
            </div>
        </main>
    );
};

export default EventDataTable;
