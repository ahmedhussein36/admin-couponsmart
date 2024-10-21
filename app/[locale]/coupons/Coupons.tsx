"use client";
import StoreTable from "@/app/components/table/StoreTable";
import { useTranslations } from "next-intl";
import React from "react";

const Coupons = () => {
    const t = useTranslations("Coupons");

    return (
        <div>
            <StoreTable />
        </div>
    );
};

export default Coupons;
