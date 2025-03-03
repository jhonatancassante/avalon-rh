import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";

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
            <h1>Página dos Níveis</h1>
        </PageLayoutSidebar>
    );
};

export default LevelsPage;
