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
    CategorySelect,
    CountrySelect,
    Features,
    Heading,
    ImageUpload,
    Input,
    SelectLangauge,
} from "@/app/utils/importData";
import Selection from "@/app/components/inputs/Selection";
import { toast } from "react-toastify";
import { useCreateStore } from "@/app/hooks/useCreateStore";
import StoreSelect from "@/app/components/inputs/StoreSelect";

enum STEPS {
    LANGAUGE = 1,
    COUNTRY = 2,
    CATEGORY = 3,
    DETAILS = 4,
}

const ClientCoupon = ({
    stores,
    categories,
}: {
    stores: any;
    categories: any;
}) => {
    const [step, setStep] = useState(STEPS.LANGAUGE);
    const [selected, setSelected] = useState(false);
    const t = useTranslations();
    const router = useRouter();
    const { createMew, error, loading } = useCreateStore();

    const methods = useForm<FieldValues>({
        defaultValues: {
            title: "",
            status: "",
            type: "coupon",
            code: "",
            expiredDate: "Unknown",
            discount: 15,
            description: "",
            categories: [],
            countries: [],
            storeId: "",
            image: "",
            locale: "ar",
            usings: 0,
            likes: 0,
            views: 0,
            affiliateUrl: "",
            isFeatured: false,
            isAddHome: false,
            isRecommended: false,
        },
    });

    const { locale, storeId } = useWatch(methods);

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

    const onLangaugeChange = (locale: string) => {
        setCustomValue("locale", locale);
    };

    let content = (
        <SelectLangauge coupon value={locale} onLocale={onLangaugeChange} />
    );

    if (step === STEPS.COUNTRY) {
        content = (
            <>
                <CountrySelect name="countries" />
                <StoreSelect
                    stores={stores}
                    name={"storeId"}
                    lang={methods.getValues("locale")}
                />
            </>
        );
    }

    if (step === STEPS.CATEGORY) {
        content = (
            <CategorySelect
                name="categories"
                categories={categories}
                lang={methods.getValues("locale")}
            />
        );
    }

    if (step === STEPS.DETAILS)
        content = (
            <>
                <div className="mt-4 w-full grid grid-cols-1 gap-5 rounded-lg dark:border-neutral-500 p-4 bg-white dark:bg-transparent">
                    <div className="w-full">
                        <h2 className=" font-bold text-lg mb-4">
                            {t("instructions.enter coupon details")}
                        </h2>
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
                                        methods.getValues("type") !== "coupon"
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
            </>
        );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = "/api/coupons";
        await toast.promise(createMew(api, data, "published"), {
            pending: "publishing coupoun...",
            success: "Coupon published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create coupon.";
                },
            },
        });

        setStep(STEPS.LANGAUGE);
        setSelected(false);
        methods.reset();
        router.refresh();
    };
    return (
        <FormProvider {...methods}>
            <div className="relative w-full flex flex-col justify-start items-start gap-3">
                <div className=" flex justify-between items-center pb-4 w-full border-b dark:border-neutral-500">
                    <Heading title={t("buttons.add new coupon")} />
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
                                // disabled={storeId === ""}
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
                                onClick={methods.handleSubmit(onSubmit)}
                                disabled={loading}
                                className=" bg-lime-500 hover:bg-lime-500/80"
                            >
                                {loading ? (
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

export default ClientCoupon;
