/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneralSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GeneralSettingsModal({
    isOpen,
    onClose,
}: GeneralSettingsModalProps) {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [websiteName, setWebsiteName] = useState("");
    const [domain, setDomain] = useState("");
    const [favicon, setFavicon] = useState<File | null>(null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

    const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFavicon(file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically save the data to your backend
        console.log({ websiteName, domain, favicon });

        toast({
            title: language === "en" ? "Settings saved" : "تم حفظ الإعدادات",
            description:
                language === "en"
                    ? "Your general settings have been updated successfully."
                    : "تم تحديث الإعدادات العامة بنجاح.",
        });

        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t("settings.general")}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="websiteName">
                            {t("general.websiteName")}
                        </Label>
                        <Input
                            id="websiteName"
                            value={websiteName}
                            onChange={(e) => setWebsiteName(e.target.value)}
                            placeholder={
                                language === "en" ? "My Website" : "موقعي"
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domain">{t("general.domain")}</Label>
                        <Input
                            id="domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="favicon">{t("general.favicon")}</Label>
                        <div className="flex items-center gap-4">
                            {faviconPreview && (
                                <div className="w-10 h-10 border rounded overflow-hidden">
                                    <img
                                        src={
                                            faviconPreview || "/placeholder.svg"
                                        }
                                        alt="Favicon preview"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <Label
                                    htmlFor="favicon-upload"
                                    className="flex items-center gap-2 cursor-pointer w-full p-2 border rounded hover:bg-muted"
                                >
                                    <Upload className="h-4 w-4" />
                                    <span>{t("common.upload")}</span>
                                </Label>
                                <Input
                                    id="favicon-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFaviconChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter
                        className={language === "ar" ? "flex-row-reverse" : ""}
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            {t("common.cancel")}
                        </Button>
                        <Button type="submit">{t("general.save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
