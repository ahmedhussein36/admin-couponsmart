import React, { FC } from "react";
import getStoreCategoryById, {
    STParams,
} from "@/app/actions/getStoreCategoryById";
import ClientStoreCategoryID from "./ClientStoreCategoryID";

interface StoreParams {
    params: STParams;
}
const UpdateStorePage: FC<StoreParams> = async ({ params }) => {
    const storeCategory = await getStoreCategoryById(params);
    return (
        <div className="w-full">
            <title>Stores: update store</title>
            <ClientStoreCategoryID store={storeCategory as any} />
        </div>
    );
};

export default UpdateStorePage;
