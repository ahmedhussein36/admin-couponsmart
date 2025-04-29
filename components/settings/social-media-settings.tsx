"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SocialMediaSettings() {
    const { t, language } = useLanguage();
    const { toast } = useToast();

    const [socialLinks, setSocialLinks] = useState({
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        snapchat: "",
        tiktok: "",
    });

    const handleInputChange = (
        platform: keyof typeof socialLinks,
        value: string
    ) => {
        setSocialLinks({
            ...socialLinks,
            [platform]: value,
        });
    };

    const handleSave = () => {
        // Here you would typically save the data to your backend
        console.log({ socialLinks });

        toast({
            title: language === "en" ? "Settings saved" : "تم حفظ الإعدادات",
            description:
                language === "en"
                    ? "Your social media links have been updated successfully."
                    : "تم تحديث روابط وسائل التواصل الاجتماعي بنجاح.",
        });
    };

    const socialPlatforms = [
        { id: "facebook", name: t("social.facebook"), icon: Facebook },
        { id: "twitter", name: t("social.twitter"), icon: Twitter },
        { id: "instagram", name: t("social.instagram"), icon: Instagram },
        { id: "youtube", name: t("social.youtube"), icon: Youtube },
        { id: "linkedin", name: t("social.linkedin"), icon: Linkedin },
        { id: "snapchat", name: t("social.snapchat"), icon: ExternalLink },
        { id: "tiktok", name: t("social.tiktok"), icon: ExternalLink },
    ];

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t("settings.social")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {socialPlatforms.map((platform) => (
                            <div key={platform.id} className="space-y-2">
                                <Label
                                    htmlFor={`social-${platform.id}`}
                                    className="flex items-center gap-2"
                                >
                                    <platform.icon className="h-4 w-4" />
                                    {platform.name}
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id={`social-${platform.id}`}
                                        value={
                                            socialLinks[
                                                platform.id as keyof typeof socialLinks
                                            ]
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                platform.id as keyof typeof socialLinks,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`https://${platform.id}.com/username`}
                                    />
                                    {socialLinks[
                                        platform.id as keyof typeof socialLinks
                                    ] && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0"
                                            onClick={() =>
                                                window.open(
                                                    socialLinks[
                                                        platform.id as keyof typeof socialLinks
                                                    ],
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>{t("common.save")}</Button>
            </div>
        </div>
    );
}
