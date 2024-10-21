"use client";
import TagForm from "@/app/components/posts/TagForm";
import TagTable from "@/app/components/posts/TagTable";
import { Heading } from "@/app/utils/importData";
import { useTranslations } from "next-intl";
import React from "react";

const TagClient = () => {
    const t = useTranslations();
    const tags = [
        {
            id: 1,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
        {
            id: 2,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
        {
            id: 3,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
        {
            id: 4,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
        {
            id: 5,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
        {
            id: 6,
            title: "tag1",
            slug: "tag-1",
            description: "tag1 description",
        },
    ];

    return (
        <div className="w-full flex flex-col gap-3 justify-start items-start">
            <Heading title={t("posts.tags")} />
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="w-full col-span-1">
                    <TagForm />
                </div>
                <div className="w-full col-span-2">
                    <TagTable tags={tags} />
                </div>
            </div>
        </div>
    );
};

export default TagClient;
