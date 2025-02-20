import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

type BreadcrumbItem = {
    label: string;
    url: string;
};

interface BreadcrumbAdminProps {
    breadcrumbList: readonly BreadcrumbItem[];
}

const BreadcrumbAdmin = ({ breadcrumbList }: BreadcrumbAdminProps) => {
    const allExceptLast = breadcrumbList.slice(0, -1);
    const lastItem = breadcrumbList[breadcrumbList.length - 1];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {allExceptLast.map((item, index) => (
                    <div
                        key={`${item.label}-${index}`}
                        className="hidden items-center gap-3 md:inline-flex"
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.url}>
                                {item.label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </div>
                ))}
                <BreadcrumbItem key={lastItem.label}>
                    <BreadcrumbPage>{lastItem.label}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbAdmin;
