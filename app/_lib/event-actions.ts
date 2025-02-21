import { Row } from "@tanstack/react-table";
import { Event } from "@prisma/client";

export const handleEventAction = async <TData>(
    rows: Row<TData>[],
    action: (eventId: string) => Promise<void>,
    onCompleted: () => Promise<void>,
) => {
    await Promise.all(
        rows.map(async (row) => {
            const event = row.original as Event;
            await action(event.id);
            row.toggleSelected();
        }),
    );
    await onCompleted();
};
