import { EventWithSectors } from "@/app/_components/event-form/types";
import { Prisma, Sector } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface SelectedSectors {
    0: Sector | null;
    1: Sector | null;
    2: Sector | null;
    3: Sector | null;
}

export type UserStaffApply = Prisma.UserEventApplyGetPayload<{
    include: {
        userEventSectors: true;
    };
}>;

export type StaffApplySetState = Dispatch<
    SetStateAction<{
        eventList: EventWithSectors[];
        selectedEvent: EventWithSectors | null;
        sectorList: Sector[] | null;
        selectedSectors: SelectedSectors;
        staffApplyList: UserStaffApply[];
    }>
>;
