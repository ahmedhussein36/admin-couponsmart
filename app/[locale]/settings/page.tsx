"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import { GeneralSettingsModal } from "@/components/settings/general-settings-modal";
import { FooterSettings } from "@/components/settings/footer-settings";
import { AboutSettings } from "@/components/settings/about-settings";
import { SocialMediaSettings } from "@/components/settings/social-media-settings";
import { useLanguage } from "@/components/language-provider";
import { HomePageSettings } from "@/components/settings/homepage-settings";

export default function SettingsPage() {
    const { language, setLanguage, t } = useLanguage();
    const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);
    const [sliderImages, setSliderImages] = useState<[]>([]);

    useEffect(() => {
        const getSliderImages = async () => {
            const data = await fetch("/api/slider", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await data.json();

            setSliderImages(result);
        };
        getSliderImages();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            setLanguage(language === "en" ? "ar" : "en")
                        }
                        aria-label={
                            language === "en"
                                ? "Switch to Arabic"
                                : "Switch to English"
                        }
                    >
                        <Globe className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>{t("settings.general")}</CardTitle>
                    <CardDescription>
                        {language === "en"
                            ? "Configure general website settings like name, domain, and favicon"
                            : "تكوين إعدادات الموقع العامة مثل الاسم والنطاق وأيقونة الموقع"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setIsGeneralModalOpen(true)}>
                        {t("settings.general")}
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="homepage" className="mb-8">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="homepage">
                        {t("settings.homepage")}
                    </TabsTrigger>
                    <TabsTrigger value="footer">
                        {t("settings.footer")}
                    </TabsTrigger>
                    <TabsTrigger value="about">
                        {t("settings.about")}
                    </TabsTrigger>
                    <TabsTrigger value="social">
                        {t("settings.social")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="homepage">
                    <HomePageSettings />
                </TabsContent>

                <TabsContent value="footer">
                    <FooterSettings />
                </TabsContent>

                <TabsContent value="about">
                    <AboutSettings />
                </TabsContent>

                <TabsContent value="social">
                    <SocialMediaSettings />
                </TabsContent>
            </Tabs>

            <GeneralSettingsModal
                isOpen={isGeneralModalOpen}
                onClose={() => setIsGeneralModalOpen(false)}
            />
        </div>
    );
}
