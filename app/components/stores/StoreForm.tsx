import React from "react";
import Input from "../inputs/Input";
import { useTranslations } from "next-intl";

const StoreForm = () => {
    const t = useTranslations();

    return (
        <div className=" w-full grid grid-cols-1 gap-5 ">
            <div className="w-full">
                <h2 className=" font-bold text-xl mb-4">
                    {t("instructions.enter store details")}
                </h2>
            </div>
            <div className="w-full col-span-1 flex flex-col justify-start items-start gap-6">
                <Input
                    name="title"
                    label={t("inputs.store title")}
                    className=" border text-base "
                    required={true}
                />
                <Input
                    name="name"
                    label={t("inputs.store name")}
                    className=" border text-base "
                    required={true}
                />
                <Input
                    name="slug"
                    label={t("inputs.store slug")}
                    className=" border text-base"
                />

                <Input
                    name="affiiateUrl"
                    label={t("inputs.affiliate link")}
                    className=" border text-base"
                    required={true}
                />
            </div>
        </div>
    );
};

export default StoreForm;
