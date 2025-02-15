import { ReactNode } from "react";
import { Card } from "./ui/card";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <main className="flex justify-center py-5 sm:px-2 lg:px-24">
            <Card className="mx-4 my-1 flex w-full flex-col items-center justify-center p-2 lg:max-w-4xl">
                {children}
            </Card>
        </main>
    );
};

export default PageLayout;
