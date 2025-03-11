import { Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../command";

interface SelectorListProps<T> {
    items: T[];
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder: string;
    emptyMessage: string;
    getItemLabel: (item: T) => string;
    getItemValue: (item: T) => string;
}

export const SelectorList = <T,>({
    items,
    selectedValue,
    onSelect,
    placeholder,
    emptyMessage,
    getItemLabel,
    getItemValue,
}: SelectorListProps<T>) => (
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
                        >
                            {getItemLabel(item)}
                            <Check
                                className={`ml-auto ${
                                    value === selectedValue
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            />
                        </CommandItem>
                    );
                })}
            </CommandGroup>
        </CommandList>
    </Command>
);
