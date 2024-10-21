"use client";
import React, { ReactNode, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface CollapsProps {
    children?: ReactNode;
    title?: string;
}

const Collaps = ({ children, title }: CollapsProps) => {
    const [isCollaps, setIsCollape] = useState(false);

    const handeCollaps = () => {
        setIsCollape(!isCollaps);
    };

    return (
        <div
            className={`${
                isCollaps ? "max-h-6" : "max-h-screen"
            } w-full h-full overflow-hidden duration-200 transition-all ease-in-out`}
        >
            <button
                onClick={handeCollaps}
                className="
                text font-semibold w-full flex justify-between items-center"
            >
                <span>{title}</span>
                <IoIosArrowUp
                    size={24}
                    className={`${isCollaps ? " rotate-180" : " rotate-0"}`}
                />
            </button>
            <div
                className={`${
                    isCollaps
                        ? "opacity-0 translate-y-2"
                        : " opacity-1 translate-y-0"
                } transition-all duration-500 ease-in-out mt-4`}
            >
                {children}
            </div>
        </div>
    );
};

export default Collaps;
