import { FormControl, FormItem, FormLabel } from "./form";
import { Checkbox } from "./checkbox";

interface CheckboxItemProps {
    value: string[];
    itemLabel: string;
    onChange: (value: string[]) => void;
}

const addItem = (
    value: string[],
    itemLabel: string,
    onChange: (value: string[]) => void,
) => {
    onChange([...value, itemLabel]);
};

const removeItem = (
    value: string[],
    itemLabel: string,
    onChange: (value: string[]) => void,
) => {
    onChange(value.filter((value) => value !== itemLabel));
};

export const CheckboxItem = ({
    value,
    itemLabel,
    onChange,
}: CheckboxItemProps) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0 px-4">
        <FormControl>
            <Checkbox
                checked={value.includes(itemLabel)}
                onCheckedChange={(checked) => {
                    if (checked) {
                        addItem(value, itemLabel, onChange);
                    } else {
                        removeItem(value, itemLabel, onChange);
                    }
                }}
            />
        </FormControl>
        <FormLabel className="text-sm font-normal">{itemLabel}</FormLabel>
    </FormItem>
);
