import React from "react";
import Heading from "@/app/components/headings/Heading";
import { useTranslations } from "next-intl";
import StoreFilter from "@/app/components/filter/StoreFilter";
import Taps from "@/app/components/buttons/Taps";
import StoreTable from "@/app/components/table/StoreTable";
import AddNewButton from "@/app/components/buttons/AddNewButton";

const PostsPage = () => {
    const t = useTranslations();
    const taps = [
        { id: "0", label: t("taps.all"), path: "" },
        { id: "1", label: t("taps.published"), path: "?status=publised" },
        { id: "2", label: t("taps.draft"), path: "?status=draft" },
        { id: "3", label: t("taps.trash"), path: "?status=trashed" },
    ];

    return (
        <div className=" w-full flex flex-col justify-start items-start gap-5">
            <title>Admin panel: Posts</title>
            <div className="flex justify-between items-end w-full">
                <div className=" flex justify-start gap-3 items-end">
                    <Heading
                        title={t("posts.posts")}
                        subtitle={t("posts.all posts") + " " + ":" + " " + 15}
                    />
                </div>

                <div className=" flex justify-end flex-grow">
                    <AddNewButton
                        label={t("buttons.add new post")}
                        link={"posts/add-new-post"}
                    />
                </div>
            </div>

            <Taps taps={taps} parent="stores" />

            <StoreFilter />

            <StoreTable stores={[]} />
        </div>
    );
};

export default PostsPage;
