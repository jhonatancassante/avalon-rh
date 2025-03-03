import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface UserFieldsProps {
    userFields: { label: string; value: string | string[] }[];
}

const UserFields = ({ userFields }: UserFieldsProps) => {
    const isPcdIndex = userFields.findIndex(
        (field) => field.label === "É Portador de Deficiencia?",
    );

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 lg:px-6">
                <CardTitle>Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0 lg:px-6">
                {userFields.map((field) => {
                    if (
                        userFields[isPcdIndex].value === "Não" &&
                        (field.label === "Qual sua deficiência?" ||
                            field.label ===
                                "Precisa de algum auxílio específico?")
                    ) {
                        return null;
                    }

                    if (field.label === "É Portador de Deficiencia?") {
                        return (
                            <div
                                key={field.label}
                                className="flex flex-col gap-2 py-2"
                            >
                                <Label>{field.label}</Label>
                                <RadioGroup
                                    key={field.label}
                                    className="flex items-center gap-2 px-4"
                                >
                                    <RadioGroupItem
                                        value={field.label}
                                        checked
                                    />{" "}
                                    <Label className="font-normal">
                                        {field.value}
                                    </Label>
                                </RadioGroup>
                            </div>
                        );
                    }

                    if (
                        userFields[isPcdIndex].value === "Sim" &&
                        (field.label === "Qual sua deficiência?" ||
                            field.label ===
                                "Precisa de algum auxílio específico?")
                    ) {
                        const fieldValue = field.value;

                        if (Array.isArray(fieldValue)) {
                            return (
                                <div className="space-y-1" key={field.label}>
                                    <Label htmlFor={field.label}>
                                        {field.label}
                                    </Label>
                                    <div className="flex flex-col items-start gap-3 px-5">
                                        {fieldValue.map((item: string) => (
                                            <div
                                                key={item}
                                                className="m-0 flex items-center space-x-2"
                                            >
                                                <Checkbox id="terms" checked />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    }

                    return (
                        <div className="space-y-1" key={field.label}>
                            <Label htmlFor={field.label}>{field.label}</Label>
                            <Input
                                id={field.label}
                                defaultValue={field.value}
                                readOnly
                            />
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default UserFields;
