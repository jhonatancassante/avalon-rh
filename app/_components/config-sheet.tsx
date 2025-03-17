import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Configs } from "@prisma/client";
import { getConfigList } from "../_data/getConfigs";
import { updateOrCreateConfig } from "../_actions/updateConfigs";

interface ConfigSheetProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ConfigSheet = ({ open, setOpen }: ConfigSheetProps) => {
    const [configList, setConfigList] = useState<Configs[]>([]);

    const fetchConfigs = async () => {
        const configs = await getConfigList();
        setConfigList(configs);
    };

    useEffect(() => {
        fetchConfigs();
    }, []);

    const updateConfig = async (key: string, newValue: boolean) => {
        try {
            setConfigList((prev) =>
                prev.map((config) =>
                    config.key === key
                        ? { ...config, value: newValue }
                        : config,
                ),
            );

            await updateOrCreateConfig(key, newValue);

            await fetchConfigs();
        } catch (error) {
            setConfigList((prev) =>
                prev.map((config) =>
                    config.key === key
                        ? { ...config, value: !newValue }
                        : config,
                ),
            );
            console.error("Erro ao atualizar configuração:", error);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="p-6 lg:max-w-[300px]">
                <SheetHeader className="mb-10">
                    <SheetTitle>Configurações do Servidor</SheetTitle>
                    <Separator />
                </SheetHeader>

                <div className="flex flex-col gap-4 p-6">
                    {["presenterApply", "photographerApply"].map(
                        (configKey) => {
                            const config = configList.find(
                                (c) => c.key === configKey,
                            );
                            return (
                                <div
                                    key={configKey}
                                    className="flex items-center space-x-2"
                                >
                                    <Switch
                                        id={configKey}
                                        checked={config?.value ?? false}
                                        onCheckedChange={(checked) =>
                                            updateConfig(configKey, checked)
                                        }
                                    />
                                    <Label htmlFor={configKey}>
                                        {configKey === "presenterApply"
                                            ? "Abrir inscrições para Apresentador"
                                            : "Abrir inscrições para Fotógrafo"}
                                    </Label>
                                </div>
                            );
                        },
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ConfigSheet;
