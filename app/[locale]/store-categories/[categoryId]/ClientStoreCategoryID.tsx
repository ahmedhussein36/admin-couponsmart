"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import StoreDetails from "@/app/components/stores/StoreDetails";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import { SafeStore } from "@/app/types";
import { useUpdate } from "@/app/hooks/useUpdate";
import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/headings/Heading";
import Input from "@/app/components/inputs/Input";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import OpenGraph from "@/app/components/metadata/OpenGraph";
import Question from "@/app/components/metadata/Question";
import SeoDetails from "@/app/components/metadata/SeoDetails";
import SelectLangauge from "@/app/components/stores/SelectLangauge";
import { useTextSnippet } from "@/app/hooks/useTextSnippet";
import RTE from "@/app/components/inputs/RTE";

interface ClientStoreParams {
    store: SafeStore;
}

const ClientStoreCategoryID = ({ store }: ClientStoreParams) => {
    const t = useTranslations();
    const router = useRouter();
    const { updateData, error, loading } = useUpdate();

    const methods = useForm<FieldValues>({
        defaultValues: {
            locale: store.locale,
            status: store.status,
            title: store.title,
            name: store.name,
            faqs: store.faqs || [],
            slug: store.slug,
            description: store.description,
            image: store.image,
            translateLink: store.translateLink,
            coverImage: store.coverImage,
            categories: store?.categoryIds,
            metaTitle: store.metaTitle,
            metaDescription: store.metaDescription,
            canonicalUrl: store.canonicalUrl,
            ogImage: store.ogImage,
            ogTitle: store.ogTitle,
            ogDescription: store.ogDescription,
            ogUrl: store.ogUrl,
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
    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    const onsave: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/storeCategory/${store.id}`;
        await toast.promise(updateData(api, data), {
            pending: "Updating store...",
            success: "Store updated successfully!",
            error: {
                render() {
                    return error || "Error: Unable to update store.";
                },
            },
        });
        router.refresh();
    };

    const onsubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/storeCategory/${store.id}`;
        await toast.promise(updateData(api, data, "published"), {
            pending: "Publishing store...",
            success: "Store published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to publish this store.";
                },
            },
        });
        router.refresh();
    };
    return (
        <FormProvider {...methods}>
            <div className="relative w-full flex flex-col justify-start items-start gap-3 mb-20">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.edit store category")} />
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
                            onClick={methods.handleSubmit(onsave)}
                            disabled={loading}
                            className=" bg-blue-500 hover:bg-blue-500/80"
                        >
                            {t("buttons.update")}
                        </Button>
                        {store.status === "draft" && (
                            <Button
                                onClick={methods.handleSubmit(onsubmit)}
                                disabled={loading}
                                className=" bg-lime-500 hover:bg-lime-500/80"
                            >
                                {t("buttons.publish")}
                            </Button>
                        )}
                    </div>
                </div>

                <h2 className=" font-bold text-lg mb-4">
                    {t("instructions.enter category details")}
                </h2>

                <div
                    className=" grid grid-col-1 lg:grid-cols-3 xl:grid-cols-4 mb-6
                        gap-12 rounded-lg  justify-items-start items-start"
                >
                    <div className="w-full col-span-2 grid-flow-col flex flex-col justify-start items-start gap-6">
                        <Input
                            name="title"
                            label={t("inputs.category title")}
                            disabled={loading}
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
                    <div className=" col-span-1 w-full">
                        <SelectLangauge
                            value={locale}
                            onLocale={onLangaugeChange}
                        />
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
            </div>
        </FormProvider>
    );
};

export default ClientStoreCategoryID;
