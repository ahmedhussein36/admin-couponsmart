"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useLocale, useTranslations } from "next-intl";

interface SelectLanguageProps {
    children: ReactNode;
    label: ReactNode;
}

export function Drawer({ children, label }: SelectLanguageProps) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="default">
                    {label}
                </Button>
            </SheetTrigger>
            <SheetContent side={locale === "en" ? "right" : "left"} className="pt-16">
                {children}

                <SheetFooter className="mt-4">
                    <SheetClose asChild>
                        <Button type="submit">{t("save")}</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
