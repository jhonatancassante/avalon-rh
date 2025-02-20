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
    const lastItem = breadcrumbList.slice(-1);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {allExceptLast.map((item) => (
                    <>
                        <BreadcrumbItem
                            className="hidden md:block"
                            key={item.label}
                        >
                            <BreadcrumbLink href={item.url}>
                                {item.label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>{lastItem[0].label}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbAdmin;
