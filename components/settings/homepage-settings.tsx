/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Upload, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import MediaClient from "@/app/components/media/MediaCient";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export function HomePageSettings() {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const router = useRouter();

    const [showSlider, setShowSlider] = useState(true);
    const [sliderImages, setSliderImages] = useState<
        { id: string; image: string; link: string }[]
    >([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const getSliderImages = async () => {
            const data = await fetch("/api/slider");
            const result = await data.json();
            setSliderImages(result);
        };
        getSliderImages();
    }, []);

    const addSliderImage = () => {
        setSliderImages((prev) => [
            ...prev,
            { id: new Date().toString(), image: "", link: "" },
        ]);
    };

    const removeSliderImage = async (id: string) => {
        try {
            await fetch(`/api/slider?id=${id}`, {
                method: "DELETE",
            });
            setSliderImages((prev) => prev.filter((img) => img.id !== id));
            router.refresh();
            toast({
                variant: "default",
                title: language === "en" ? "Success" : "تم بنجاح",
                description:
                    language === "en"
                        ? "Image Deleted successfully."
                        : "تم حذف الصورة بنجاح.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: language === "en" ? "Error" : "خطأ",
                description:
                    language === "en"
                        ? "Failed to save changes."
                        : "فشل حفظ التغييرات.",
            });
        }
    };

    const handleSave = async () => {
        try {
            await fetch("/api/slider", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ images: sliderImages }),
            });

            router.refresh();
            toast({
                variant: "default",
                title: language === "en" ? "Success" : "تم بنجاح",
                description:
                    language === "en"
                        ? "Changes saved successfully."
                        : "تم حفظ التعديلات بنجاح.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: language === "en" ? "Error" : "خطأ",
                description:
                    language === "en"
                        ? "Failed to save changes."
                        : "فشل حفظ التغييرات.",
            });
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t("homepage.slider")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-6">
                        <Label htmlFor="show-slider">
                            {showSlider
                                ? t("homepage.show")
                                : t("homepage.hide")}
                        </Label>
                        <Switch
                            id="show-slider"
                            checked={showSlider}
                            onCheckedChange={setShowSlider}
                        />
                    </div>

                    {showSlider && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">
                                        {t("homepage.sliderImages")}
                                    </h3>
                                    <Button
                                        onClick={addSliderImage}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        {t("homepage.addImage")}
                                    </Button>
                                </div>

                                {sliderImages.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`border order-${index} rounded-md p-4 space-y-4`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">
                                                {language === "en"
                                                    ? `Slide ${index + 1}`
                                                    : `شريحة ${index + 1}`}
                                            </h4>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className=" bg-gray-700/50 group hover:bg-red-400"
                                                onClick={() =>
                                                    removeSliderImage(image.id)
                                                }
                                                disabled={
                                                    sliderImages.length === 1
                                                }
                                            >
                                                <Trash2 className=" text-red-400 group-hover:text-white" />
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <img
                                                    src={
                                                        image.image ||
                                                        "/placeholder.jpg"
                                                    }
                                                    alt={`Slide ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-md border"
                                                />
                                                <Dialog
                                                    open={isOpen}
                                                    onOpenChange={setIsOpen}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            onClick={() =>
                                                                setSelectedId(
                                                                    image.id
                                                                )
                                                            }
                                                        >
                                                            <Upload className="mr-2" />{" "}
                                                            Upload image
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-[100vw] max-h-screen w-screen h-screen">
                                                        <MediaClient
                                                            onImageSelect={(
                                                                imageUrls
                                                            ) => {
                                                                const selectedImage =
                                                                    imageUrls[0];
                                                                setSliderImages(
                                                                    (prev) =>
                                                                        prev.map(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id ===
                                                                                selectedId
                                                                                    ? {
                                                                                          ...item,
                                                                                          image: selectedImage,
                                                                                      }
                                                                                    : item
                                                                        )
                                                                );
                                                                setIsOpen(
                                                                    false
                                                                );
                                                            }}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`image-${image.id}`}
                                                    >
                                                        {t("homepage.imageUrl")}
                                                    </Label>
                                                    <Input
                                                        id={`image-${image.id}`}
                                                        value={image.image}
                                                        onChange={(e) =>
                                                            setSliderImages(
                                                                (prev) =>
                                                                    prev.map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id ===
                                                                            image.id
                                                                                ? {
                                                                                      ...item,
                                                                                      image: e
                                                                                          .target
                                                                                          .value,
                                                                                  }
                                                                                : item
                                                                    )
                                                            )
                                                        }
                                                        placeholder="/images/slider1.jpg"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`link-${image.id}`}
                                                    >
                                                        {t("common.url")}
                                                    </Label>
                                                    <Input
                                                        id={`link-${image.id}`}
                                                        value={image.link}
                                                        onChange={(e) =>
                                                            setSliderImages(
                                                                (prev) =>
                                                                    prev.map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id ===
                                                                            image.id
                                                                                ? {
                                                                                      ...item,
                                                                                      link: e
                                                                                          .target
                                                                                          .value,
                                                                                  }
                                                                                : item
                                                                    )
                                                            )
                                                        }
                                                        placeholder="https://example.com/page"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )).reverse()}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>{t("common.save")}</Button>
            </div>
        </div>
    );
}
