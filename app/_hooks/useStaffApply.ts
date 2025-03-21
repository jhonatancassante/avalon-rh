import { useCallback, useEffect, useMemo, useState } from "react";
import { useStaffApplyForm } from "@/app/_hooks/useStaffApplyForm";
import { getEventAreInscriptionsOpen } from "@/app/_data/getEvent";
import { getStaffApplyList } from "@/app/_data/getStaffApply";
import { updateOrCreateUserEventApply } from "@/app/_actions/updateUserEventApply";
import { useLoading } from "@/app/_contexts/LoadingContext";
import { EventWithSectors } from "../_components/event-form/types";
import { Sector } from "@prisma/client";
import {
    SelectedSectors,
    UserStaffApply,
} from "../_components/user-page/user-tabs/apply-tabs/types";

export const useStaffApply = (userId?: string) => {
    const { setIsLoading } = useLoading();
    const [state, setState] = useState({
        eventList: [] as EventWithSectors[],
        selectedEvent: null as EventWithSectors | null,
        sectorList: null as Sector[] | null,
        selectedSectors: {
            0: null,
            1: null,
            2: null,
            3: null,
        } as SelectedSectors,
        staffApplyList: [] as UserStaffApply[],
    });

    useEffect(() => {
        if (state.selectedEvent && state.staffApplyList) {
            const apply = state.staffApplyList.find(
                (apply) => apply.eventId === state.selectedEvent?.id,
            );

            if (apply) {
                const newSelectedSectors = { ...state.selectedSectors };
                apply.userEventSectors.forEach((sector) => {
                    const index = sector.optionOrder as keyof SelectedSectors;
                    newSelectedSectors[index] =
                        state.sectorList?.find(
                            (s) => s.id === sector.sectorId,
                        ) || null;
                });

                setState((prev) => ({
                    ...prev,
                    selectedSectors: newSelectedSectors,
                }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selectedEvent, state.staffApplyList]);

    const form = useStaffApplyForm({});

    const staffApply = useMemo(
        () =>
            state.staffApplyList.find(
                (apply) => apply.eventId === state.selectedEvent?.id,
            ) ?? null,
        [state.staffApplyList, state.selectedEvent],
    );

    const fetchData = useCallback(async () => {
        if (!userId) return;

        try {
            setIsLoading(true);

            const [events, applications] = await Promise.all([
                getEventAreInscriptionsOpen(),
                getStaffApplyList(userId),
            ]);

            setState((prev) => ({
                ...prev,
                eventList: events,
                staffApplyList: applications ?? [],
            }));
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = useCallback(
        async (values: Record<`sector${number}` | "eventId", string>) => {
            if (!userId || !state.selectedEvent) return;

            const userSectorsApply = Array.from({ length: 4 }).map(
                (_, index) => ({
                    sectorId: values[`sector${index}`],
                    optionOrder: index,
                }),
            );

            try {
                setIsLoading(true);

                await updateOrCreateUserEventApply(staffApply?.id, {
                    userId,
                    eventId: values.eventId,
                    userEventSectors: userSectorsApply,
                });

                await fetchData();
            } catch (error) {
                console.error("Falha na submissão:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [userId, state.selectedEvent, setIsLoading, staffApply?.id, fetchData],
    );

    return {
        form,
        ...state,
        staffApply,
        setState,
        onSubmit: handleSubmit,
    };
};
