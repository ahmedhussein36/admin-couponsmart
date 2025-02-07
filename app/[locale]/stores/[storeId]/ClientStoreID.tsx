"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import StoreDetails from "@/app/components/stores/StoreDetails";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    Button,
    Heading,
    SelectLangauge,
    CategorySelect,
} from "@/app/utils/importData";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useWatch,
} from "react-hook-form";
import { SafeStore, SafeStoreCategory } from "@/app/types";
import { useUpdate } from "@/app/hooks/useUpdate";

interface ClientStoreParams {
    store: SafeStore;
    allCategories: SafeStoreCategory[];
}

const ClientStoreID = ({ store, allCategories }: ClientStoreParams) => {
    const t = useTranslations();
    const router = useRouter();
    const { updateData, error, loading } = useUpdate();

    const methods = useForm<FieldValues>({
        defaultValues: {
            locale: store.locale,
            status: store.status,
            title: store.title,
            name: store.name,
            slug: store.slug,
            affiliateUrl: store?.affiliateUrl,
            description: store.description,
            image: store.image,
            faqs: store?.faqs || [],
            translateLink: store.translateLink,
            coverImage: store.coverImage,
            categories: store?.categoryIds,
            rating: store.rating,
            votes: store.votes,
            metaTitle: store.metaTitle,
            metaDescription: store.metaDescription,
            canonicalUrl: store.canonicalUrl,
            ogImage: store.ogImage,
            ogTitle: store.ogTitle,
            ogDescription: store.ogDescription,
            ogUrl: store.ogUrl,
            isRecommended: store.isRecommended,
            isFeatured: store.isFeatured,
            isFooter: store.isFooter,
            isAddHome: store.isAddHome,
            isTopRated: store.isTopRated,
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

    const { locale, categories } = useWatch(methods);
    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    const onSave: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/stores/${store.id}`;

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
        const api = `/api/stores/${store.id}`;
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
                    <Heading title={t("buttons.edit store")} />
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
                            onClick={methods.handleSubmit(onSave)}
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

                <div className=" grid grid-cols-1 lg:grid-cols-4 w-full justify-items-start items-start gap-3">
                    <div className=" col-span-3 w-full ">
                        <StoreDetails />
                        <SelectLangauge
                            value={locale}
                            onLocale={onLangaugeChange}
                        />
                        <CategorySelect
                            name="categories"
                            categories={allCategories as any}
                            lang={methods.getValues("locale")}
                        />
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default ClientStoreID;
