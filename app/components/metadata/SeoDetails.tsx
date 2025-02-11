"use client";
import React from "react";
import SearchPreview from "./SearchPreview";
import Input from "../inputs/Input";
import Collaps from "../collapse/Collaps";
import MuliInputs from "./MuliInputs";

interface MetaProps {
    defaultTtitle?: string;
    defaultDescriptiion?: string | Element | any;
    defaulImage?: string;
    defaultSlug?: string;
}

const SeoDetails = ({
    defaultTtitle,
    defaultDescriptiion,
    defaulImage,
    defaultSlug,
}: MetaProps) => {
    return (
        <div className=" w-full bg-white dark:bg-transparent flex p-4 flex-col gap-4 border-b dark:border-neutral-500 rounded-">
            <Collaps title={"Manage SEO Optimization"}>
                <div className="w-full grid grid-cols-1 order-last lg:grid-cols-2 items-start gap-6">
                    <div className="w-full col-span-1 flex flex-col justify-start items-start gap-6">
                        <Input
                            name="metaTitle"
                            label={"Meta Title"}
                            className=" border text-base "
                        />
                        <Input
                            name="metaDescription"
                            label={"Meta Description"}
                            className=" border text-base "
                        />
                        <Input
                            name="canonicalLink"
                            label={"Canonical URL"}
                            className=" border text-base"
                        />
                        <MuliInputs name="metaKeywords" />
                    </div>
                    <div className=" col-span-1">
                        <div className="mb-3">
                            <h3 className=" font-bold"> Search Appearance</h3>
                            <p className=" text-xs">
                                This is how your post should look like in the
                                search results.
                            </p>
                        </div>
                        <SearchPreview
                            title={defaultTtitle}
                            description={defaultDescriptiion}
                            slug={defaultSlug}
                            image={defaulImage}
                        />
                    </div>
                </div>
            </Collaps>
        </div>
    );
};

export default SeoDetails;
