import React, { FC } from "react";
import ClientStoreID from "./ClientStoreID";
import getStoreById, { StoreParam } from "@/app/actions/getStoreById";
import getStoreCategories, { IParams } from "@/app/actions/getStoreCategories";

interface StoreParams {
    params: StoreParam;
    searchParams: IParams;
}
const UpdateStorePage: FC<StoreParams> = async ({ params, searchParams }) => {
    const store = await getStoreById(params);
    const categories = await getStoreCategories(searchParams);
    return (
        <div className="w-full">
            <title>Stores: update store</title>
            <ClientStoreID
                store={store as any}
                allCategories={categories as any}
            />
        </div>
    );
};

export default UpdateStorePage;
