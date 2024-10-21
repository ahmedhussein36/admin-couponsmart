/* eslint-disable @next/next/no-img-element */
import { useTheme } from "next-themes";
import React from "react";
import { WebsiteInfo } from "@/app/utils/websiteInfo";

interface CardProps {
    image?: string;
    title?: string;
    description?: string;
    slug?: string;
}

const SocilCard = ({ image, title, description, slug }: CardProps) => {
    const { theme } = useTheme();
    return (
        <div
            className="w-[400px] flex flex-col 
                justify-start items-start 
                border-neutral-300 
                dark:border-neutral-400 border-
                gap-3 p-6 dark:bg-gray-900/50 bg-white 
                rounded-xl shadow-lg shadow-slate-300
                dark:shadow-none
        "
        >
            <div className="mb-4 w-full flex justify-between items-start ">
                <div className="flex justify-start items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-ful">
                            <img src={WebsiteInfo.logo} alt="Avatar" width={100} className=" object-fill" />
                        </div>
                    </div>
                    <div className="user flex flex-col justify-start items-start gap-0">
                        <div className="name">
                            <h2 className="text font-bold text-gray-900 dark:text-white">
                                {WebsiteInfo.name}
                            </h2>
                        </div>
                        <div className="username flex justify-start items-center gap-1">
                            <div className="username">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    @couponmart
                                </p>
                            </div>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <div className="follow">
                                <p className=" text-blue-500 text-sm">
                                    Follow
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="X-logo">
                    <img
                        src={
                            theme === "dark"
                                ? "/white-x-logo.png"
                                : theme === "light"
                                ? "/black-x-logo.png"
                                : "/white-x-logo.png"
                        }
                        alt="x-logo"
                        width={30}
                    />
                </div>
            </div>
            <div className="post">
                <div className="w-full overflow-hidden rounded-lg image mb-4">
                    {image ? (
                        <img
                            src={image}
                            alt="post-image"
                            className=" aspect-video object-cover "
                            width={400}
                        />
                    ) : (
                        <div className="w-[350px] h-[214px] bg-slate-400/30 rounded-md imgLoader"></div>
                    )}
                </div>
                <div className="body">
                    <div className=" dark: text-neutral-400">
                        {WebsiteInfo.website}
                    </div>
                    <div className="title">
                        {title ? (
                            <h2 className=" text-gray-900 dark:text-white">
                                {title}
                            </h2>
                        ) : (
                            <div className="my-3 w-[300px] h-4 bg-slate-400/30 rounded-md text imgLoader"></div>
                        )}
                    </div>
                    {description !== "" ? (
                        <p className=" text-xs">{description}</p>
                    ) : (
                        <>
                            <div className="my-3 w-[350px] h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                            <div className="my-3 w-[350px] h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                            <div className="my-3 w-[320px] h-3 bg-slate-400/30 rounded-md text imgLoader"></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocilCard;
