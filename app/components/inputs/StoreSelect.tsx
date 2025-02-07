import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import EmptyState from "../EmptyState";
import SearchInput from "./SearchInput";
import SelectStore from "./SelectStore";

interface StoreSelectProps {
    name: string;
    stores: any[];
    lang: string;
    onSelect: (value: string) => void;
}

const StoreSelect = ({ name, stores, lang, onSelect }: StoreSelectProps) => {
    const [storeName, setStoreName] = useState("");
    const [filteredData, setFilteredData] = useState(stores);

    const t = useTranslations("instructions");
    const { setValue, getValues } = useFormContext();

    const setCustomValue = useCallback(
        (name: string, value: any) => {
            setValue(name, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });
        },
        [setValue]
    );

    const handleSelect = (store: any) => {
        setCustomValue(name, store.id);
        onSelect(store.name);
    };

    /*======================= */
    useEffect(() => {
        const filtered = stores
            .filter((store) => store.locale === lang)
            .filter((store) =>
                store.name.toLowerCase().includes(storeName.toLowerCase())
            );
        setFilteredData(filtered);
    }, [lang, name, storeName, stores]);

    /*========================*/

    const handleSearch = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setStoreName(e.target.value);
    };

    return (
        <div className=" w-full flex justify-start items-start">
            <div
                className="w-full lg:w-[700px] rounded-lg grid grid-cols-1 justify-items-center
                        text-neutral-500 dark:text-neutral-300
                        "
            >
                <div className="w-full">
                    <h2 className=" font-bold text-xl">{t("choose store")}</h2>
                    <p>{t("choose store description")}</p>
                </div>

                {stores.length ? (
                    <div className="my-6 flex flex-col justify-start items-start gap-3 w-full">
                        <SearchInput
                            Placeholder="Search store"
                            onChange={handleSearch}
                        />
                        <div className="my-6 w-full flex justify-start items-start flex-wrap gap-3 justify-items-start">
                            {filteredData.map((item, index) => (
                                <SelectStore
                                    key={item.id}
                                    label={item?.name || ""}
                                    value={item}
                                    selected={item.id === getValues(name)}
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

export default StoreSelect;
