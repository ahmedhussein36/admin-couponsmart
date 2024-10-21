"use client";
import React, { useEffect } from "react";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import useGeneratedSlug from "@/app/hooks/useGeneratedSlug";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const TagForm = () => {
    const t = useTranslations();
    const router = useRouter();
    const methods = useForm<FieldValues>({
        defaultValues: {
            status: "draft",
            title: "",
            locale: "",
            description: "",
            slug: "",
        },
    });
    const title = methods.watch("title");
    const { newSlug } = useGeneratedSlug(title as string);
    useEffect(() => {
        methods.setValue("slug", newSlug);
    }, [methods, newSlug]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        router.refresh();
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full grid grid-col-1 p-4 gap-6 bg-white dark:bg-gray-700/20 rounded-lg">
                <h2 className=" font-semibold">{t("buttons.add new tag")}</h2>
                <Input
                    name={"title"}
                    label={t("inputs.title")}
                    className="border text-base"
                />
                <Input
                    name={"slug"}
                    label={t("inputs.slug")}
                    className="border text-base"
                    disabled
                />
                <div className=" relative w-full">
                    <label
                        className={`text-sm rtl:right-2 text-neutral-500 dark:text-neutral-400 
                                    -top-4 ltr:left-2 absolute bg-white dark:bg-gray-800 p-1 px-2`}
                    >
                        {t("inputs.description")}
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className=" bg-white 
                                    dark:bg-transparent 
                                    dark:focus:border-neutral-400
                                    w-full min-h-28
                                    border-2 dark:border-neutral-500 
                                    rounded-md p-4"
                    />
                </div>

                <div className="w-full">
                    <select
                        name="locale"
                        id="locale"
                        onChange={(e) =>
                            methods.setValue("locale", e.target.value)
                        }
                        className="w-1/2 border p-2 rounded-md bg-white dark:bg-gray-700/50"
                    >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <Button
                    disabled={!title}
                    onClick={methods.handleSubmit(onSubmit)}
                >
                    {t("buttons.add new")}
                </Button>
            </div>
        </FormProvider>
    );
};

export default TagForm;
