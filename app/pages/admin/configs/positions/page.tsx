import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";

const PositionsPage = () => {
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
            label: "Cargos",
            url: PATHS.POSITIONS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <h1>Página dos Cargos</h1>
        </PageLayoutSidebar>
    );
};

export default PositionsPage;
