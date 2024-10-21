import React, { useEffect, useState } from "react";
import SelectItem from "./SelectItem";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ShortItem } from "@/app/types";
import EmptyState from "../EmptyState";
import SearchInput from "./SearchInput";

interface CategorySelectProps {
    name: string;
    lang: string;
    categories: any[];
}

const CategorySelect = ({ name, categories, lang }: CategorySelectProps) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [filteredData, setFilteredData] = useState(categories);
    const { setValue } = useFormContext();

    const t = useTranslations("instructions");

    const handleSelect = (category: any) => {
        if (selectedItems.includes(category)) {
            setSelectedItems(selectedItems.filter((item) => item !== category));
        } else {
            setSelectedItems([...selectedItems, category]);
        }
    };

    useEffect(() => {
        setValue(name, [...selectedItems]);
    }, [name, selectedItems, setValue]);

    useEffect(() => {
        const filtered = categories
            .filter((category) => category.locale === lang)
            .filter((category) =>
                category.name.toLowerCase().includes(categoryName.toLowerCase())
            );
        setFilteredData(filtered);
    }, [categories, categoryName, lang]);

    const handleSearch = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setCategoryName(e.target.value);
    };

    return (
        <div className=" w-full flex justify-center items-center">
            <div
                className="w-[500px] rounded-lg grid grid-cols-1 justify-items-center
                        text-neutral-500 dark:text-neutral-300
                        "
            >
                <div className="w-full">
                    <h2 className=" font-bold text-xl">
                        {t("choose category")}
                    </h2>
                    <p>{t("choose ctegory description")}</p>
                </div>

                {categories.length ? (
                    <div className="my-6 flex flex-col justify-start items-start gap-3 w-full">
                        <SearchInput
                            Placeholder="Search category"
                            onChange={handleSearch}
                        />
                        <div className="my-6 w-full grid grid-cols-3 gap-3 justify-items-start">
                            {filteredData.map((item, index) => (
                                <SelectItem
                                    key={item.id}
                                    label={item?.name || ""}
                                    value={item}
                                    selected={selectedItems.includes(item)}
                                    onClick={() => handleSelect(item)}
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
