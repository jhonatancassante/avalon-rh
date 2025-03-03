import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import { PATHS } from "@/app/_constants/paths";

const SectionsPage = () => {
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
            label: "Setores",
            url: PATHS.SECTIONS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <h1>Página dos Setores</h1>
        </PageLayoutSidebar>
    );
};

export default SectionsPage;
