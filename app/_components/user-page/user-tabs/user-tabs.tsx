import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import UserFields from "../user-fields";
import ApplyTabs from "./apply-tabs/apply-tabs";

interface UserTabsProps {
    userFields: { label: string; value: string | string[] }[];
}

const UserTabs = ({ userFields }: UserTabsProps) => {
    return (
        <Tabs defaultValue="profile" className="sm:w-[100%] sm:p-0 lg:w-[80%]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="apply">Candidatar-se</TabsTrigger>
                <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <UserFields userFields={userFields} />
            </TabsContent>
            <TabsContent value="apply">
                <ApplyTabs />
            </TabsContent>
            <TabsContent value="notes">
                <Card>
                    <CardHeader>
                        <CardTitle>Vazio</CardTitle>
                        <CardDescription>
                            Ainda não temos nada por aqui!
                        </CardDescription>
                    </CardHeader>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default UserTabs;
