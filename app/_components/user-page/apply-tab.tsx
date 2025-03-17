"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Configs } from "@prisma/client";
import { getConfigList } from "@/app/_data/getConfigs";

const ApplyTab = () => {
    const [configList, setConfigList] = useState<Configs[]>([]);
    const [presenterApply, photographerApply] = [
        "presenterApply",
        "photographerApply",
    ].map((configKey) => {
        return configList.find((c) => c.key === configKey);
    });

    const fetchConfigs = async () => {
        const configs = await getConfigList();
        setConfigList(configs);
    };

    useEffect(() => {
        fetchConfigs();
    }, []);

    return (
        <div className="flex w-full flex-col items-center p-0 pb-4">
            <Tabs defaultValue="staff" className="sm:p- w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                    {presenterApply?.value && (
                        <TabsTrigger value="presenter">
                            Apresentador
                        </TabsTrigger>
                    )}
                    {photographerApply?.value && (
                        <TabsTrigger value="photographer">
                            Fotógrafo
                        </TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="staff">Staff</TabsContent>
                {presenterApply?.value && (
                    <TabsContent value="presenter">Apresentador</TabsContent>
                )}
                {photographerApply?.value && (
                    <TabsContent value="photographer">Fotógrafo</TabsContent>
                )}
            </Tabs>
        </div>
    );
};

export default ApplyTab;
