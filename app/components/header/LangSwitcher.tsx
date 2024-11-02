"use client";
import { useLocale } from "next-intl";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function LangSwitcher() {
    const [isPending, startTransition] = useTransition();
    const [nextLocale, setNextLocale] = useState("");
    const router = useRouter();
    const localActive = useLocale();
    const segment = useSelectedLayoutSegments();

    useEffect(() => {
        if (localActive === "en") setNextLocale("ar");
        else if (localActive === "ar") setNextLocale("en");
    }, [localActive]);

    const onSelectChange = () => {
        localActive === "en" ? "ar" : "en";
        startTransition(() => {
            router.push(`/${nextLocale}/${segment?.join("/")}/`);
        });
    };
    return (
        <>
            <button
                className=" text-neutral-200 
                            font-base text-sm
                            hover:text-lime-400
                    "
                onClick={onSelectChange}
                disabled={isPending}
            >
                <span>{localActive !== "en" ? "English" : "العربية"}</span>
            </button>
        </>
    );
}
