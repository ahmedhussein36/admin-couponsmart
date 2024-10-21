"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Taps = ({
    taps,
    parent,
}: {
    taps: {
        id: string;
        label: string;
        path: string;
    }[];
    parent: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const handleTapClick = (index: number) => {
        setCurrentIndex(index);
        router.push(parent + "/" + taps[index].path);
    };

    return (
        <div className="w-fit text-sm grid grid-cols-5 gap-3">
            {taps.map((tap, index) => {
                const isActive = index === currentIndex;
                return (
                    <button
                        onClick={() => handleTapClick(index)}
                        key={index}
                        className={`
                            text-center dark:text-neutral-300
                            hover:bg-slate-200 dark:hover:bg-gray-700
                            p-2 rounded border-b-2 transition-all duration-200 ease-in-out
                            ${
                                isActive
                                    ? " border-b-purple-500 bg-slate-200 dark:bg-gray-700/20"
                                    : "border-b-purple-500/0 "
                            }`}
                    >
                        {tap.label}
                    </button>
                );
            })}
        </div>
    );
};

export default Taps;
