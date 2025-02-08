"use client";
import CategoryTable from "@/app/components/posts/CategoryTable";
import CategoryForm from "@/app/components/posts/CategoryForm";
import { useTranslations } from "next-intl";
import React from "react";
import Heading from "@/app/components/headings/Heading";

interface CategoryProps{
    categories : any[]
}

const CategoryPostClient = ({categories} : CategoryProps) => {
    const t = useTranslations();

    return (
        <div className="w-full flex flex-col gap-3 justify-start items-start">
            <Heading title={t("posts.post categories")} />
            <div className="w-full grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="w-full col-span-2">
                    <CategoryForm />
                </div>
                <div className="w-full col-span-3">
                    <CategoryTable categories={categories} />
                </div>
            </div>
        </div>
    );
};

export default CategoryPostClient;
