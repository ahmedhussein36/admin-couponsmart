import React, { Suspense } from "react";
import Heading from "@/app/components/headings/Heading";
import Taps from "@/app/components/buttons/Taps";
import StoreTable from "@/app/components/table/StoreTable";
import AddNewButton from "@/app/components/buttons/AddNewButton";
import ClientOnly from "@/app/components/ClientOnly";
import getStores, { IParams } from "@/app/actions/getStores";
import { getTranslations } from "next-intl/server";

const StoresPage = async ({ searchParams }: { searchParams: IParams }) => {
    const t = await getTranslations();
    const taps = [
        { id: "0", label: t("taps.all"), path: "" },
        { id: "1", label: t("taps.published"), path: "?status=published" },
        { id: "2", label: t("taps.draft"), path: "?status=draft" },
        { id: "3", label: t("taps.trash"), path: "?status=trashed" },
    ];

    const stores = await getStores(searchParams);  

    return (
        <div className=" w-full flex flex-col justify-start items-start gap-5">
            <title>Admin panel: Stores</title>
            <div className="flex justify-between items-end w-full">
                <div className=" flex justify-start gap-3 items-end">
                    <Heading
                        title={t("stores.store title")}
                        subtitle={`${t("stores.all stores")} ${stores.length}`}
                    />
                </div>

                <div className=" flex justify-end flex-grow">
                    <AddNewButton
                        label={t("buttons.create new")}
                        link={"stores/add-new-store"}
                    />
                </div>
            </div>

            <Taps taps={taps} parent="stores" />

            <div className="w-full">
                <ClientOnly>
                    <StoreTable stores={stores as any} parent={"stores"} />
                </ClientOnly>
            </div>
        </div>
    );
};

export default StoresPage;
