"use client";
import React, { useCallback, useEffect, useState } from "react";
import CountryFlag from "react-country-flag";
import SelectItem from "./SelectItem";
import { useLocale, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { countries } from "@/app/utils/data";

type Country = {
    id: number;
    name: { ar: string; en: string };
    value: string;
    flag: string;
};

const Label = ({ name, flag }: { name: string; flag: string }) => {
    return (
        <div className="text-sm flex gap-2 items-center">
            {flag && (
                <CountryFlag
                    countryCode={flag}
                    svg
                    style={{ width: 18, height: 18 }}
                />
            )}
            <span>{name}</span>
        </div>
    );
};

export const CountrySelect = ({ name }: { name: string }) => {
    const { setValue, getValues } = useFormContext();
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const t = useTranslations("instructions");
    const locale = useLocale();

    // تحديث القيم عند التحميل
    useEffect(() => {
        const initialValues: Country[] = getValues(name) || [];
        setSelectedItems(new Set(initialValues.map((item) => item.id)));
    }, [getValues, name]);

    // تحديث القيم في الفورم
    const updateFormValues = useCallback(
        (updatedIds: Set<number>) => {
            const updatedCountries = countries.filter((c) =>
                updatedIds.has(c.id)
            );
            setValue(name, updatedCountries, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });
        },
        [setValue, name]
    );

    // التعامل مع التحديد
    const handleSelect = useCallback(
        (country: Country) => {
            setSelectedItems((prev) => {
                const updatedIds = new Set(prev);
                updatedIds.has(country.id)
                    ? updatedIds.delete(country.id)
                    : updatedIds.add(country.id);
                updateFormValues(updatedIds);
                return new Set(updatedIds);
            });
        },
        [updateFormValues]
    );

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-[700px] rounded-lg grid grid-cols-1 text-neutral-500 dark:text-neutral-300">
                <h2 className="font-bold text-xl">{t("choose countries")}</h2>
                <p>{t("choose countries description")}</p>

                <div className="my-6 grid grid-cols-4 gap-3">
                    {countries.map((item) => (
                        <SelectItem
                            key={item.id}
                            label={
                                <Label
                                    name={
                                        locale === "en"
                                            ? item.name.en
                                            : item.name.ar
                                    }
                                    flag={item.flag}
                                />
                            }
                            value={item}
                            selected={selectedItems.has(item.id)}
                            onClick={() => handleSelect(item)}
                        />
                    ))}
                </div>
            </div>

            {/* عرض العناصر المحددة */}
            {/* {selectedItems.size > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-xl my-3">{t("selected countries")}</h3>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(selectedItems).map((id) => {
                            const country = countries.find((c) => c.id === id);
                            return country ? (
                                <span
                                    key={id}
                                    className="bg-muted px-2 py-1 rounded-md"
                                >
                                    {country.name.ar}
                                </span>
                            ) : null;
                        })}
                    </div>
                </div>
            )} */}
        </div>
    );
};
