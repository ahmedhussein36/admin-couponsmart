"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import CategorySelect from "@/app/components/inputs/CategorySelect";
import { toast } from "react-toastify";
import RTE from "@/app/components/inputs/RTE";
import { SafePost } from "@/app/types";
import { useUpdate } from "@/app/hooks/useUpdate";
import { useRouter } from "@/i18n/routing";
import Heading from "@/app/components/headings/Heading";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import OpenGraph from "@/app/components/metadata/OpenGraph";
import Question from "@/app/components/metadata/Question";
import SeoDetails from "@/app/components/metadata/SeoDetails";
import Features from "@/app/components/stores/Features";
import SelectLangauge from "@/app/components/stores/SelectLangauge";
import { useTextSnippet } from "@/app/hooks/useTextSnippet";

interface ClientPostProps {
    post: SafePost;
    PostCategories: any[];
}

const ClientPost = ({ PostCategories, post }: ClientPostProps) => {
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState("Edit content");

    const t = useTranslations();
    const router = useRouter();

    const methods = useForm<FieldValues>({
        defaultValues: {
            locale: post.locale,
            status: post.status,
            title: post.title,
            slug: post.slug,
            description: post.description,
            image: post.image,
            translateLink: post.translateLink,
            faqs: post.faqs || [],
            categories: post.postCategoryIds || [],
            tags: post.tagsIds || [],
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            canonicalUrl: post.canonicalUrl,
            ogImage: post.ogImage,
            ogTitle: post.ogTitle,
            ogDescription: post.ogDescription,
            ogUrl: post.ogUrl,
            isRecommended: post.isRecommended,
            isFeatured: post.isFeatured,
            isFooter: post.isFooter,
            isAddHome: post.isAddHome,
        },
    });

    const {
        locale,
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
    const { updateData, error, loading } = useUpdate();

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

    const showEditorHandler = () => {
        setShowEditor(!showEditor);
        setShow(showEditor ? "Edit content" : "Hide editor");
    };

    //callback funtion to get the locale value
    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/posts/${post.id}`;
        await toast.promise(updateData(api, data), {
            pending: "Update the post wait...",
            success: "The post updated successfully!",
            error: {
                render() {
                    return error || "Error: Unable to update this post.";
                },
            },
        });
        router.refresh();
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/posts/${post.id}`;
        await toast.promise(updateData(api, data, "published"), {
            pending: "publishing post wait...",
            success: "Post published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to publish this post.";
                },
            },
        });
        router.refresh();
    };
    return (
        <FormProvider {...methods}>
            <div className="relative w-full xl:w-[900px] flex flex-col justify-start items-start gap-3  mb-24">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.edit post")} />
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
                            {t("buttons.update")}
                        </Button>
                        {post.status === "draft" && (
                            <Button
                                disabled={loading}
                                onClick={methods.handleSubmit(onSubmit)}
                                className=" bg-lime-500 hover:bg-lime-500/80"
                            >
                                {t("buttons.publish")}
                            </Button>
                        )}
                    </div>
                </div>
                <>
                    <SelectLangauge
                        value={locale}
                        onLocale={onLangaugeChange}
                    />

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
                                    disabled={loading}
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
                        {showEditor && (
                            <RTE
                                label={t("inputs.post description")}
                                name="description"
                                control={methods.control}
                            />
                        )}
                        <Button onClick={showEditorHandler}>{show}</Button>
                    </div>

                    <Question name="faqs" />
                    <Features />
                    <CategorySelect
                        name="categories"
                        lang={methods.getValues("locale")}
                        categories={PostCategories}
                    />
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
            </div>
        </FormProvider>
    );
};

export default ClientPost;
