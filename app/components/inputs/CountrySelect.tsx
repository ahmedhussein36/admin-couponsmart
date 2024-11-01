"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import CountryFlag from "react-country-flag";
import SelectItem from "./SelectItem";
import { useLocale, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { countries } from "@/app/utils/data";

export const CountrySelect = ({ name }: { name: string }) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
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

    const handleSelect = (value: any) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(
                selectedItems.filter((item) => item.id !== value.id)
            );
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    useEffect(() => {
        setCustomValue(name, [...selectedItems]);
    }, [name, selectedItems, setCustomValue]);

    const t = useTranslations("instructions");
    const locale = useLocale();

    const Label = ({ name, flag }: { name: string; flag: string | any }) => {
        return (
            <div className=" text-sm flex gap-2 justify-start items-center">
                {flag !== "" && (
                    <CountryFlag
                        countryCode={flag}
                        svg
                        style={{ width: "18px", height: "18px" }}
                    />
                )}
                <span>{name}</span>
            </div>
        );
    };
    return (
        <div className=" w-full flex justify-center items-start">
            <div className="w-[700px] rounded-lg grid grid-cols-1 text-neutral-500 dark:text-neutral-300">
                <div className="w-full">
                    <h2 className=" font-bold text-xl">
                        {t("choose countries")}
                    </h2>
                    <p>{t("choose countries description")}</p>
                </div>
                <div className=" my-6  w-full grid grid-cols-4 gap-3">
                    {countries.map((item) => (
                        <SelectItem
                            key={item.id}
                            label={
                                (
                                    <Label
                                        name={
                                            locale === "en"
                                                ? item.name.en
                                                : item.name.ar
                                        }
                                        flag={item?.flag || ""}
                                    />
                                ) as any
                            }
                            value={item}
                            selected={selectedItems.includes(item)}
                            onClick={() => handleSelect(item)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
