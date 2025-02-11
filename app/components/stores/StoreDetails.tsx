"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../inputs/Input";
import { useTextSnippet } from "@/app/hooks/useTextSnippet";
import ImageUpload from "../inputs/ImageUpload";
import OpenGraph from "../metadata/OpenGraph";
import Question from "../metadata/Question";
import SeoDetails from "../metadata/SeoDetails";
import Features from "./Features";
import RTE from "../inputs/RTE";
import { Button } from "@/components/ui/button";

const StoreDetails = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [show, setShow] = useState("Edit content");
    const [isLoading, setIsloading] = useState(false);
    const { control, getValues } = useFormContext();
    const t = useTranslations();
    const {
        image,
        title,
        slug,
        description,
        metaTitle,
        metaDescription,
        ogImage,
        ogTitle,
        ogDescription,
    } = useWatch();

    const snippet = useTextSnippet(description ? description : "", 120);

    const showEditorHandler = () => {
        setShowEditor(!showEditor);
        setShow(showEditor ? "Edit content" : "Hide editor");
    };

    return (
        <>
            <div className="mt-4 w-full grid grid-cols-1 gap-5 rounded-lg border- dark:border-neutral-500 p-4 bg-white dark:bg-transparent">
                <div className="w-full">
                    <h2 className=" font-bold text-lg mb-4">
                        {t("instructions.enter store details")}
                    </h2>
                </div>
                <div
                    className=" grid grid-col-1 lg:grid-cols-3 mb-6
                        gap-12 rounded-lg  justify-items-start items-start"
                >
                    <div className="w-full col-span-2 grid-flow-col flex flex-col justify-start items-start gap-6">
                        <Input
                            name="title"
                            label={t("inputs.store title")}
                            disabled={isLoading}
                            required={true}
                        />
                        <Input
                            name="name"
                            label={t("inputs.store name")}
                            className=" border text-base "
                            required
                        />
                        <Input
                            name="slug"
                            label={t("inputs.store slug")}
                            className=" border text-base"
                            disabled
                        />
                        <Input
                            name="affiliateUrl"
                            label={t("inputs.affiliate link")}
                            className=" border text-base"
                            required
                        />
                    </div>
                    <div className="col-span-1 flex">
                        <ImageUpload
                            name="image"
                            label={t("buttons.upload image")}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[950px]">
                {showEditor && (
                    <RTE
                        label={t("inputs.coupon description")}
                        name="description"
                        control={control}
                        defaultValue={getValues("description")}
                        dark
                    />
                )}
                <Button onClick={showEditorHandler}>{show}</Button>
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
                defaultDescriptiion={ogDescription ? ogDescription : snippet}
                defaulImage={ogImage ? ogImage : image}
                defaultSlug={slug}
            />
        </>
    );
};

export default StoreDetails;
