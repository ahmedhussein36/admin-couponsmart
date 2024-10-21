import React from "react";
import ClientStore from "./ClientStore";
import { useTranslations } from "next-intl";
import getStoreCategories, { IParams } from "@/app/actions/getStoreCategories";

interface Iparams {
    searchParams: IParams;
}

const NewStorePage = async ({ searchParams }: Iparams) => {
    const categories = await getStoreCategories(searchParams);
    return (
        <div className="w-full">
            <title>Stores: add new store</title>
            <ClientStore categories={categories as any} />
        </div>
    );
};

export default NewStorePage;
