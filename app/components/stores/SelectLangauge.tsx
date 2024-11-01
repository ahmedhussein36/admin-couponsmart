/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import SelectItem from "../inputs/SelectItem";
import { useTranslations } from "next-intl";
import Input from "../inputs/Input";

interface langProps { 
    onLocale: (value: string) => void;
    value?: string;
    coupon?: boolean
}

const SelectLangauge = ({ onLocale, value , coupon}: langProps) => {
    const t = useTranslations();

    const Label = ({
        langouge,
        flag,
    }: {
        langouge: string;
        flag: string | any;
    }) => {
        return (
            <div className=" flex gap-2 justify-start items-center">
                <img src={flag} alt="ae-flag" width={25} />
                <span>{langouge}</span>
            </div>
        );
    };

    return (
        <div className=" bg-white  dark:bg-transparent p-6 rounded-lg w-full flex justify-center items-start">
            <div className="w-[500px] rounded-lg grid grid-cols-1 text-neutral-500 dark:text-neutral-300">
                <div className="w-full">
                    <h2 className=" font-bold text-xl">
                        {t("instructions.choose langouge")}
                    </h2>
                    <p>{t("instructions.choose langouge description")}</p>
                </div>
                <div className=" my-6 flex w-full flex-col justify-center items-center gap-3">
                    <SelectItem
                        label={
                            (
                                <Label langouge="العربية" flag={"/ae.png"} />
                            ) as any
                        }
                        value={"ar"}
                        selected={value === "ar"}
                        onClick={() => {
                            onLocale("ar");
                        }}
                    />

                    <SelectItem
                        label={
                            (
                                <Label langouge="English" flag={"/usa.png"} />
                            ) as any
                        }
                        value={"en"}
                        selected={value === "en"}
                        onClick={() => {
                            onLocale("en");
                        }}
                    />
                </div>
                {!coupon && (
                    <Input
                        name={"translateLink"}
                        label={t("inputs.translation link")}
                        className="border text-base"
                    />
                )}
            </div>
        </div>
    );
};

export default SelectLangauge;
