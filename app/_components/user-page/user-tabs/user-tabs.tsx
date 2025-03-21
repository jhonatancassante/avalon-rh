"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import UserFields from "../user-fields";
import ApplyTabs from "./apply-tabs/apply-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserComplete } from "@/app/_types/userComplete";

interface UserTabsProps {
    user: UserComplete;
    userFields: { label: string; value: string | string[] }[];
    initialTab?: string;
    eventId?: string;
}

const UserTabs = ({ user, userFields, initialTab, eventId }: UserTabsProps) => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(initialTab ?? "profile");

    useEffect(() => {
        if (initialTab && initialTab !== currentTab) {
            setCurrentTab(initialTab);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTab]);

    const handleTabChange = (value: string) => {
        setCurrentTab(value);
        router.replace(`?tab=${value}`, { scroll: false });
    };

    return (
        <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
            className="sm:w-[100%] sm:p-0 lg:w-[80%]"
        >
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="apply">Candidatar-se</TabsTrigger>
                <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <UserFields user={user} userFields={userFields} />
            </TabsContent>
            <TabsContent value="apply">
                <ApplyTabs eventId={eventId} />
            </TabsContent>
            <TabsContent value="notes">
                <Card>
                    <CardHeader>
                        <CardTitle>Vazio</CardTitle>
                        <CardDescription>
                            Ainda não temos nada por aqui!
                        </CardDescription>
                    </CardHeader>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default UserTabs;
