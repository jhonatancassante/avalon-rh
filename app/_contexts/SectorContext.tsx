import { Sector } from "@prisma/client";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { getSectorList } from "../_data/getSector";

interface SectorContextType {
    sectorList: Sector[];
    sector: Sector | null;
    isLoading: boolean;
    sectorError: string | null;
    formDialog: boolean;
    setSectorList: (sectors: Sector[]) => void;
    setSector: (sector: Sector) => void;
    setFormDialog: (isOpen: boolean) => void;
    refreshSectors: () => Promise<void>;
}

const SectorContext = createContext<SectorContextType | undefined>(undefined);

export const SectorProvider = ({
    children,
}: {
    readonly children: ReactNode;
}) => {
    const [sectorList, setSectorList] = useState<Sector[]>([]);
    const [sector, setSector] = useState<Sector | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sectorError, setSectorError] = useState<string | null>(null);
    const [formDialog, setFormDialog] = useState(false);

    const fetchSectors = useCallback(async () => {
        try {
            setIsLoading(true);

            const sectors = await getSectorList();

            setSectorList(sectors);
        } catch (error) {
            console.error("Erro ao buscar setores:", error);
            setSectorError("Erro ao buscar setores");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshSectors = useCallback(async () => {
        await fetchSectors();
    }, [fetchSectors]);

    useEffect(() => {
        fetchSectors();
    }, [fetchSectors]);

    const contextValue = useMemo(
        () => ({
            sectorList,
            sector,
            isLoading,
            sectorError,
            formDialog,
            setSectorList,
            setSector,
            setFormDialog,
            refreshSectors,
        }),
        [
            sectorList,
            sector,
            isLoading,
            sectorError,
            formDialog,
            refreshSectors,
            setSector,
        ],
    );

    return (
        <SectorContext.Provider value={contextValue}>
            {children}
        </SectorContext.Provider>
    );
};

export const useSectors = () => {
    const context = useContext(SectorContext);
    if (!context) {
        throw new Error("useSectors must be used within a SectorContext");
    }
    return context;
};
