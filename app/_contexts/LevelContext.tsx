import { Level } from "@prisma/client";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getLevelList } from "../_data/getLevel";

interface LevelContextType {
    levelList: Level[];
    level: Level | null;
    isLoading: boolean;
    levelError: string | null;
    formDialog: boolean;
    setLevelList: (Levels: Level[]) => void;
    setLevel: (Level: Level | null) => void;
    setFormDialog: (isOpen: boolean) => void;
    refreshLevels: () => Promise<void>;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({
    children,
}: {
    readonly children: ReactNode;
}) => {
    const [levelList, setLevelList] = useState<Level[]>([]);
    const [level, setLevel] = useState<Level | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [levelError, setLevelError] = useState<string | null>(null);
    const [formDialog, setFormDialog] = useState(false);

    const fetchLevels = useCallback(async () => {
        try {
            setIsLoading(true);

            const sectors = await getLevelList();

            setLevelList(sectors);
        } catch (error) {
            console.error("Erro ao buscar setores:", error);
            setLevelError("Erro ao buscar setores");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshLevels = useCallback(async () => {
        await fetchLevels();
    }, [fetchLevels]);

    useEffect(() => {
        fetchLevels();
    }, [fetchLevels]);

    const contextValue = useMemo(
        () => ({
            levelList,
            level,
            isLoading,
            levelError,
            formDialog,
            setLevelList,
            setLevel,
            setFormDialog,
            refreshLevels,
        }),
        [
            levelList,
            level,
            isLoading,
            levelError,
            formDialog,
            refreshLevels,
            setLevel,
        ],
    );

    return (
        <LevelContext.Provider value={contextValue}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevels = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error("useLevels must be used within a LevelContext");
    }
    return context;
};
