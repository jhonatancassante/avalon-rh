"use client";

import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Configs } from "@prisma/client";
import { getConfigList } from "@/app/_data/getConfigs";
import { useLoading } from "@/app/_contexts/LoadingContext";

const ApplyTab = () => {
    const [configList, setConfigList] = useState<Configs[]>([]);
    const [activeTabsCount, setActiveTabsCount] = useState<number>(1);
    const { setIsLoading } = useLoading();

    const gridColumns = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
    };

    const fetchConfigs = useCallback(async () => {
        setIsLoading(true);
        const configs = await getConfigList();
        setConfigList(configs);
        setActiveTabsCount(
            1 +
                [
                    configs.find((c) => c.key === "presenterApply")?.value,
                    configs.find((c) => c.key === "photographerApply")?.value,
                ].filter(Boolean).length,
        );
        setIsLoading(false);
    }, [setIsLoading]);

    useEffect(() => {
        fetchConfigs();
    }, [fetchConfigs]);

    return (
        <div className="flex w-full flex-col items-center p-0 pb-4">
            <Tabs defaultValue="staff" className="w-full">
                <TabsList
                    className={`grid w-full ${gridColumns[activeTabsCount as keyof typeof gridColumns]}`}
                >
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                    {configList.find((c) => c.key === "presenterApply")
                        ?.value && (
                        <TabsTrigger value="presenter">
                            Apresentador
                        </TabsTrigger>
                    )}
                    {configList.find((c) => c.key === "photographerApply")
                        ?.value && (
                        <TabsTrigger value="photographer">
                            Fotógrafo
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="staff">Staff</TabsContent>
                {configList.find((c) => c.key === "presenterApply")?.value && (
                    <TabsContent value="presenter">Apresentador</TabsContent>
                )}
                {configList.find((c) => c.key === "photographerApply")
                    ?.value && (
                    <TabsContent value="photographer">Fotógrafo</TabsContent>
                )}
            </Tabs>
        </div>
    );
};

export default ApplyTab;
