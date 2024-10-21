"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const LangaugeTaps = ({
    languageChange,
}: {
    languageChange: (value: string) => void;
}) => {
    const t = useTranslations("table");

    const taps = [
        { id: 1, label: t("arabic"), value: "ar" },
        { id: 2, label: t("english"), value: "en" },
        { id: 3, label: t("all languages"), value: "all" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleTapClick = (index: number, lang: string) => {
        setCurrentIndex(index);
        languageChange(lang);
    };

    return (
        <div className="w-fit text-sm grid grid-cols-3 gap-3">
            {taps.map((tap, index) => {
                const isActive = index === currentIndex;
                return (
                    <button
                        onClick={() => handleTapClick(index, tap.value)}
                        key={index}
                        className={`
                            text-center dark:text-neutral-300
                            hover:bg-slate-200 dark:hover:bg-gray-700
                            py-1 px-3 rounded transition-all duration-200 ease-in-out
                            ${
                                isActive
                                    ? "border border-sky-500 bg-slate-200 dark:bg-gray-700/20"
                                    : "border border-sky-500/0 "
                            }`}
                    >
                        {tap.label}
                    </button>
                );
            })}
        </div>
    );
};

export default LangaugeTaps;
