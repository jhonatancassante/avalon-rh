import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface UserFieldsProps {
    userFields: { [key: string]: string | string[] };
}

const UserFields = ({ userFields }: UserFieldsProps) => {
    const fields = [
        "CPF:",
        "Pronome",
        "Nome Completo:",
        "Nome Social:",
        "Apelido:",
        "Chave Pix",
        "Data de Nascimento:",
        "Email do Google Account",
        "Email de Contato:",
        "Celular / Whatsapp:",
        "Estado",
        "Cidade",
        "É Portador de Deficiencia?",
        "Qual sua deficiência?",
        "Precisa de algum auxílio específico?",
    ];

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 lg:px-6">
                <CardTitle>Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0 lg:px-6">
                {Object.keys(userFields).map((field, index) => {
                    if (
                        userFields["isPcd"] === "Não" &&
                        (field === "deficiency" || field === "extraSupport")
                    ) {
                        return null;
                    }

                    if (
                        userFields["isPcd"] === "Sim" &&
                        (field === "deficiency" || field === "extraSupport")
                    ) {
                        const fieldValue = userFields[field];

                        if (Array.isArray(fieldValue)) {
                            return (
                                <div
                                    className="space-y-1"
                                    key={`${index} - ${fieldValue}`}
                                >
                                    <Label htmlFor={fields[index]}>
                                        {fields[index]}
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
                        <div
                            className="space-y-1"
                            key={`${index} - ${userFields[field]}`}
                        >
                            <Label htmlFor={fields[index]}>
                                {fields[index]}
                            </Label>
                            <Input
                                id={fields[index]}
                                defaultValue={userFields[field]}
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
