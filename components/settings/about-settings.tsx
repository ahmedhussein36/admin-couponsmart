"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export function AboutSettings() {
    const { t, language } = useLanguage();
    const { toast } = useToast();

    const [aboutContentEn, setAboutContentEn] = useState("");
    const [aboutContentAr, setAboutContentAr] = useState("");

    const [faqsEn, setFaqsEn] = useState<FAQ[]>([
        {
            id: "1",
            question: "What services do you offer?",
            answer: "We offer a wide range of services including...",
        },
    ]);

    const [faqsAr, setFaqsAr] = useState<FAQ[]>([
        {
            id: "1",
            question: "ما هي الخدمات التي تقدمونها؟",
            answer: "نقدم مجموعة واسعة من الخدمات بما في ذلك...",
        },
    ]);

    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [openGraphImage, setOpenGraphImage] = useState("");

    const addFaq = (language: "en" | "ar") => {
        const newId = Date.now().toString();
        const newFaq = { id: newId, question: "", answer: "" };

        if (language === "en") {
            setFaqsEn([...faqsEn, newFaq]);
        } else {
            setFaqsAr([...faqsAr, newFaq]);
        }
    };

    const removeFaq = (language: "en" | "ar", id: string) => {
        if (language === "en") {
            setFaqsEn(faqsEn.filter((faq) => faq.id !== id));
        } else {
            setFaqsAr(faqsAr.filter((faq) => faq.id !== id));
        }
    };

    const updateFaq = (
        language: "en" | "ar",
        id: string,
        field: keyof FAQ,
        value: string
    ) => {
        if (language === "en") {
            setFaqsEn(
                faqsEn.map((faq) =>
                    faq.id === id ? { ...faq, [field]: value } : faq
                )
            );
        } else {
            setFaqsAr(
                faqsAr.map((faq) =>
                    faq.id === id ? { ...faq, [field]: value } : faq
                )
            );
        }
    };

    const handleSave = () => {
        // Here you would typically save the data to your backend
        console.log({
            aboutContentEn,
            aboutContentAr,
            faqsEn,
            faqsAr,
            metaTitle,
            metaDescription,
            openGraphImage,
        });

        toast({
            title: language === "en" ? "Settings saved" : "تم حفظ الإعدادات",
            description:
                language === "en"
                    ? "Your about page settings have been updated successfully."
                    : "تم تحديث إعدادات صفحة حول بنجاح.",
        });
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t("about.content")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="en">
                        <TabsList className="mb-4">
                            <TabsTrigger value="en">English</TabsTrigger>
                            <TabsTrigger value="ar">العربية</TabsTrigger>
                        </TabsList>

                        <TabsContent value="en">
                            <Textarea
                                value={aboutContentEn}
                                onChange={(e) =>
                                    setAboutContentEn(e.target.value)
                                }
                                placeholder="Enter about content in English"
                                className="min-h-[200px]"
                            />
                        </TabsContent>

                        <TabsContent value="ar">
                            <Textarea
                                value={aboutContentAr}
                                onChange={(e) =>
                                    setAboutContentAr(e.target.value)
                                }
                                placeholder="أدخل المحتوى باللغة العربية"
                                className="min-h-[200px]"
                                dir="rtl"
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("about.faqs")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="en">
                        <TabsList className="mb-4">
                            <TabsTrigger value="en">English</TabsTrigger>
                            <TabsTrigger value="ar">العربية</TabsTrigger>
                        </TabsList>

                        <TabsContent value="en" className="space-y-4">
                            <Accordion type="multiple" className="w-full">
                                {faqsEn.map((faq, index) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center justify-between w-full pr-4">
                                                <span>
                                                    {faq.question ||
                                                        `FAQ Item ${index + 1}`}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFaq("en", faq.id);
                                                    }}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4 pt-2">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`faq-question-en-${faq.id}`}
                                                    >
                                                        Question
                                                    </Label>
                                                    <Input
                                                        id={`faq-question-en-${faq.id}`}
                                                        value={faq.question}
                                                        onChange={(e) =>
                                                            updateFaq(
                                                                "en",
                                                                faq.id,
                                                                "question",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter FAQ question"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`faq-answer-en-${faq.id}`}
                                                    >
                                                        Answer
                                                    </Label>
                                                    <Textarea
                                                        id={`faq-answer-en-${faq.id}`}
                                                        value={faq.answer}
                                                        onChange={(e) =>
                                                            updateFaq(
                                                                "en",
                                                                faq.id,
                                                                "answer",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter FAQ answer"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addFaq("en")}
                                className="mt-2"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add FAQ
                            </Button>
                        </TabsContent>

                        <TabsContent value="ar" className="space-y-4">
                            <Accordion type="multiple" className="w-full">
                                {faqsAr.map((faq, index) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center justify-between w-full pr-4">
                                                <span>
                                                    {faq.question ||
                                                        `سؤال ${index + 1}`}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFaq("ar", faq.id);
                                                    }}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4 pt-2">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`faq-question-ar-${faq.id}`}
                                                    >
                                                        السؤال
                                                    </Label>
                                                    <Input
                                                        id={`faq-question-ar-${faq.id}`}
                                                        value={faq.question}
                                                        onChange={(e) =>
                                                            updateFaq(
                                                                "ar",
                                                                faq.id,
                                                                "question",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="أدخل سؤال"
                                                        dir="rtl"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor={`faq-answer-ar-${faq.id}`}
                                                    >
                                                        الإجابة
                                                    </Label>
                                                    <Textarea
                                                        id={`faq-answer-ar-${faq.id}`}
                                                        value={faq.answer}
                                                        onChange={(e) =>
                                                            updateFaq(
                                                                "ar",
                                                                faq.id,
                                                                "answer",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="أدخل إجابة"
                                                        className="min-h-[100px]"
                                                        dir="rtl"
                                                    />
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addFaq("ar")}
                                className="mt-2"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                إضافة سؤال
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>SEO & {t("about.openGraph")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meta-title">
                                {t("about.metaTitle")}
                            </Label>
                            <Input
                                id="meta-title"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                placeholder="About Us | Company Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meta-description">
                                {t("about.metaDescription")}
                            </Label>
                            <Textarea
                                id="meta-description"
                                value={metaDescription}
                                onChange={(e) =>
                                    setMetaDescription(e.target.value)
                                }
                                placeholder="Learn more about our company, mission, and values..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="og-image">
                                Open Graph Image URL
                            </Label>
                            <Input
                                id="og-image"
                                value={openGraphImage}
                                onChange={(e) =>
                                    setOpenGraphImage(e.target.value)
                                }
                                placeholder="/images/og-about.jpg"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>{t("common.save")}</Button>
            </div>
        </div>
    );
}
