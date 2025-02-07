import React from "react";
import ClientCoupon from "./ClientCoupon";
import getStoreCategories, { IParams } from "@/app/actions/getStoreCategories";
import getStores from "@/app/actions/getStores";
import getCouponById, { CouponParams } from "@/app/actions/getCouponById";

interface Iparams {
    searchParams: IParams;
    params: CouponParams;
}

const CouponPage = async ({ params, searchParams }: Iparams) => {
    const coupon = await getCouponById(params);
    const stores = await getStores(searchParams);
    const categories = await getStoreCategories({
        ...searchParams,
        status: "published",
    });
    return (
        <div className="w-full">
            <title>Coupons: Add new coupon</title>
            <ClientCoupon
                coupon={coupon as any}
                stores={stores}
                categories={categories}
            />
        </div>
    );
};

export default CouponPage;
