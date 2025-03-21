import PageLayout from "@/app/_components/page-layout";
import { CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import UserProfileCard from "@/app/_components/user-page/user-profile-card";
import UserTabs from "@/app/_components/user-page/user-tabs/user-tabs";
import { PATHS } from "@/app/_constants/paths";
import { getUser } from "@/app/_data/getUser";
import { formatUserFields } from "@/app/_utils/formatUserFields";
import { redirect } from "next/navigation";

interface UserPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UserPage = async ({ params, searchParams }: UserPageProps) => {
    try {
        const { id } = await params;
        const resolvedSearchParams = await searchParams;

        const user = await getUser(id);

        const validTabs = ["profile", "apply", "notes"];
        const tabParam = resolvedSearchParams.tab;
        const initialTab =
            typeof tabParam === "string" && validTabs.includes(tabParam)
                ? tabParam
                : "profile";

        if (!user) {
            throw new Error("User not found!");
        }

        const userFields = formatUserFields({ user });

        return (
            <PageLayout>
                <UserProfileCard user={user} />
                <div className="flex w-full items-center justify-center">
                    <Separator className="w-[90%]" />
                </div>
                <CardContent className="flex w-full flex-col items-center p-0 py-6 lg:px-6">
                    <UserTabs userFields={userFields} initialTab={initialTab} />
                </CardContent>
            </PageLayout>
        );
    } catch (error) {
        console.error(error);
        redirect(`${PATHS.ERROR_500}`);
    }
};

export default UserPage;
