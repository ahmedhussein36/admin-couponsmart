import { useTranslations } from "next-intl";
import React from "react";
import Switch from "../inputs/Switch";
import Collaps from "../collapse/Collaps";

const Features = () => {
    const t = useTranslations("features");
    return (
        <div
            className="w-full px-4 bg-white dark:bg-transparent border-neutral-300 dark:border-neutral-500
        p-3 flex flex-col gap-4 justify-start items-start rounded- border-b"
        >
            <Collaps title={t("title")}>
                <div className=" grid grid-cols-2 gap-5">
                    <div className=" w-full flex flex-col gap-2 justify-start items-start">
                        <Switch
                            name="isAddHome"
                            label={t("show on home page")}
                        />
                        <Switch
                            name="isFeatured"
                            label={t("add to featured")}
                        />
                        <Switch
                            name="isRecommended"
                            label={t("add to recommended")}
                        />
                        <Switch
                            name="isFooterMenu"
                            label={t("add to footer menu")}
                        />
                    </div>
                    {/* <div className="w-full flex flex-col justify-start items-end gap-5">
                        <ImageUpload
                            social
                            name="cover"
                            label="Upload store cover"
                        />
                    </div> */}
                </div>
            </Collaps>
        </div>
    );
};

export default Features;
