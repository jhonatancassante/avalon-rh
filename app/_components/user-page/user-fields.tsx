import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
                                    <ul className="px-4">
                                        {fieldValue.map((item: string) => (
                                            <li
                                                key={item}
                                                className="list-inside list-disc px-4"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
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
