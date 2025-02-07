"use client";
import React, { useCallback, useMemo, useState } from "react";
import SelectItem from "./SelectItem";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import EmptyState from "../EmptyState";
import SearchInput from "./SearchInput";

interface CategorySelectProps {
    name: string;
    lang: string;
    categories: { id: string; name: string; locale: string }[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
    name,
    categories,
    lang,
}) => {
    const { setValue, getValues } = useFormContext();
    const t = useTranslations("instructions");

    const initialSelectedIds: any = useMemo(
        () => new Set(getValues(name) || []),
        [getValues, name]
    );
    const [selectedItemIds, setSelectedItemIds] =
        useState<Set<string>>(initialSelectedIds);
    const [searchTerm, setSearchTerm] = useState("");

    const setCustomValue = useCallback(
        (value: string[]) => {
            setValue(name, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });
        },
        [setValue, name]
    );

    const filteredCategories = useMemo(
        () =>
            categories
                .filter((category) => category.locale === lang)
                .filter((category) =>
                    category.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                ),
        [categories, lang, searchTerm]
    );

    const handleSelect = (categoryId: string) => {
        setSelectedItemIds((prev) => {
            const newSelected = new Set(prev);
            newSelected.has(categoryId)
                ? newSelected.delete(categoryId)
                : newSelected.add(categoryId);
            setCustomValue(Array.from(newSelected));
            return newSelected;
        });
    };

    return (
        <div className="mt-6 w-full flex justify-start">
            <div className="w-[500px] rounded-lg grid grid-cols-1 text-neutral-500 dark:text-neutral-300">
                <div className="w-full">
                    <h2 className="font-bold text-xl">
                        {t("choose category")}
                    </h2>
                    <p>{t("choose ctegory description")}</p>
                </div>

                {categories.length ? (
                    <div className="my-6 flex flex-col gap-3 w-full">
                        <SearchInput
                            Placeholder="Search category"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="my-6 w-full grid gap-3">
                            {filteredCategories.map((item) => (
                                <SelectItem
                                    key={item.id}
                                    label={item.name}
                                    value={item.id}
                                    selected={selectedItemIds.has(item.id)}
                                    onClick={() => handleSelect(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyState title="No categories found!" subtitle="" />
                )}
            </div>
        </div>
    );
};

export default CategorySelect;
