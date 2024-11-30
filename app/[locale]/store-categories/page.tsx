import React from "react";
import Heading from "@/app/components/headings/Heading";
import Taps from "@/app/components/buttons/Taps";
import StoreTable from "@/app/components/table/StoreTable";
import AddNewButton from "@/app/components/buttons/AddNewButton";
import ClientOnly from "@/app/components/ClientOnly";
import getStoreCategories, { IParams } from "@/app/actions/getStoreCategories";
import { getTranslations } from "next-intl/server";

const CategoryPage = async ({ searchParams }: { searchParams: IParams }) => {
    const categories = await getStoreCategories(searchParams);

    const t = await getTranslations();
    const taps = [
        { id: "0", label: t("taps.all"), path: "" },
        { id: "1", label: t("taps.published"), path: "?status=published" },
        { id: "2", label: t("taps.draft"), path: "?status=draft" },
        { id: "3", label: t("taps.trash"), path: "?status=trashed" },
    ];

    return (
        <div className=" w-full flex flex-col justify-start items-start gap-5">
            <title>Store categores</title>
            <div className="flex justify-between items-end w-full">
                <div className=" flex justify-start gap-3 items-end">
                    <Heading
                        title={t("stores.store categories")}
                        subtitle={
                            t("stores.all categories") + " " + ":" + " " + 15
                        }
                    />
                </div>

                <div className=" flex justify-end flex-grow">
                    <AddNewButton
                        label={t("buttons.add new category")}
                        link={"store-categories/add-new-store-category"}
                    />
                </div>
            </div>

            <Taps taps={taps} parent="store-categories" />

            <div className="w-full">
                <ClientOnly>
                    <StoreTable stores={categories as any} />
                </ClientOnly>
            </div>
        </div>
    );
};

export default CategoryPage;
