import PageLayoutSidebar from "@/app/_components/page-layout-sidebar";
import SectorDataTable from "@/app/_components/sector-data-table/sector-data-table";
import { PATHS } from "@/app/_constants/paths";

const SectorsPage = () => {
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
            url: PATHS.SECTORS,
        },
    ] as const;

    return (
        <PageLayoutSidebar breadcrumbList={breadcrumbList}>
            <SectorDataTable />
        </PageLayoutSidebar>
    );
};

export default SectorsPage;
