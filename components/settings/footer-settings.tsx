"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface FooterMenu {
    id: string;
    title: string;
    url: string;
}

interface FooterSection {
    id: string;
    show: boolean;
    name: string;
    items: FooterMenu[];
}

export function FooterSettings() {
    const { t, language } = useLanguage();
    const { toast } = useToast();

    const [footerSections, setFooterSections] = useState<FooterSection[]>([
        {
            id: "about",
            show: true,
            name: t("footer.about"),
            items: [
                { id: "about-1", title: "About Us", url: "/about" },
                { id: "about-2", title: "Contact", url: "/contact" },
            ],
        },
        {
            id: "pages",
            show: true,
            name: t("footer.pages"),
            items: [
                { id: "pages-1", title: "Home", url: "/" },
                { id: "pages-2", title: "Blog", url: "/blog" },
            ],
        },
        {
            id: "stores",
            show: true,
            name: t("footer.stores"),
            items: [
                { id: "stores-1", title: "Featured Store 1", url: "/store/1" },
                { id: "stores-2", title: "Featured Store 2", url: "/store/2" },
            ],
        },
        {
            id: "offers",
            show: false,
            name: t("footer.offers"),
            items: [
                { id: "offers-1", title: "Summer Sale", url: "/offers/summer" },
            ],
        },
    ]);

    const toggleSectionVisibility = (sectionId: string) => {
        setFooterSections(
            footerSections.map((section) =>
                section.id === sectionId
                    ? { ...section, show: !section.show }
                    : section
            )
        );
    };

    const updateSectionName = (sectionId: string, name: string) => {
        setFooterSections(
            footerSections.map((section) =>
                section.id === sectionId ? { ...section, name } : section
            )
        );
    };

    const updateMenuItem = (
        sectionId: string,
        itemId: string,
        field: keyof FooterMenu,
        value: string
    ) => {
        setFooterSections(
            footerSections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId
                                ? { ...item, [field]: value }
                                : item
                        ),
                    };
                }
                return section;
            })
        );
    };

    const addMenuItem = (sectionId: string) => {
        const newId = `${sectionId}-${Date.now()}`;
        setFooterSections(
            footerSections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        items: [
                            ...section.items,
                            { id: newId, title: "", url: "" },
                        ],
                    };
                }
                return section;
            })
        );
    };

    const removeMenuItem = (sectionId: string, itemId: string) => {
        setFooterSections(
            footerSections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        items: section.items.filter(
                            (item) => item.id !== itemId
                        ),
                    };
                }
                return section;
            })
        );
    };

    const handleSave = () => {
        // Here you would typically save the data to your backend
        console.log({ footerSections });

        toast({
            title: language === "en" ? "Settings saved" : "تم حفظ الإعدادات",
            description:
                language === "en"
                    ? "Your footer settings have been updated successfully."
                    : "تم تحديث إعدادات التذييل بنجاح.",
        });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t("footer.menus")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion
                        type="multiple"
                        defaultValue={footerSections.map(
                            (section) => section.id
                        )}
                    >
                        {footerSections.map((section) => (
                            <AccordionItem key={section.id} value={section.id}>
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <span>{section.name}</span>
                                        <div
                                            className="flex items-center gap-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Label
                                                htmlFor={`show-${section.id}`}
                                                className="text-sm font-normal"
                                            >
                                                {section.show
                                                    ? t("homepage.show")
                                                    : t("homepage.hide")}
                                            </Label>
                                            <Switch
                                                id={`show-${section.id}`}
                                                checked={section.show}
                                                onCheckedChange={() =>
                                                    toggleSectionVisibility(
                                                        section.id
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`section-name-${section.id}`}
                                            >
                                                {t("footer.menuTitle")}
                                            </Label>
                                            <Input
                                                id={`section-name-${section.id}`}
                                                value={section.name}
                                                onChange={(e) =>
                                                    updateSectionName(
                                                        section.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            {section.items.map(
                                                (item, index) => (
                                                    <div
                                                        key={item.id}
                                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md"
                                                    >
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor={`item-title-${item.id}`}
                                                            >
                                                                {t(
                                                                    "footer.menuTitle"
                                                                )}
                                                            </Label>
                                                            <Input
                                                                id={`item-title-${item.id}`}
                                                                value={
                                                                    item.title
                                                                }
                                                                onChange={(e) =>
                                                                    updateMenuItem(
                                                                        section.id,
                                                                        item.id,
                                                                        "title",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder={
                                                                    language ===
                                                                    "en"
                                                                        ? "Menu item title"
                                                                        : "عنوان عنصر القائمة"
                                                                }
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor={`item-url-${item.id}`}
                                                            >
                                                                {t(
                                                                    "footer.menuUrl"
                                                                )}
                                                            </Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    id={`item-url-${item.id}`}
                                                                    value={
                                                                        item.url
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateMenuItem(
                                                                            section.id,
                                                                            item.id,
                                                                            "url",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="/page-url"
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="shrink-0 text-destructive"
                                                                    onClick={() =>
                                                                        removeMenuItem(
                                                                            section.id,
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="lucide lucide-trash-2"
                                                                    >
                                                                        <path d="M3 6h18" />
                                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                        <line
                                                                            x1="10"
                                                                            x2="10"
                                                                            y1="11"
                                                                            y2="17"
                                                                        />
                                                                        <line
                                                                            x1="14"
                                                                            x2="14"
                                                                            y1="11"
                                                                            y2="17"
                                                                        />
                                                                    </svg>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                addMenuItem(section.id)
                                            }
                                            className="mt-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-plus h-4 w-4 mr-2"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                            {language === "en"
                                                ? "Add Menu Item"
                                                : "إضافة عنصر قائمة"}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>{t("common.save")}</Button>
            </div>
        </div>
    );
}
