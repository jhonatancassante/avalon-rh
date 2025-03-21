import { Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../command";
import { Badge } from "../badge";

interface SelectorListProps<T> {
    items: T[];
    badgeList?: string[];
    badgeLabel?: string;
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder: string;
    emptyMessage: string;
    getItemLabel: (item: T) => string;
    getItemValue: (item: T) => string;
}

export const SelectorList = <T,>({
    items,
    badgeList,
    badgeLabel,
    selectedValue,
    onSelect,
    placeholder,
    emptyMessage,
    getItemLabel,
    getItemValue,
}: SelectorListProps<T>) => {
    return (
        <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                    {items.map((item) => {
                        const value = getItemValue(item);
                        return (
                            <CommandItem
                                key={value}
                                value={value}
                                onSelect={() => onSelect(value)}
                                className="flex w-full items-center justify-between gap-4"
                            >
                                {getItemLabel(item)}
                                <div className="flex items-center justify-between gap-4">
                                    <Badge
                                        className={`ml-auto text-[10px] ${
                                            badgeList?.some(
                                                (badgeItem) =>
                                                    badgeItem === value,
                                            )
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        {badgeLabel}
                                    </Badge>
                                    <Check
                                        className={`ml-auto ${
                                            value === selectedValue
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    />
                                </div>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};
