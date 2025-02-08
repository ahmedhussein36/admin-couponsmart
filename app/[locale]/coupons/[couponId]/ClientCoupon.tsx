/* eslint-disable @next/next/no-img-element */
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
import Selection from "@/app/components/inputs/Selection";
import { toast } from "react-toastify";
import StoreSelect from "@/app/components/inputs/StoreSelect";
import { useRouter } from "@/i18n/routing";
import { useUpdate } from "@/app/hooks/useUpdate";
import { SafeCoupon } from "@/app/types";
import { BiEdit } from "react-icons/bi";
import { Drawer } from "@/app/components/Drower";
import Heading from "@/app/components/headings/Heading";
import SelectLangauge from "@/app/components/stores/SelectLangauge";
import Input from "@/app/components/inputs/Input";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Features from "@/app/components/stores/Features";
import { CountrySelect } from "@/app/components/inputs/CountrySelect";
import CategorySelect from "@/app/components/inputs/CategorySelect";
import Button from "@/app/components/buttons/Button";

const ClientCoupon = ({
    stores,
    categories,
    coupon,
}: {
    stores: any;
    categories: any;
    coupon: SafeCoupon;
}) => {
    const [storeName, setStoreName] = useState(coupon.Store.name);
    const t = useTranslations();
    const router = useRouter();
    const { updateData, error, loading } = useUpdate();

    const methods = useForm<FieldValues>({
        defaultValues: {
            title: coupon.title,
            status: coupon.status,
            type: coupon.type,
            code: coupon.code,
            expiredDate: coupon.expiredDate,
            discount: coupon.discount,
            description: coupon.description,
            categoryIds: coupon.storeCategoryIds,
            countries: coupon.countries,
            storeId: coupon.storeId,
            store: coupon.Store.name,
            image: coupon.image,
            locale: coupon.locale,
            usings: coupon.usings,
            likes: coupon.likes,
            views: coupon.views,
        },
    });

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

    const { locale, storeId } = useWatch(methods);

    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    const onselect = (storeName: string) => {
        setStoreName(storeName);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = `/api/coupons/${coupon.id}`;
        await toast.promise(updateData(api, data, "published"), {
            pending: "updating coupoun...",
            success: "Coupon updated successfully!",
            error: {
                render() {
                    return error || "Error: Unable to update this coupon.";
                },
            },
        });
        router.refresh();
        methods.reset();
    };
    return (
        <FormProvider {...methods}>
            <div className="relative w-full flex flex-col justify-start items-start gap-3">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.edit coupon")} />

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
                            onClick={methods.handleSubmit(onSubmit)}
                            disabled={loading}
                            className=" bg-lime-500 hover:bg-lime-500/80"
                        >
                            {loading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <span className="">
                                        {t("stores.updating")}
                                    </span>
                                </div>
                            ) : (
                                t("stores.update")
                            )}
                        </Button>
                    </div>
                </div>
                <div className="mt-4 w-full grid grid-cols-1 gap-5 rounded-lg dark:border-neutral-500 p-4 bg-white dark:bg-transparent">
                    <div className="w-full flex flex-col justify-start items-start">
                        <div>{t("language")}:</div>
                        <div className="w-full flex justify-start items-center gap-4">
                            <div className="">
                                {methods.getValues("locale") === "ar" ? (
                                    <div className=" flex gap-2 justify-start items-center">
                                        <img
                                            src={"/ae.png"}
                                            alt="ae-flag"
                                            width={25}
                                        />
                                        <span> {t("language_ar")}</span>
                                    </div>
                                ) : (
                                    <div className=" flex gap-2 justify-start items-center">
                                        <img
                                            src={"/usa.png"}
                                            alt="usa-flag"
                                            width={25}
                                        />
                                        <span> {t("language_en")}</span>
                                    </div>
                                )}
                            </div>
                            <Drawer
                                label={
                                    <div className=" flex gap-1 py-1 justify-center items-center me-auto px-3">
                                        <BiEdit />
                                        {t("edit")}
                                    </div>
                                }
                            >
                                <SelectLangauge
                                    coupon
                                    value={locale}
                                    onLocale={onLangaugeChange}
                                />
                            </Drawer>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                        <h3>{t("store")}:</h3>
                        <div className="w-full flex justify-start items-center gap-4">
                            <div className="">{storeName}</div>
                            <Drawer
                                label={
                                    <div className=" flex gap-1 py-1 justify-center items-center me-auto px-3">
                                        <BiEdit />
                                        {t("edit")}
                                    </div>
                                }
                            >
                                <StoreSelect
                                    stores={stores}
                                    name={"storeId"}
                                    lang={methods.getValues("locale")}
                                    onSelect={onselect}
                                />
                            </Drawer>
                        </div>
                    </div>
                    <div
                        className=" grid grid-col-1 lg:grid-cols-3 mb-6
                                    gap-12 rounded-lg  justify-items-start items-start"
                    >
                        <div className="w-full col-span-2 grid-flow-col flex flex-col justify-start items-start gap-6">
                            <Input
                                name="title"
                                label={t("inputs.coupon title")}
                                disabled={loading}
                                required
                            />
                            <div className=" relative w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    name="affiliateUrl"
                                    label={t("inputs.affiliate link")}
                                    className=" border text-base"
                                />
                                <Selection
                                    label={t("inputs.coupon type")}
                                    name="type"
                                    options={
                                        <>
                                            <option value="coupon">
                                                {t("inputs.coupon")}
                                            </option>
                                            <option value="deal">
                                                {t("inputs.deal")}
                                            </option>
                                        </>
                                    }
                                />
                            </div>
                            <div className=" relative w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    name="code"
                                    label={t("inputs.coupon code")}
                                    className=" border text-base "
                                    required={
                                        methods.getValues("type") === "coupon"
                                    }
                                    disabled={
                                        methods.getValues("type") === "deal"
                                    }
                                />
                                <Input
                                    name="expiredDate"
                                    type="date"
                                    label={t("inputs.expired date")}
                                    className=" border text-base "
                                />
                            </div>
                            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    name="discount"
                                    type="number"
                                    label={t("inputs.discount value")}
                                    className=" border text-base "
                                />
                                <Input
                                    name="usings"
                                    type="number"
                                    label={t("inputs.coupon usings")}
                                    className=" border text-base "
                                />
                            </div>
                            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    name="views"
                                    type="number"
                                    label={t("inputs.coupon views")}
                                    className=" border text-base "
                                />
                                <Input
                                    name="likes"
                                    type="number"
                                    label={t("inputs.coupon likes")}
                                    className=" border text-base "
                                />
                            </div>
                        </div>
                        <div className="col-span-1 flex">
                            <ImageUpload
                                name="image"
                                label={t("buttons.upload image")}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="w-full lg:w-[950px]">
                    <RTE
                        label={t("inputs.coupon description")}
                        name="description"
                        control={methods.control}
                        defaultValue={methods.getValues("description")}
                        dark
                    />
                </div> */}
                <Features />

                <CountrySelect name="countries" />

                <CategorySelect
                    name="categoryIds"
                    categories={categories as any}
                    lang={methods.getValues("locale")}
                />
            </div>
        </FormProvider>
    );
};

export default ClientCoupon;

{
    /*
<SelectLangauge
coupon
value={locale}
onLocale={onLangaugeChange}
/>


<CountrySelect name="countries" />
<StoreSelect
stores={stores}
name={"storeId"}
lang={methods.getValues("locale")}
/>

<CategorySelect
name="categories"
categories={categories as any}
categoryIds={coupon.storeCategoryIds}
lang={methods.getValues("locale")}
/> */
}
