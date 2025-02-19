import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset } from "./ui/sidebar";

interface PageLayoutSidebarProps {
    children: ReactNode;
}

const PageLayoutSidebar = ({ children }: PageLayoutSidebarProps) => {
    return (
        <>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </>
    );
};

export default PageLayoutSidebar;
