import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

interface RowsPerPageSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: number[];
}

export const RowsPerPageSelect = ({
    value,
    onChange,
    options,
}: Readonly<RowsPerPageSelectProps>) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent side="top">
                {options.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
