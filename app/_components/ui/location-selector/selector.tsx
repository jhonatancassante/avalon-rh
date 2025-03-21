import { SelectorList } from "./selector-list";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import { Button } from "../button";
import { ChevronsUpDown } from "lucide-react";

interface SelectorProps<T> {
    isDesktop: boolean;
    buttonLabel: string;
    items: T[];
    badgeList?: string[];
    badgeLabel?: string;
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder: string;
    emptyMessage: string;
    getItemLabel: (item: T) => string;
    getItemValue: (item: T) => string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Selector = <T,>({
    isDesktop,
    buttonLabel,
    items,
    badgeList,
    badgeLabel,
    selectedValue,
    onSelect,
    placeholder,
    emptyMessage,
    getItemLabel,
    getItemValue,
    isOpen,
    setIsOpen,
}: SelectorProps<T>) => {
    const Wrapper = isDesktop ? Popover : Drawer;
    const Trigger = isDesktop ? PopoverTrigger : DrawerTrigger;
    const Content = isDesktop ? PopoverContent : DrawerContent;

    return (
        <Wrapper open={isOpen} onOpenChange={setIsOpen}>
            <Trigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {buttonLabel}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </Trigger>

            <Content className="w-auto bg-red-600 p-0">
                <SelectorList
                    items={items}
                    badgeList={badgeList}
                    badgeLabel={badgeLabel}
                    selectedValue={selectedValue}
                    onSelect={onSelect}
                    placeholder={placeholder}
                    emptyMessage={emptyMessage}
                    getItemLabel={getItemLabel}
                    getItemValue={getItemValue}
                />
            </Content>
        </Wrapper>
    );
};
