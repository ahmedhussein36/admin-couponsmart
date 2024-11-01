"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ReactCountryFlag from "react-country-flag";
import { useLocale } from "next-intl";

interface Props {
    list?: {
        id: number;
        name: {
            en: string;
            ar: string;
        };
        value: string;
        flag: string;
    }[];
    label?: string;
}

export function SelectCountry({ list, label }: Props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const locale = useLocale();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between hover:opacity-1"
                >
                    {value
                        ? list?.find((item) => item.value === value)?.name.en
                        : label || "select"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Searh" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {list?.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />

                                    <div>
                                        <ReactCountryFlag
                                            countryCode={item.flag}
                                            svg
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                            }}
                                        />
                                        <span className="ltr:ml-2 rtl:mr-2">
                                            {locale ==="en"?item.name.en : item.name.ar}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
