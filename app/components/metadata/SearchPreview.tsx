/* eslint-disable @next/next/no-img-element */
import React from "react";
import { appInfo } from "./data";
import { useLocale } from "use-intl";
import { IoIosArrowForward } from "react-icons/io";
import { WebsiteInfo } from "@/app/utils/websiteInfo";
import Image from "next/image";

interface PreviewProps {
    image?: string;
    title?: string;
    description?: string;
    slug?: string;
}

const SearchPreview = ({ image, title, description, slug }: PreviewProps) => {
    return (
        <div
            className="w-full bg-white grid grid-cols-1 justify-items-stretch items-end 
        gap-3 p-6 dark:bg-gray-900/50 rounded-lg shadow-lg shadow-slate-300/40
        dark:shadow-none
        "
        >
            <div className="w-full flex flex-col justify-start items-start gap-1">
                <div className=" flex justify-start items-center gap-3">
                    <div className=" relative overflow-hidden  w-6 h-6 rounded-full p-1 bg-lime-400">
                        <Image
                            src={WebsiteInfo.logo}
                            alt="logo"
                            fill
                            priority
                            className=""
                        />
                    </div>
                    <div className="">
                        <div className="text-sm">{WebsiteInfo.name}</div>
                        <div className=" flex justify-center items-center gap-1 text-xs">
                            {WebsiteInfo.protocol}
                            {WebsiteInfo.website}
                            <IoIosArrowForward size={12} />
                            {slug}
                        </div>
                    </div>
                </div>
                <div className="w-full  overflow-hidden">
                    {title ? (
                        <h3 className=" text-blue-500">{title}</h3>
                    ) : (
                        <div className="my-3 w-full h-5 bg-slate-400/30 rounded-md text imgLoader"></div>
                    )}
                    <div className=" flex justify-between items-center gap-2">
                        <div className="w-full">
                            {description !== "" ? (
                                <p className=" text-wrap max-w-96 text-xs">
                                    {description}
                                </p>
                            ) : (
                                <>
                                    <div className="my-3 w-full h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                                    <div className="my-3 w-full h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                                    <div className="my-3 w-full h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                                </>
                            )}
                        </div>

                        <div className="">
                            {image ? (
                                <img src={image} alt="image" width={80} />
                            ) : (
                                <div className="w-20 h-20 bg-slate-400/30 rounded-md imgLoader"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPreview;
