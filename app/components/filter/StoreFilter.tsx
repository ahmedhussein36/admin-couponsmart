"use client";
import React from "react";
import Select from "../inputs/Select";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

function StoreFilter() {
    const t = useTranslations("stores");

    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <div className="w-full grid grid-cols-5 gap-5 justify-items-start items-end">
                <Select name="1" label={t("category")} />
                <Select name="4" label={t("langauge")} />
            </div>
        </FormProvider>
    );
}

export default StoreFilter;
