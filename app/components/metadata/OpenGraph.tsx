import React from "react";
import Input from "../inputs/Input";
import SocilCard from "./SocilCard";
import Collaps from "../collapse/Collaps";
import ImageUpload from "../inputs/ImageUpload";

interface SocialProps {
    defaultTtitle?: string;
    defaultDescriptiion?: string | Element | any;
    defaulImage?: string;
    defaultSlug?: string;
}

const OpenGraph = ({
    defaultTtitle,
    defaultDescriptiion,
    defaulImage,
    defaultSlug,
}: SocialProps) => {
    return (
        <div className=" w-full flex p-4 flex-col gap-4 border-b dark:border-neutral-500 rounded- bg-white dark:bg-transparent">
            <Collaps title={"Socail Media"}>
                <div className="w-full grid grid-cols-1 gap-5 lg:grid-cols-2 justify-items-start items-start">
                    <div className="w-full col-span-1 flex flex-col justify-start items-start gap-6">
                        <ImageUpload
                            name="ogImage"
                            label="Upload Image"
                            social
                        />
                        <Input
                            name="ogTitle"
                            label={"Social Title"}
                            className=" border text-base "
                        />
                        <Input
                            name="ogDescription"
                            label={"Social Description"}
                            className=" border text-base "
                        />
                        <Input
                            name="ogUrl"
                            label={"Share Link"}
                            className=" border text-base"
                        />
                    </div>
                    <div className=" w-full col-span-1 flex flex-col items-end justify-start">
                        <SocilCard
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

export default OpenGraph;
