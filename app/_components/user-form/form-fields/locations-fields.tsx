import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_schemas/formSchema";
import { useMediaQuery } from "@react-hook/media-query";
import StateField from "./state-field";
import CityField from "./city-field";
import { useLocations } from "@/app/_hooks/useLocations";

interface LocationsFieldsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

const LocationsFields = ({ form }: LocationsFieldsProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { states, cities, fetchCities, fetchStates } = useLocations(form);

    useEffect(() => {
        fetchStates();
    }, [fetchStates]);

    return (
        <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
            <StateField
                form={form}
                states={states}
                isDesktop={isDesktop}
                fetchCities={fetchCities}
            />
            <CityField form={form} cities={cities} isDesktop={isDesktop} />
        </div>
    );
};

export default LocationsFields;
