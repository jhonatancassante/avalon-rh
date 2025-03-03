import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface EventPageFieldsProps {
    eventFields: { label: string; value: string }[];
}

const EventPageFields = ({ eventFields }: EventPageFieldsProps) => {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="px-0 lg:px-6">
                <CardTitle>Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0 lg:px-6">
                {eventFields.map((field) => {
                    if (
                        field.label === "As Inscrições Estão Abertas?" ||
                        field.label === "O Evento Foi Finalizado?"
                    ) {
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

export default EventPageFields;
