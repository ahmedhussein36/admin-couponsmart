import React from "react";
import Heading from "@/app/components/headings/Heading";
import Label from "@/app/components/stores/Label";
import Taps from "@/app/components/buttons/Taps";
import AddNewButton from "@/app/components/buttons/AddNewButton";
import CouponTable from "@/app/components/coupons/CouponTable";
import { getTranslations } from "next-intl/server";
import getCoupons, { IParams } from "@/app/actions/getcoupons";
import ClientOnly from "@/app/components/ClientOnly";
import { getAllStores } from "@/app/actions/getStores";

const CouponsPage = async ({ searchParams }: { searchParams: IParams }) => {
    const coupons = await getCoupons(searchParams);
    const allStores = await getAllStores();
    const t = await getTranslations();
    const taps = [
        { id: "0", label: t("taps.all"), path: "" },
        { id: "1", label: t("taps.published"), path: "?status=published" },
        { id: "2", label: t("taps.draft"), path: "?status=draft" },
        { id: "3", label: t("taps.trash"), path: "?status=trashed" },
    ];

    return (
        <div className=" w-full flex flex-col justify-start items-start gap-5">
            <title>Admin panel: Coupons</title>
            <div className="flex justify-between items-end w-full">
                <div className=" flex justify-start gap-3 items-end">
                    <Heading
                        title={t("stores.coupons")}
                        subtitle={`${t("stores.all coupons")} : ${
                            coupons.length
                        }`}
                    />
                </div>

                <div className=" flex justify-end flex-grow">
                    <AddNewButton
                        label={t("buttons.add new coupon")}
                        link={"coupons/add-new-coupon"}
                    />
                </div>
            </div>

            <Taps taps={taps} parent="coupons" />
            <div className="w-full">
                <ClientOnly>
                    <CouponTable coupons={coupons} allStores={allStores} />
                </ClientOnly>
            </div>
        </div>
    );
};

export default CouponsPage;
