import React from "react";
import ClientCoupon from "./ClientCoupon";
import getStoreCategories, { IParams } from "@/app/actions/getStoreCategories";
import getStores from "@/app/actions/getStores";

interface Iparams {
    searchParams: IParams;
}

const NewCouponPage = async ({ searchParams }: Iparams) => {
    const stores = await getStores(searchParams);
    const categories = await getStoreCategories({
        ...searchParams,
        status: "published",
    });
    return (
        <div className="w-full">
            <title>Coupons: Add new coupon</title>
            <ClientCoupon stores={stores} categories={categories} />
        </div>
    );
};

export default NewCouponPage;
