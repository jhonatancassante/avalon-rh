import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import BreadcrumbAdmin from "./breadcrumb-admin";

interface PageLayoutSidebarProps {
    children: ReactNode;
    breadcrumbList: readonly { label: string; url: string }[];
}

const PageLayoutSidebar = ({
    children,
    breadcrumbList,
}: PageLayoutSidebarProps) => {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 shadow-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <BreadcrumbAdmin breadcrumbList={breadcrumbList} />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </>
    );
};

export default PageLayoutSidebar;
