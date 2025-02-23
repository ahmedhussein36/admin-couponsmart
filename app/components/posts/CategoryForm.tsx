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
import { toast } from "react-toastify";
import { useCreateStore } from "@/app/hooks/useCreateStore";
import RTE from "../inputs/RTE";

const CategoryForm = () => {
    const t = useTranslations();
    const router = useRouter();
    const { createMew, error, loading } = useCreateStore();

    const methods = useForm<FieldValues>({
        defaultValues: {
            status: "draft",
            name: "",
            locale: "ar",
            description: "",
            slug: "",
            translateLink: "",
            image: "",
            metaTitle: "",
            metaDescription: "",
        },
    });
    const name = methods.watch("name");
    const { newSlug } = useGeneratedSlug(name as string);
    useEffect(() => {
        methods.setValue("slug", newSlug);
    }, [methods, newSlug]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const api = "/api/postCategory";
        await toast.promise(createMew(api, data, "published"), {
            pending: "publishing post category...",
            success: "Post category published successfully!",
            error: {
                render() {
                    return error || "Error: Unable to create category.";
                },
            },
        });

        methods.reset();
        router.refresh();
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full grid grid-col-1 p-4 gap-6 bg-white dark:bg-gray-700/20 rounded-lg">
                <h2 className=" font-semibold">
                    {t("buttons.add new category")}
                </h2>
                <Input
                    name={"name"}
                    label={t("inputs.name")}
                    className="border text-base"
                />
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
                <div className="w-full">
                    <RTE
                        label={t("inputs.description")}
                        name="description"
                        control={methods.control}
                    />
                </div>
                <Input
                    name={"metaTitle"}
                    label={t("SEO.meta title")}
                    className="border text-base"
                />
                <Input
                    name={"metaDescription"}
                    label={t("SEO.meta description")}
                    className="border text-base"
                />
                <div className="w-full flex flex-col gap-6">
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

                    <Input
                        name={"translateLink"}
                        label={t("inputs.translation link")}
                        className="border text-base"
                    />
                </div>

                <Button
                    disabled={!name || loading}
                    onClick={methods.handleSubmit(onSubmit)}
                >
                    {t("buttons.add new")}
                </Button>
            </div>
        </FormProvider>
    );
};

export default CategoryForm;
