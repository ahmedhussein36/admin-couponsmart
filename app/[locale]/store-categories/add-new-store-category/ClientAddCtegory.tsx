"use client";
import React, { useEffect, useState } from "react";
import { useTextSnippet } from "@/app/hooks/useTextSnippet";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useStoreCategory } from "@/app/hooks/useStoreCategory";
import Input from "@/app/components/inputs/Input";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import OpenGraph from "@/app/components/metadata/OpenGraph";
import Question from "@/app/components/metadata/Question";
import SeoDetails from "@/app/components/metadata/SeoDetails";
import SelectLangauge from "@/app/components/stores/SelectLangauge";
import useGeneratedSlug from "@/app/hooks/useGeneratedSlug";
import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/headings/Heading";
import RTE from "@/app/components/inputs/RTE";

enum STEPS {
    LANGAUGE = 1,
    DETAILS = 2,
}

const ClientAddCtegory = () => {
    const [step, setStep] = useState(STEPS.LANGAUGE);
    const [isLoading, setIsloading] = useState(false);
    const [selected, setSelected] = useState(false);
    const t = useTranslations();
    const router = useRouter();
    const { createStoreCategory, error, loading } = useStoreCategory();

    const methods = useForm({
        defaultValues: {
            locale: "ar",
            status: "draft",
            title: "",
            name: "",
            slug: "",
            description: "",
            faqs: [],
            image: "",
            translateLink: "",
            coverImage: "",
            metaTitle: "",
            metaDescription: "",
            canonicalUrl: "",
            ogImage: "",
            ogTitle: "",
            ogDescription: "",
            ogUrl: "",
        },
    });

    const {
        locale,
        name,
        image,
        title,
        slug,
        description,
        metaTitle,
        metaDescription,
        ogImage,
        ogTitle,
        ogDescription,
    } = useWatch(methods);

    const snippet = useTextSnippet(description ? description : "", 120);
    const { newSlug } = useGeneratedSlug(name as string);

    useEffect(() => {
        methods.setValue("slug", newSlug);
    }, [methods, newSlug]);

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
        methods.setValue("locale", locale);
    };

    let content = (
        <SelectLangauge value={locale as string} onLocale={onLangaugeChange} />
    );

    if (step === STEPS.DETAILS)
        content = (
            <>
                <div className="mt-4 w-full grid grid-cols-1 gap-5 rounded-lg border dark:border-neutral-500 p-4 bg-white dark:bg-transparent">
                    <div className="w-full">
                        <h2 className=" font-bold text-lg mb-4">
                            {t("instructions.enter category details")}
                        </h2>
                    </div>
                    <div
                        className=" grid grid-col-1 lg:grid-cols-3 mb-6
                                    gap-12 rounded-lg  justify-items-start items-start"
                    >
                        <div className="w-full col-span-2 grid-flow-col flex flex-col justify-start items-start gap-6">
                            <Input
                                name="title"
                                label={t("inputs.category title")}
                                disabled={isLoading}
                                required={true}
                            />
                            <Input
                                name="name"
                                label={t("inputs.category name")}
                                className=" border text-base "
                                required
                            />
                            <Input
                                name="slug"
                                label={t("inputs.category slug")}
                                className=" border text-base"
                                disabled
                            />
                        </div>
                        <div className="col-span-1 flex">
                            <ImageUpload name="image" label="Upload Image" />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[950px]">
                    <RTE
                        label={t("inputs.category description")}
                        name="description"
                        control={methods.control}
                        defaultValue={methods.getValues("description")}
                        dark
                    />
                </div>
                <Question name="faqs" />
                <SeoDetails
                    defaultTtitle={metaTitle ? metaTitle : title}
                    defaultDescriptiion={
                        metaDescription ? metaDescription : snippet
                    }
                    defaulImage={image}
                    defaultSlug={slug}
                />
                <OpenGraph
                    defaultTtitle={ogTitle ? ogTitle : title}
                    defaultDescriptiion={
                        ogDescription ? ogDescription : snippet
                    }
                    defaulImage={ogImage ? ogImage : image}
                    defaultSlug={slug}
                />
            </>
        );

    const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
        await toast.promise(createStoreCategory(data, "draft"), {
            pending: "Saving store category...",
            success: "Category Saved as draft successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create category.";
                },
            },
        });

        setStep(STEPS.LANGAUGE);
        setSelected(false);
        methods.reset();
        router.back();
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await toast.promise(createStoreCategory(data, "published"), {
            pending: "publishing store category...",
            success: "Category published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create category.";
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
            <div className="relative w-full xl:w-[900px] flex flex-col justify-start items-start gap-3 mb-24">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.add new category")} />
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
                                disabled={loading}
                                outline
                                onClick={() => {
                                    router.refresh();
                                    router.back();
                                }}
                            >
                                {t("buttons.cancel")}
                            </Button>
                            <Button
                                disabled={loading}
                                onClick={methods.handleSubmit(onSaveDraft)}
                                className=""
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2">
                                        <span className="">
                                            {t("buttons.saving")}
                                        </span>
                                    </div>
                                ) : (
                                    t("buttons.save as a draft")
                                )}
                            </Button>
                            <Button
                                disabled={loading}
                                onClick={methods.handleSubmit(onSubmit)}
                                className=" bg-lime-500 hover:bg-lime-500/80"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2">
                                        <span className="">
                                            {t("buttons.publishing")}
                                        </span>
                                    </div>
                                ) : (
                                    t("buttons.publish")
                                )}
                            </Button>
                        </div>
                    )}
                </div>
                {content}
            </div>
        </FormProvider>
    );
};
export default ClientAddCtegory;
