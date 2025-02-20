"use client";

import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { useSession } from "next-auth/react";

const AdminPage = () => {
    const { data: session } = useSession();

    const breadcrumbList = [
        {
            label: "Perfil",
            url: `${PATHS.USER}/${session?.user.id}`,
        },
        {
            label: "Admin",
            url: PATHS.ADMIN,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
        </PageLayoutSidebar>
    );
};

export default AdminPage;
