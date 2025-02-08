"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoreDetails from "@/app/components/stores/StoreDetails";
import { useCreateStore } from "@/app/hooks/useCreateStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import Heading from "@/app/components/headings/Heading";
import Button from "@/app/components/buttons/Button";
import CategorySelect from "@/app/components/inputs/CategorySelect";
import SelectLangauge from "@/app/components/stores/SelectLangauge";
import useGeneratedSlug from "@/app/hooks/useGeneratedSlug";

enum STEPS {
    LANGAUGE = 1,
    CATEGORY = 2,
    DETAILS = 3,
}

interface ClientStoreParams {
    categories: any[];
}

const ClientStore = ({ categories }: ClientStoreParams) => {
    const [step, setStep] = useState(STEPS.LANGAUGE);
    const [selected, setSelected] = useState(false);
    const t = useTranslations();
    const router = useRouter();
    const { createMew, error, loading } = useCreateStore();

    const methods = useForm<FieldValues>({
        defaultValues: {
            locale: "ar",
            status: "draft",
            title: "",
            name: "",
            slug: "",
            affiliateUrl: "",
            description: "",
            image: "",
            translateLink: "",
            coverImage: "",
            faqs: [],
            categories: [],
            rating: 0,
            votes: 0,
            metaTitle: "",
            metaDescription: "",
            canonicalUrl: "",
            ogImage: "",
            ogTitle: "",
            ogDescription: "",
            ogUrl: "",
            isRecommended: false,
            isFeatured: false,
            isFooter: false,
            isAddHome: false,
            isTopRated: false,
        },
    });

    const setCustomValue = useCallback(
        (name: string, value: any) => {
            methods.setValue(name, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });
        },
        [methods]
    );

    const { locale, name } = useWatch(methods);
    const { newSlug } = useGeneratedSlug(name as string);

    useEffect(() => {
        setCustomValue("slug", newSlug);
    }, [newSlug, setCustomValue]);

    useEffect(() => {
        if (step === STEPS.DETAILS) {
            setSelected(true);
        }
    }, [step]);

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    let content = <SelectLangauge value={locale} onLocale={onLangaugeChange} />;

    if (step === STEPS.CATEGORY) {
        content = (
            <CategorySelect
                name="categories"
                categories={categories}
                lang={methods.getValues("locale")}
            />
        );
    }

    if (step === STEPS.DETAILS) content = <StoreDetails />;

    const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
        const api = "/api/stores";
        await toast.promise(createMew(api, data, "draft"), {
            pending: "saving store...",
            success: "Store Saved as draft successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create store.";
                },
            },
        });

        setStep(STEPS.LANGAUGE);
        setSelected(false);
        methods.reset();
        router.back();
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = "/app/api/stores";
        await toast.promise(createMew(api, data, "published"), {
            pending: "publishing store...",
            success: "Store published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create store.";
                },
            },
        });

        setStep(STEPS.LANGAUGE);
        setSelected(false);
        methods.reset();
        router.back();
    };
    return (
        <FormProvider {...methods}>
            <div className="relative w-full xl:w-[900px] flex flex-col justify-start items-start gap-3 mb-20">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.create new")} />
                    {!selected ? (
                        <div className=" flex justify-end items-center gap-6">
                            <Button
                                outline
                                onClick={() =>
                                    step !== STEPS.LANGAUGE
                                        ? onBack()
                                        : router.back()
                                }
                            >
                                {t("buttons.back")}
                            </Button>
                            <Button
                                disabled={locale == ""}
                                onClick={() => {
                                    onNext();
                                }}
                            >
                                {t("buttons.next")}
                            </Button>
                        </div>
                    ) : (
                        <div className=" appeare flex justify-end items-center gap-3">
                            <Button
                                outline
                                disabled={loading}
                                onClick={() => {
                                    router.refresh();
                                    router.back();
                                }}
                            >
                                {t("buttons.cancel")}
                            </Button>
                            <Button
                                onClick={methods.handleSubmit(onSaveDraft)}
                                className=""
                                disabled={loading}
                            >
                                {t("buttons.save as a draft")}
                            </Button>
                            <Button
                                onClick={methods.handleSubmit(onSubmit)}
                                disabled={loading}
                                className=" bg-lime-500 hover:bg-lime-500/80"
                            >
                                {t("buttons.publish")}
                            </Button>
                        </div>
                    )}
                </div>
                {content}
            </div>
        </FormProvider>
    );
};

export default ClientStore;
