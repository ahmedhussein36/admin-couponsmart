"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
    Button,
    Heading,
    ImageUpload,
    Input,
    OpenGraph,
    Question,
    SeoDetails,
    SelectLangauge,
    useGeneratedSlug,
    useTextSnippet,
    Features,
} from "@/app/utils/importData";
import CategorySelect from "@/app/components/inputs/CategorySelect";
import { toast } from "react-toastify";
import { useCreateStore } from "@/app/hooks/useCreateStore";
import RTE from "@/app/components/inputs/RTE";

enum STEPS {
    LANGAUGE = 1,
    CATEGORY = 2,
    DETAILS = 3,
}

const ClientPost = ({ PostCategories }: { PostCategories: any[] }) => {
    const [step, setStep] = useState(STEPS.LANGAUGE);
    const [isLoading, setIsloading] = useState(false);
    const [selected, setSelected] = useState(false);
    const t = useTranslations();
    const router = useRouter();

    const methods = useForm<FieldValues>({
        defaultValues: {
            locale: "ar",
            status: "draft",
            title: "",
            name: "",
            slug: "",
            description: "",
            image: "",
            coverImage: "",
            translateLink: "",
            faqs: [],
            categories: [],
            tags: [],
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
        },
    });

    const {
        locale,
        image,
        title,
        slug,
        faqs,
        description,
        metaTitle,
        metaDescription,
        ogImage,
        ogTitle,
        ogDescription,
    } = useWatch(methods);

    const snippet = useTextSnippet(description ? description : "", 120);
    const { newSlug } = useGeneratedSlug(title as string);
    const { createMew, error, loading } = useCreateStore();

    useEffect(() => {
        methods.setValue("slug", newSlug);
    }, [methods, newSlug]);

    useEffect(() => {
        if (step === STEPS.DETAILS) {
            setSelected(true);
        }
    }, [step]);

    const setCustomValue = useCallback(
        (id: string, value: any) => {
            methods.setValue(id, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });
        },
        [methods]
    );

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    //callback funtion to get the locale value
    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    let content = <SelectLangauge value={locale} onLocale={onLangaugeChange} />;

    if (step === STEPS.CATEGORY) {
        content = (
            <CategorySelect
                name="categories"
                lang={methods.getValues("locale")}
                categories={PostCategories}
            />
        );
    }

    if (step === STEPS.DETAILS)
        content = (
            <>
                <div className="mt-4 w-full grid grid-cols-1 gap-5 rounded-lg border- dark:border-neutral-500 p-4 bg-white dark:bg-transparent">
                    <div className="w-full">
                        <h2 className=" font-bold text-lg mb-4">
                            {t("instructions.enter post details")}
                        </h2>
                    </div>
                    <div
                        className=" grid grid-col-1 lg:grid-cols-3 mb-6
                                    gap-12 rounded-lg  justify-items-start items-start"
                    >
                        <div className="w-full col-span-2 grid-flow-col flex flex-col justify-start items-start gap-6">
                            <Input
                                name="title"
                                label={t("inputs.post title")}
                                disabled={isLoading}
                                required={true}
                            />

                            <Input
                                name="slug"
                                label={t("inputs.post slug")}
                                className=" border text-base"
                                disabled
                            />
                        </div>
                        <div className="col-span-1 flex">
                            <ImageUpload
                                name="image"
                                label={t("buttons.upload image")}
                                social
                            />
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
                <Features />
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
        const api = "/api/posts";
        await toast.promise(createMew(api, data, "draft"), {
            pending: "saving new post...",
            success: "New post Saved as draft successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create post.";
                },
            },
        });

        setStep(STEPS.LANGAUGE);
        setSelected(false);
        methods.reset();
        router.back();
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = "/api/posts";
        await toast.promise(createMew(api, data, "published"), {
            pending: "publishing post...",
            success: "Post published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create post.";
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
            <div className="relative w-full xl:w-[900px] flex flex-col justify-start items-start gap-3  mb-24">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.add new post")} />
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

export default ClientPost;
