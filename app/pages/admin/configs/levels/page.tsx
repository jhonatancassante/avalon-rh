"use client";

import LevelDataTable from "@/app/_components/level-data-table/level-data-table";
import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";
import { LevelProvider } from "@/app/_contexts/LevelContext";

const LevelsPage = () => {
    const breadcrumbList = [
        {
            label: "Administração",
            url: PATHS.ADMIN,
        },
        {
            label: "Configurações",
            url: PATHS.CONFIGS,
        },
        {
            label: "Níveis",
            url: PATHS.LEVELS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <LevelProvider>
                <LevelDataTable />
            </LevelProvider>
        </PageLayoutSidebar>
    );
};

export default LevelsPage;
